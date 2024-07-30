<template>
  <div class="synth_module">
    <div class="module_label">
      <div>
        <h3>Clock</h3>
        <p>{{ label }}</p>
      </div>
      <img class="icon" src="@/assets/icons/icon_clock.png">
    </div>
    <div class="controls">
      <div class="control_row">
        <ControlKnob v-model="node.data.interval" :options="knobOptions" v-if="store.state.inputType === 'knob'"></ControlKnob>
        <input type="number" min="0" v-model="node.data.interval" v-if="store.state.inputType === 'text'">
        <span class="triggered_light" :class="{active: triggered}"></span>
        <span>interval</span>
      </div>
      <div class="control_row" style="justify-content: space-between;">
        <button @click="togglePause" style="margin-left: 3px;">
          <img alt="pause button" class="icon" src="@/assets/icons/icon_pause.png" v-if="!node.data.paused">
          <img alt="play button" class="icon" src="@/assets/icons/icon_play.png" v-if="node.data.paused">
        </button>
        <span>play/pause</span>
      </div>
      <div class="divider_row"></div>
      <div class="control_row">
        <div><Handle type="source" class="custom_handle port_output" :position="Position.Bottom"/><span>output</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, reactive, watch, ref} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
import store from "@/store";
import ControlKnob from "@slipmatio/control-knob";
const emit = defineEmits(['nodesChange', 'clockTrigger', 'moduleChanged'])
const {node} = useNode()

//eslint-disable-next-line
const props = defineProps(['id', 'label'])

const knobOptions = {
  bgClass: "knobBG",
  svgClass: "knobSVG",
  rimClass: "knobRim",
  valueArchClass: "knobValueArch",
  tickClass: "knobTick",
  valueTextClass: "knobText",
  minValue: 1,
  maxValue: 1000,
  hideDefaultValue: false,
  wheelFactor: 1
}

let triggered = ref(false)

onMounted(() => {
  node.data = reactive({
    ...node.data,
    interval: node.data.interval ?? 1000,
    paused: node.data.paused ?? false
  })

  trigger()

  watch(node.data, () => {
    emitChange();
  })
})

let togglePause = () => {
  node.data.paused = !node.data.paused;
  trigger()
}

let trigger = () => {
  if(!node.data.paused){
    triggered.value = true
    setTimeout(turnOffTriggered, 100)
    emitTrigger()
    setTimeout(trigger, node.data.interval)
  }
}

let turnOffTriggered = () => {
  triggered.value = false
}

let emitTrigger = () => {
  emit('clockTrigger', [{id: props.id, data: node.data}])
}

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
  gap: 5px;

  .control_row {
    display: flex;
    gap: 10px;
    align-items: center;

    div {
      display: flex;
      align-items: center;
    }

    .triggered_light {
      min-width: 5px;
      min-height: 5px;
      display: inline-block;
      background: var(--c-secondary);

      &.active {
        background: white;
        display: inline-block;
        box-shadow: 0 0 5px var(--c-secondary);
      }
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
  width: 50px;
}

button {
  cursor: pointer;
  background: var(--c-secondary);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  img {
    width: 20px;
  }

  &:hover {
    background: var(--lighten);
  }
}
</style>
