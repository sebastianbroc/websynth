<template>
  <div class="workspace" @drop="onDrop">
    <button @click="updateCursorPosition('2')" style="display: none;">Update</button>
    <ModuleBar></ModuleBar>
    <SaveModal :visible="saveModalVisible" :type="modalType" :session="querySession"></SaveModal>
    <div class="disable_workspace" :class="{active: store.state.modalOpened}"></div>
    <VueFlow :nodes="elements" :node-types="nodeTypes" :snap-to-grid="true" :snap-grid="[20,20]" :connect-on-click="true" @nodesChange="getModules($event, 'nodes')" @edgesChange="getModules($event, 'edges')" @pane-ready="setInstance" @dragover="onDragOver" @dragleave="onDragLeave">
      <Background />
      <MiniMap />
      <template #node-oscillator="customNodeProps">
        <OscillatorModule v-bind="customNodeProps" @moduleChanged="getModules($event, 'data')" />
      </template>
      <template #node-filter="customNodeProps">
        <FilterModule v-bind="customNodeProps" @moduleChanged="getModules($event, 'data')" />
      </template>
      <template #node-output="customNodeProps">
        <OutputModule v-bind="customNodeProps" :deletable="false" @moduleChanged="getModules($event, 'data')" />
      </template>
      <template #node-mixer="customNodeProps">
        <MixerModule v-bind="customNodeProps" @moduleChanged="getModules($event, 'data')" />
      </template>
      <template #node-envelope="customNodeProps">
        <EnvelopeModule v-bind="customNodeProps" @moduleChanged="getModules($event, 'data')" />
      </template>
      <template #node-vca="customNodeProps">
        <VCAModule v-bind="customNodeProps" @moduleChanged="getModules($event, 'data')" />
      </template>
      <template #node-cursor="customNodeProps">
        <CursorModule v-bind="customNodeProps" @moduleChanged="getModules($event, 'data')" />
      </template>
      <template #node-sequencer="customNodeProps">
        <SequencerModule v-bind="customNodeProps" @moduleChanged="getModules($event, 'data')" />
      </template>
      <template #node-clock="customNodeProps">
        <ClockModule v-bind="customNodeProps" @clockTrigger="clockTrigger($event[0].id)" />
      </template>
    </VueFlow>
  </div>
</template>

<script setup>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import {useVueFlow} from '@vue-flow/core';
import download from 'downloadjs';
import '@vue-flow/minimap/dist/style.css'
import ModuleBar from "@/components/ModuleBar.vue"
import SaveModal from "@/components/SaveModal.vue";
import {ref, markRaw, onMounted, inject} from 'vue';
import {useStore} from 'vuex';
import {set, get} from 'idb-keyval'
import useDragAndDrop from '@/mixins/useDnD'
import useWebsocket from "@/mixins/websocketHandler";
import OscillatorModule from "@/components/synth_modules/OscillatorModule.vue";
import OutputModule from "@/components/synth_modules/OutputModule.vue";
import FilterModule from "@/components/synth_modules/FilterModule.vue";
import MixerModule from "@/components/synth_modules/MixerModule.vue";
import EnvelopeModule from "@/components/synth_modules/EnvelopeModule.vue";
import VCAModule from "@/components/synth_modules/VCAModule.vue";
import CursorModule from "@/components/synth_modules/CursorModule.vue";
import SequencerModule from "@/components/synth_modules/SequencerModule.vue";
import ClockModule from "@/components/synth_modules/ClockModule.vue";
const store = useStore()
import { useRouter } from 'vue-router'

const { toObject, fromObject, onConnect, addEdges, updateNode, applyNodeChanges, applyEdgeChanges } = useVueFlow()
onConnect(addEdges)
const eventBus = inject("eventBus")

let vueFlowInstance = null;

let {startConnection, createSession, joinSession, sendChange} = useWebsocket()
let router = useRouter()

// eslint-disable-next-line no-undef
const emit = defineEmits(['updateElements', 'triggerModule'])
const saveModalVisible = ref(false)
const modalType = ref("")
const querySession = ref(router.currentRoute.value.query.session)

const nodeTypes = {
  oscillator: markRaw(OscillatorModule),
  output: markRaw(OutputModule),
  filter: markRaw(FilterModule),
  mixer: markRaw(MixerModule),
  envelope: markRaw(EnvelopeModule),
  vca: markRaw(VCAModule),
  cursor: markRaw(CursorModule),
  sequencer: markRaw(SequencerModule),
  clock: markRaw(ClockModule),
}

let elements = ref([
  {
    id: '4',
    type: 'output',
    label: 'Output',
    position: { x: 500, y: 300 }
  }
])

const initial_elements = {
  "nodes": [
    {
      "id": "1",
      "type": "output",
      "position": {
        "x": 500,
        "y": 300
      },
      "data": {},
      "label": "Output"
    }
  ],
  "edges": [],
  "position": [
    0,
    0
  ],
  "zoom": 1,
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1
  }
}

onMounted(() => {
  get("flow").then(value => {
    let flow = null
    if(typeof value !== "undefined"){
      flow = JSON.parse(value)
    } else {
      console.log("created initial elements")
      flow = initial_elements
    }

    if(flow.nodes.filter(n => n.type === "output").length === 0){ //make sure there always is an output
      flow.nodes.push({id: '4', type: 'output', label: 'Output', position: { x: 500, y: 300 }})
    }

    fromObject(flow)
  })

  eventBus.on("getModules", (param) => {
    if(param === "getModules"){
      getModules()
    }
  })

  getModules()

  if(router.currentRoute.value.query.session){
    saveModalVisible.value = true
    modalType.value = "start_collaboration"
    store.commit('changeModalOpened', true)
  }
})

eventBus.on("navBar-click", (param) => {
  switch(param){
    case "reset workspace":
      console.log("resetting workspace...")
      fromObject(initial_elements)
      getModules()
      break;
    case "save patch to file":
      saveModalVisible.value = true
      modalType.value = "save"
      store.commit('changeModalOpened', true)
      break;
    case "load patch from file":
      saveModalVisible.value = true
      modalType.value = "load"
      store.commit('changeModalOpened', true)
      break;
    case "start collaboration":
      saveModalVisible.value = true
      store.commit('changeModalOpened', true)
      modalType.value = "start_collaboration"
      break;
    case "toggle input display":
      store.commit("toggleInputType")
      break;
  }
})

eventBus.on("loadSamplepatch", (patchname) => {
  fetch("./sample_patches/" + patchname + ".json").then(res => {
    res.text().then(data => {
      fromObject(JSON.parse(data))
      getModules()})
    })
})


eventBus.on("modal-click-cancel", () => {
  saveModalVisible.value = false
  store.commit('changeModalOpened', false)
})

eventBus.on("modal-click-save", (param) => {
  downloadPatch(param)
  saveModalVisible.value = false
  store.commit('changeModalOpened', false)
})

eventBus.on("modal-click-load", (param) => {
  saveModalVisible.value = false
  store.commit('changeModalOpened', false)

  let flow = JSON.parse(param)
  fromObject(flow)
})

eventBus.on("modal-click-start_collaboration", (param) => {
  startConnection(() => {
    createSession(param, JSON.stringify(toObject()))
  })
})

eventBus.on("modal-click-join_collaboration", (param) => {
  startConnection(() => {
    joinSession(param.id, param.password)
  })
})

eventBus.on("element_update", (elements) => {
  elements = elements.toString()
  fromObject(JSON.parse(elements))
  elements = vueFlowInstance.getElements
  emit('updateElements', elements)
})

eventBus.on("node_change", (change) => {
  if(change.type === "nodes"){
    applyNodeChanges([JSON.parse(change.change)])
  } else if (change.type === "edges") {
    applyEdgeChanges([JSON.parse(change.change)])
  } else if(change.type === "data"){
    change = JSON.parse(change.change)

    let nodes = toObject()
    nodes.nodes.forEach(node => {
      if(node.id === change.id){
        node.data = change.data
      }
    })
    fromObject(nodes)
  }

  let elements = vueFlowInstance.getElements
  emit('updateElements', elements)
})

const updateCursorPosition = (id) => {
  updateNode(id, {position: {x: 300, y: 400}})
}

const downloadPatch = (exportName) => {
  console.log("downloading patch now...")
  download(JSON.stringify(toObject()), exportName + ".json")
}

const setInstance = (instance) => {
  console.log("instance has been set")
  vueFlowInstance = instance
  getModules()
}
const getModules = (changes, type) => {
  if (vueFlowInstance) {
    let elements = vueFlowInstance.getElements
    emit('updateElements', elements)
    set("flow", JSON.stringify(toObject()))
    if(store.state.websocketConnected){
      if(changes && Array.isArray(changes))
      changes.forEach(change => {
        sendChange(change, type)
      })
    }
  }
}

const clockTrigger = (id) => {
  if(vueFlowInstance && getModuleChildren(id).length > 0 && getModuleChildren(id)[0].targetNode){
    getModuleChildren(id).forEach(child => {
      eventBus.emit("triggerModule", child.targetNode.id)
    })
  }
}

const initDragAndDrop = () => {
  get("flow").then(value => {
    let flow = null
    if(typeof value !== "undefined"){
      flow = JSON.parse(value)
    } else {
      console.log("created initial elements")
      flow = initial_elements
    }
    let max = flow.nodes.map(e => {return parseInt(e.id.substring(8))}).filter(e => !isNaN(e))
    max = Math.max(...max)
    initializeId(max === -Infinity ? 0 : max + 1)
  })
}

const getModuleChildren = (id) => {
  //m.type == "default" is used to search in edges (connections between modules) which are part of the elements array
  let elements = vueFlowInstance.getElements._value
  return elements.filter(m => m.type == "default" && m.sourceNode.id === id)
}

const { onDragOver, onDrop, onDragLeave, initializeId } = useDragAndDrop()
initDragAndDrop()
</script>
<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

.workspace {
  position: relative;
  width: 100%;
  height: 90vh;
}

.disable_workspace {
  display: none;

  &.active {
    display: block;
    background: rgba(0,0,0,0.5);
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
  }
}

.synth_module {
  border: solid 1px black;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
}


.module_label {
  margin-bottom: 5px;
}
</style>
