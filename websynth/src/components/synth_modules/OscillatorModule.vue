<template>
  <div class="synth_module">
    <!--<Handle type="target" :position="Position.Top" />-->
    <div class="module_label">
      <div>
        <h3>Oscillator</h3>
        <p>{{ label }}</p>
      </div>
      <img class="icon" src="@/assets/icons/icon_oscillator.png">
    </div>
    <div class="controls">
      <div class="control_row">
        <ControlKnob v-model="node.data.frequency" :options="knobOptions" v-if="store.state.inputType === 'knob'"></ControlKnob>
        <input type="text" v-model="node.data.frequency" v-on:input="emitChange" v-if="store.state.inputType === 'text'"><span v-if="store.state.inputType === 'text'">Hz</span>
        <Handle type="target" class="custom_handle port_input" id="prop frequency"></Handle>
        <span style="margin: 0;">frequency</span>
      </div>
      <div class="control_row cv">
        <ControlKnob v-model="node.data.cv_in_level" :options="knobOptionsCV" v-if="store.state.inputType === 'knob'"></ControlKnob>
        <input type="text" v-model="node.data.cv_in_level" v-on:input="emitChange" v-if="store.state.inputType === 'text'">
      </div>
      <select v-model="node.data.waveform" v-on:change="emitChange">
        <option value="sine">Sine</option>
        <option value="sawtooth">Saw</option>
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
      </select>
      <div class="divider_row"></div>
      <div class="control_row">
        <Handle type="source" class="custom_handle port_output" id="out audio" :position="Position.Bottom" /><span>output</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from "@/store";
import {defineEmits, defineProps, inject, onMounted, reactive, watch} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
const {node} = useNode()
const emit = defineEmits(['nodesChange','moduleChanged'])
const eventBus = inject("eventBus")
import ControlKnob from '@slipmatio/control-knob'

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
  wheelFactor: 1
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
    waveform: node.data.waveform ?? "sine",
    cv_in_level: node.data.cv_in_level ?? 1,
  })

  watch(node.data, () => {
    node.data.frequency = node.data.frequency === 0 ? "0" : node.data.frequency
    emitChange();
  })
}

let emitChange = () => {
  emit('moduleChanged', [{id: props.id, data: node.data}])
}

eventBus.on('remountModules', () => {
  mount()
})

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
