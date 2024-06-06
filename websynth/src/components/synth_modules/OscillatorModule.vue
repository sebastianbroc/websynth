<template>
  <div class="synth_module">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <div class="module_label">
      <h3>Oscillator</h3>
      <p>{{ label }}</p>
    </div>
    <div class="controls">
      <div>
        <input type="text" @input="event => updateFrequency(event.target.value)"><span>Hz</span>
      </div>
      <select @input="event => updateWaveform(event.target.value)">
        <option value="sine">Sine</option>
        <option value="sawtooth">Saw</option>
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
import {useVueFlow, Handle, Position} from "@vue-flow/core";
const {updateNodeData} = useVueFlow()
const emit = defineEmits(['nodesChange'])

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

let updateFrequency = (frequency) => {
  updateNodeData(props.id, {frequency})
  emit('moduleChanged')
}

let updateWaveform = (waveform) => {
  updateNodeData(props.id, {waveform})
  emit('moduleChanged')
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
</style>
