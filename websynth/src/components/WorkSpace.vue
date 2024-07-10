<template>
  <div class="workspace" @drop="onDrop">
    <ModuleBar></ModuleBar>
    <SaveModal :visible="saveModalVisible"></SaveModal>
    <p id="downloadAnchorElem" style="display: none;"></p>
    <VueFlow :nodes="elements" :node-types="nodeTypes" :snap-to-grid="true" :snap-grid="[20,20]" :connect-on-click="true" @nodesChange="getModules" @edgesChange="getModules" @pane-ready="setInstance" @dragover="onDragOver" @dragleave="onDragLeave">
      <Background />
      <MiniMap />
      <template #node-oscillator="customNodeProps">
        <OscillatorModule v-bind="customNodeProps" @moduleChanged="getModules" />
      </template>
      <template #node-filter="customNodeProps">
        <FilterModule v-bind="customNodeProps" @moduleChanged="getModules" />
      </template>
      <template #node-output="customNodeProps">
        <OutputModule v-bind="customNodeProps" @moduleChanged="getModules" />
      </template>
      <template #node-mixer="customNodeProps">
        <MixerModule v-bind="customNodeProps" @moduleChanged="getModules" />
      </template>
      <template #node-envelope="customNodeProps">
        <EnvelopeModule v-bind="customNodeProps" @moduleChanged="getModules" />
      </template>
      <template #node-vca="customNodeProps">
        <VCAModule v-bind="customNodeProps" @moduleChanged="getModules" />
      </template>
    </VueFlow>
  </div>
</template>

<script setup>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import {useVueFlow} from '@vue-flow/core';
import '@vue-flow/minimap/dist/style.css'
import ModuleBar from "@/components/ModuleBar.vue"
import SaveModal from "@/components/SaveModal.vue";
import {ref, markRaw, onMounted, inject} from 'vue';
import {set, get} from 'idb-keyval'
import useDragAndDrop from '@/mixins/useDnD'
import OscillatorModule from "@/components/synth_modules/OscillatorModule.vue";
import OutputModule from "@/components/synth_modules/OutputModule.vue";
import FilterModule from "@/components/synth_modules/FilterModule.vue";
import MixerModule from "@/components/synth_modules/MixerModule.vue";
import EnvelopeModule from "@/components/synth_modules/EnvelopeModule.vue";
import VCAModule from "@/components/synth_modules/VCAModule.vue";

const { toObject, fromObject, onConnect, addEdges } = useVueFlow()
onConnect(addEdges)
const eventBus = inject("eventBus")

let vueFlowInstance = null;

// eslint-disable-next-line no-undef
const emit = defineEmits(['updateElements'])
const saveModalVisible = ref(false)

const nodeTypes = {
  oscillator: markRaw(OscillatorModule),
  output: markRaw(OutputModule),
  filter: markRaw(FilterModule),
  mixer: markRaw(MixerModule),
  envelope: markRaw(EnvelopeModule),
  vca: markRaw(VCAModule)
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
})

eventBus.on("navBar-click", (param) => {
  if(param === "reset workspace"){
    console.log("resetting workspace...")
    fromObject(initial_elements)
    getModules()
  } else if (param === 'save patch to file'){
    saveModalVisible.value = true
    eventBus.on("modal-click-save", (param) => {
      downloadPatch(param)
      saveModalVisible.value = false
    })
  }
})


const downloadPatch = (exportName) => {
  let exportObj = toObject()
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

const setInstance = (instance) => {
  console.log("instance has been set")
  vueFlowInstance = instance
  getModules()
}
const getModules = () => {
  if (vueFlowInstance) {
    let elements = vueFlowInstance.getElements
    emit('updateElements', elements)
    set("flow", JSON.stringify(toObject()))
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
