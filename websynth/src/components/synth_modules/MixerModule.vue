<template>
  <div class="synth_module">
    <div class="module_label">
      <div>
        <h3>Mixer</h3>
        <p>{{ label }}</p>
      </div>
      <img class="icon" src="@/assets/icons/icon_mixer.png">
    </div>
    <div class="controls">
      <div class="volumes" v-if="node.data.volumes">
        <div class="volume_row">
          <Handle id="1" type="target" class="custom_handle port_input" :position="Position.Left" /><input type="number" value="100" min="0" v-model="node.data.volumes[0]" v-on:input="emitChange" ><span :class="{warning: node.data.volumes[0] > 1}"></span>
        </div>
        <div class="volume_row">
          <Handle id="2" type="target" class="custom_handle port_input" :position="Position.Left"/><input type="number" value="100" min="0" v-model="node.data.volumes[1]" v-on:input="emitChange" ><span :class="{warning: node.data.volumes[1] > 1}"></span>
        </div>
        <div class="volume_row">
          <Handle id="3" type="target" class="custom_handle port_input" :position="Position.Left"/><input type="number" value="100" min="0" v-model="node.data.volumes[2]" v-on:input="emitChange" ><span :class="{warning: node.data.volumes[2] > 1}"></span>
        </div>
        <div class="volume_row">
          <Handle id="4" type="target" class="custom_handle port_input" :position="Position.Left"/><input type="number" value="100" min="0" v-model="node.data.volumes[3]" v-on:input="emitChange" ><span :class="{warning: node.data.volumes[3] > 1}"></span>
        </div>
      </div>
      <div class="divider_row"></div>
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
    volumes: node.data.volumes ?? [1,1,1,1],
    channels: node.data.channels ?? 4
  }
})

let emitChange = () => {
  emit('moduleChanged')
}
</script>
<style scoped>
.controls {
  display: flex;
  flex-direction: column;
}

.volumes {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .volume_row {
    display: flex !important;
    align-items: center;
    gap: 10px;

    span {
      min-width: 10px;
      min-height: 10px;
      display: inline-block;
      border-radius: 100px;
    }
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
  width: 60px;
}
</style>
