<template>
  <div class="synth_module">
    <div class="module_label">
      <div>
        <h3>Envelope</h3>
        <p>{{ label }}</p>
      </div>
      <img class="icon" src="@/assets/icons/icon_envelope.png">
    </div>
    <div class="controls">
      <div class="control_row">
        <span>A</span>
        <div class="control_row">
          <input type="number" min="0" v-model="node.data.attack" v-on:input="emitChange" v-if="store.state.inputType === 'text'">
          <ControlKnob v-model="node.data.attack" :options="knobOptions" v-if="store.state.inputType === 'knob'"></ControlKnob>
          <span>ms</span>
        </div>
      </div>
      <div class="control_row">
        <span>D</span>
        <div class="control_row">
          <input type="number" min="0" v-model="node.data.decay" v-on:input="emitChange" v-if="store.state.inputType === 'text'">
          <ControlKnob v-model="node.data.decay" :options="knobOptions" v-if="store.state.inputType === 'knob'"></ControlKnob>
          <span>ms</span>
        </div>
      </div>
      <div class="control_row">
        <span>S</span>
        <div class="control_row">
          <input type="number" min="0" v-model="node.data.sustain" v-on:input="emitChange" v-if="store.state.inputType === 'text'">
          <ControlKnob v-model="node.data.sustain" :options="knobOptions" v-if="store.state.inputType === 'knob'"></ControlKnob>
          <span>ms</span>
        </div>
      </div>
      <div class="control_row">
        <span>R</span>
        <div class="control_row">
          <input type="number" min="0" v-model="node.data.release" v-on:input="emitChange" v-if="store.state.inputType === 'text'">
          <ControlKnob v-model="node.data.release" :options="knobOptions" v-if="store.state.inputType === 'knob'"></ControlKnob>
          <span>ms</span>
        </div>
      </div>
      <div class="control_row">
        <button @click="manualTrigger">trigger</button>
      </div>
      <div class="divider_row"></div>
      <div class="control_row">
        <Handle type="source" class="custom_handle port_output" :position="Position.Bottom" /><span>output</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, reactive, watch} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
import store from "@/store";
import ControlKnob from "@slipmatio/control-knob";
const emit = defineEmits(['nodesChange'])
const {node} = useNode()

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

const knobOptions = {
  bgClass: "knobBG",
  svgClass: "knobSVG",
  rimClass: "knobRim",
  valueArchClass: "knobValueArch",
  tickClass: "knobTick",
  valueTextClass: "knobText",
  minValue: 0,
  maxValue: 1000,
  hideDefaultValue: false,
  wheelFactor: 2
}

onMounted(() => {
  node.data = reactive({
    ...node.data,
    attack: node.data.attack ?? 10,
    decay: node.data.decay ?? 10,
    sustain: node.data.sustain ?? 10,
    release: node.data.release ?? 10,
    triggered: node.data.triggered ?? false
  })

  watch(node.data, () => {
    emitChange();
  })
})

let manualTrigger = () => {
  console.log("manual trigger")
  node.data.triggered = true
  emitChange()
}

let emitChange = () => {
  emit('moduleChanged', [{id: props.id, data: node.data}])
  node.data.triggered = false
}
</script>
<style scoped>
span {
  margin-left: 10px;
}

.controls {
  display: flex;
  flex-direction: column;

  .control_row {
    display: flex;
    gap: 10px;
    align-items: center;
  }
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

input[type=number] {
  width: 50px;
}
</style>
