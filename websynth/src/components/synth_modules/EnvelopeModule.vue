<template>
  <div class="synth_module">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <div class="module_label">
      <h3>Envelope</h3>
      <p>{{ label }}</p>
    </div>
    <div class="controls">
      <div class="control_row">
        <span>A</span><div><input type="number" min="0" v-model="attack" @input="updateData"><span>ms</span></div>
      </div>
      <div class="control_row">
        <span>D</span><div><input type="number" min="0" v-model="decay" @input="updateData"><span>ms</span></div>
      </div>
      <div class="control_row">
        <span>S</span><div><input type="number" min="0" v-model="sustain" @input="updateData"><span>ms</span></div>
      </div>
      <div class="control_row">
        <span>R</span><div><input type="number" min="0" v-model="release" @input="updateData"><span>ms</span></div>
      </div>
      <div class="control_row">
        <button @click="manualTrigger">trigger</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted } from 'vue'
import {useVueFlow, Handle, Position} from "@vue-flow/core";
const {updateNodeData} = useVueFlow()
const emit = defineEmits(['nodesChange'])

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

let attack = 10
let decay = 10
let sustain = 10
let release = 20

let triggered = false

let updateData = () => {
  updateNodeData(props.id, {attack, decay, sustain, release, triggered})
  emit('moduleChanged')
  triggered = false
}

let initialize = (attack, decay, sustain, release, triggered) => {
  updateNodeData(props.id, {attack, decay, sustain, release, triggered})
}

onMounted(() => {
  initialize(10,10, 10, 20, false)
})

let manualTrigger = () => {
  console.log("manual trigger")
  triggered = true
  updateData()
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
