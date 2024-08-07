<template>
  <div class="synth_module">
    <div class="module_label">
      <div>
        <h3>Filter</h3>
        <p>{{ label }}</p>
      </div>
      <img class="icon" src="@/assets/icons/icon_filter.png">
    </div>
    <div class="controls">
      <div class="control_row">
        <ControlKnob v-model="node.data.frequency" :options="knobOptions" v-if="store.state.inputType === 'knob'"></ControlKnob><span>cutoff</span>
        <input type="text" v-model="node.data.frequency" v-on:input="emitChange" v-if="store.state.inputType === 'text'"><span v-if="store.state.inputType === 'text'">Hz</span>
      </div>
      <select v-model="node.data.type" v-on:change="emitChange">
        <option value="lowpass" selected>Low-Pass</option>
        <option value="highpass">High-Pass</option>
        <option value="bandpass">Band-Pass</option>
        <option value="lowshelf">Low-Shelf</option>
        <option value="highshelf">High-Shelf</option>
        <option value="notch">Notch</option>
      </select>
      <div class="divider_row"></div>
      <div class="control_row">
        <Handle id="prop frequency" type="target" class="custom_handle port_input" :position="Position.Top" /><span>cutoff in</span>
        <ControlKnob v-model="node.data.cv_in_level" :options="knobOptionsCV" v-if="store.state.inputType === 'knob'"></ControlKnob>
        <input type="text" v-model="node.data.cv_in_level" v-on:input="emitChange" v-if="store.state.inputType === 'text'">
      </div>
      <div class="control_row">
        <Handle id="main" type="target" class="custom_handle port_input" :position="Position.Top" /><span>signal in</span>
      </div>
      <div class="control_row">
        <Handle type="source" class="custom_handle port_output" :position="Position.Bottom" /><span>output</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, reactive, watch, inject} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
import store from "@/store";
import ControlKnob from "@slipmatio/control-knob";
const emit = defineEmits(['nodesChange', 'moduleChanged'])
const eventBus = inject("eventBus")
const {node} = useNode()

const knobOptions = {
  bgClass: "knobBG",
  svgClass: "knobSVG",
  rimClass: "knobRim",
  valueArchClass: "knobValueArch",
  tickClass: "knobTick",
  valueTextClass: "knobText",
  minValue: 0,
  maxValue: 20000,
  hideDefaultValue: false,
  wheelFactor: 2
}

const knobOptionsCV = {...knobOptions, maxValue : 100, minValue: 1}

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

onMounted(() => {
  mount()
})

let mount = () => {
  node.data = reactive({
    ...node.data,
    frequency: node.data.frequency ?? 400,
    type: node.data.type ?? "lowpass",
    cv_in_level: node.data.cv_in_level ?? 1,
  })

  watch(node.data, () => {
    emitChange();
  })
}

eventBus.on('remountModules', () => {
  mount()
})

let emitChange = () => {
  emit('moduleChanged', [{id: props.id, data: node.data}])
}
</script>
<script>
export default {
  data(){
    return {
      frequency: null,
      waveform: "sine"
    }
  }
}
</script>
<style scoped>
span {
  margin-left: 10px;
}

.controls {
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0;
  padding: 0;
}

p {
  margin: 0;
  padding: 0;
  color: var(--c-semitransparent);
  font-size: 0.6rem;
}

input[type=text] {
  width: 80px;
}
</style>
