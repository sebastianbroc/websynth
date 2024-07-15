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
        <Knob v-bind:value="node.data.frequency" v-on:input="node.data.frequency = $event.target.value" :min="0" :size="50" :max="20000" style="z-index: 5000; display: none;"></Knob>
      </div>
      <div>
        <input type="text" v-model="node.data.frequency" v-on:input="emitChange"><span>Hz</span>
      </div>
      <select v-model="node.data.waveform" v-on:change="emitChange">
        <option value="sine">Sine</option>
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
import {defineEmits, defineProps, onMounted} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
const {node} = useNode()
const emit = defineEmits(['nodesChange'])

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

onMounted(() => {
  node.data = {
    ...node.data,
    frequency: node.data.frequency ?? 400,
    waveform: node.data.waveform ?? "sine"
  }
})

let emitChange = () => {
  emit('moduleChanged', [{id: props.id, data: node.data}])
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
