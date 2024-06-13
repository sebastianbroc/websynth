<template>
  <div class="synth_module">
    <Handle type="source" :position="Position.Bottom" />
    <div class="module_label">
      <h3>Mixer</h3>
      <p>{{ label }}</p>
    </div>
    <div class="controls">
      <div class="inputs">
        <Handle id="1" type="target" :position="Position.Left" style="top: 55px;" />
        <Handle id="2" type="target" :position="Position.Left" style="top: 86px;" />
        <Handle id="3" type="target" :position="Position.Left" style="top: 118px;" />
        <Handle id="4" type="target" :position="Position.Left" style="top: 150px;" />
      </div>
      <div class="volumes">
        <div class="volume_row">
          <input type="number" value="100" min="0" @input="event => updateVolumes(0, event.target.value, channels)"><span :class="{warning: volumes[0] > 1}"></span>
        </div>
        <div class="volume_row">
          <input type="number" value="100" min="0" @input="event => updateVolumes(1, event.target.value, channels)"><span :class="{warning: volumes[1] > 1}"></span>
        </div>
        <div class="volume_row">
          <input type="number" value="100" min="0" @input="event => updateVolumes(2, event.target.value, channels)"><span :class="{warning: volumes[2] > 1}"></span>
        </div>
        <div class="volume_row">
          <input type="number" value="100" min="0" @input="event => updateVolumes(3, event.target.value, channels)"><span :class="{warning: volumes[3] > 1}"></span>
        </div>
      </div>
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

let volumes = [
    1,
    1,
    1,
    1
]

let channels = volumes.length

let updateVolumes = (channel, volume, channels) => {
  volumes[channel] = parseFloat(parseInt(volume) / 100);
  updateNodeData(props.id, {volumes, channels})
}

let initialize = (volumes, channels) => {
  updateNodeData(props.id, {volumes, channels})
  emit('moduleChanged')
}

onMounted(() => {
  initialize(volumes,channels)
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

.volumes {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .volume_row {
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
