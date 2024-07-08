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
      <div>
        <Knob v-model="frequency" :min="0" :size="50" :max="20000" style="z-index: 5000; display: none;"></Knob>
      </div>
      <div>
        <input type="text" v-model="frequency" @input="event => updateFrequency(event.target.value)"><span>Hz</span>
      </div>
      <select @input="event => updateWaveform(event.target.value)" v-model="waveform">
        <option value="sine" selected>Sine</option>
        <option value="sawtooth">Saw</option>
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
      </select>
      <div class="divider_row"></div>
      <div class="control_row">
        <Handle type="source" class="custom_handle port_output" :position="Position.Bottom" /><span>output</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Knob from "primevue/knob"
import {defineProps, defineEmits, onMounted, watch} from 'vue'
import {useVueFlow, Handle, Position} from "@vue-flow/core";
const {updateNodeData} = useVueFlow()
const emit = defineEmits(['nodesChange'])

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

let frequency = null
let waveform = null

let updateFrequency = (frequency) => {
  updateNodeData(props.id, {frequency})
  emit('moduleChanged')
}
let updateWaveform = (waveform) => {
  updateNodeData(props.id, {waveform})
  emit('moduleChanged')
}

let initialize = (frequency, waveform) => {
  updateNodeData(props.id, {frequency, waveform})
}

onMounted(() => {
  initialize(400, "sine")
  frequency = 400
  waveform = "sine"
})

watch(frequency, (newValue) => {
  console.log(frequency)
  updateFrequency(newValue)
});

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
