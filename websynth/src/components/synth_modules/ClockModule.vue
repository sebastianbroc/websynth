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
        <span class="triggered_light" :class="{active: node.data.triggered}"></span>
        <span>interval</span>
      </div>
      <div class="divider_row"></div>
      <div class="control_row">
        <div><Handle type="source" class="custom_handle port_output" :position="Position.Bottom"/><span>output</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, reactive} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
import store from "@/store";
import ControlKnob from "@slipmatio/control-knob";
const emit = defineEmits(['nodesChange'])
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
  maxValue: 100,
  hideDefaultValue: false,
  wheelFactor: 1
}

onMounted(() => {
  node.data = reactive({
    ...node.data,
    interval: node.data.interval ?? 1000,
    triggered: false
  })

  trigger()
})

let trigger = () => {
  node.data.triggered = true
  setTimeout(turnOffTriggered, 100)
  emitTrigger()
  setTimeout(trigger, node.data.interval)
}

let turnOffTriggered = () => {
  node.data.triggered = false
}

let emitTrigger = () => {
  emit('clockTrigger', [{id: props.id, data: node.data}])
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
</style>
