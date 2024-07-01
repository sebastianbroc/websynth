<template>
  <div class="synth_module">
    <Handle id="main" type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <div class="module_label">
      <h3>Filter</h3>
      <p>{{ label }}</p>
    </div>
    <div class="controls">
      <div>
        <input type="text" @input="event => updateFrequency(event.target.value)" value="400"><span>Hz</span>
      </div>
      <select @input="event => updateType(event.target.value)">
        <option value="lowpass" selected>Low-Pass</option>
        <option value="highpass">High-Pass</option>
        <option value="bandpass">Band-Pass</option>
        <option value="lowshelf">Low-Shelf</option>
        <option value="highshelf">High-Shelf</option>
        <option value="notch">Notch</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted} from 'vue'
import {useVueFlow, Handle, Position} from "@vue-flow/core";
const {updateNodeData} = useVueFlow()
const emit = defineEmits(['nodesChange'])

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

let updateType = (type) => {
  updateNodeData(props.id, {type})
  emit('moduleChanged')
}

let updateFrequency = (frequency) => {
  updateNodeData(props.id, {frequency})
  emit('moduleChanged')
}

let initialize = (type, frequency) => {
  updateNodeData(props.id, {type, frequency})
}

onMounted(() => {
  initialize("lowpass", 400)
})
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
