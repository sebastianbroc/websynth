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
      <div>
        <input type="text" v-model="node.data.frequency" v-on:input="emitChange"><span>Hz</span>
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
        <Handle id="main" type="target" class="custom_handle port_input" :position="Position.Top" /><span>signal in</span>
      </div>
      <div class="control_row">
        <Handle type="source" class="custom_handle port_output" :position="Position.Bottom" /><span>output</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
const emit = defineEmits(['nodesChange'])
const {node} = useNode()

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

onMounted(() => {
  node.data = {
    ...node.data,
    frequency: node.data.frequency ?? 400,
    type: node.data.type ?? "lowpass"
  }
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
