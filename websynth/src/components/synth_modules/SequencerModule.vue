<template>
  <div class="synth_module">
    <div class="module_label">
      <div>
        <h3>Sequencer</h3>
        <p>{{ label }}</p>
      </div>
      <img class="icon" src="@/assets/icons/icon_sequencer.png">
    </div>
    <div class="controls">
      <div class="sequencer_row">
          <div v-for="(step, i) in node.data.steps" :key="i" class="step">
            <span class="current_step_light" :class="{active: node.data.currentStep === i}"></span>
            <ControlKnob v-model="node.data.steps[i]" :options="knobOptions" v-if="store.state.inputType === 'knob'"></ControlKnob>
            <input type="number" min="0" v-model="node.data.steps[i]" v-on:input="emitChange" v-if="store.state.inputType === 'text'">
          </div>
      </div>
      <div class="divider_row"></div>
      <div class="control_row">
        <div><Handle type="source" class="custom_handle port_input" id="clock_in" :position="Position.Bottom" /><span>clock in</span></div>
        <div><Handle type="source" class="custom_handle port_output" :position="Position.Bottom"/><span>output</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, onBeforeMount,  reactive, watch} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
import store from "@/store";
import ControlKnob from "@slipmatio/control-knob";
const emit = defineEmits(['nodesChange'])
const {node} = useNode()

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

const knobOptions = {
  bgClass: "knobBG",
  svgClass: "knobSVG",
  rimClass: "knobRim",
  valueArchClass: "knobValueArch",
  tickClass: "knobTick",
  valueTextClass: "knobText",
  minValue: 0,
  maxValue: 20000,
  hideDefaultValue: false,
  wheelFactor: 2
}

onBeforeMount(() => {
  node.data = {
    ...node.data,
    steps : node.data.steps ?? [0],
    currentStep: node.data.currentStep ?? 0
  }
})

onMounted(() => {
  node.data = reactive({
    ...node.data,
    steps : buildStepsArray(16),
    currentStep: 0
  })

  watch(node.data, () => {
    emitChange();
    if(node.data.currentStep > 15) node.data.currentStep = 0
  })
})

//eslint-disable-next-line
let next = () => {
  node.data.currentStep++
}

let buildStepsArray = (length) => {
  let array = []
  for(let i=0; i<length; i++){
    array.push((node.data.steps && node.data.steps[i]) ?? 0)
  }
  return array
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

  .control_row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;

    div {
      display: flex;
      align-items: center;
    }
  }

  .sequencer_row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

    .current_step_light {
      min-width: 5px;
      min-height: 5px;
      display: inline-block;
      background: var(--c-secondary);

      &.active {
        background: white;
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
