<template>
  <div class="synth_module">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <div class="module_label">{{ label }}</div>
    <input type="text" @input="event => updateData(event.target.value)"><span>Hz</span>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import {useVueFlow, Handle, Position} from "@vue-flow/core";

const {updateNodeData} = useVueFlow()

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

let updateData = (frequency) => {
  updateNodeData(props.id, {frequency})
}
</script>
<style scoped>
span {
  margin-left: 10px;
}
</style>
