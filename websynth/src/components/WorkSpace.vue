<template>
  <div class="workspace" @drop="onDrop">
    <VueFlow :nodes="elements" :node-types="nodeTypes" :snap-to-grid="true" :snap-grid="[20,20]" @nodesChange="getModules" @pane-ready="setInstance" @dragover="onDragOver" @dragleave="onDragLeave">
      <Background />
      <MiniMap />
      <template #node-oscillator="customNodeProps">
        <OscillatorModule v-bind="customNodeProps" />
      </template>
      <template #node-output="customNodeProps">
        <OutputModule v-bind="customNodeProps" />
      </template>
    </VueFlow>
    <ModuleBar></ModuleBar>
  </div>
</template>

<script setup>
import {ref, markRaw} from 'vue';
import {useVueFlow} from '@vue-flow/core';
import useDragAndDrop from '@/mixins/useDnD'
import OscillatorModule from "@/components/synth_modules/OscillatorModule.vue";
import OutputModule from "@/components/synth_modules/OutputModule.vue";

const { onConnect, addEdges } = useVueFlow()
const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()
onConnect(addEdges)

const nodeTypes = {
  oscillator: markRaw(OscillatorModule),
  output: markRaw(OutputModule)
}

const elements = ref([
  { id: '3', type: 'oscillator', label: 'Oscillator', position: { x: 400, y: 200 } },
  {
    id: '4',
    type: 'output',
    label: 'Output',
    position: { x: 500, y: 300 }
  },

  // a custom edge, specified by using a custom type name
  // we choose `type: 'special'` for this example
  {
    id: 'e1-4',
    type: 'special',
    source: '3',
    target: '4',
    animated: true,

    // pass custom data to the edge
    data: {
      // You can pass any data you want to the edge
      hello: 'world',
    }
  },
])
</script>

<script>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/minimap/dist/style.css'
import ModuleBar from "@/components/ModuleBar.vue";
export default {
  name: 'WorkSpace',
  data() {
    return {
      vueFlowInstance: null,
      moduleList: []
    }
  },
  components: {
    VueFlow,
    MiniMap,
    Background,
    ModuleBar
  },
  methods: {
    setInstance(vueFlowInstance){
      console.log("instance has been set")
      this.vueFlowInstance = vueFlowInstance
      this.getModules()
    },
    getModules(){
      if(this.vueFlowInstance){
        this.$emit('updateElements', this.vueFlowInstance.getElements)
      }
    }
  }
}
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
