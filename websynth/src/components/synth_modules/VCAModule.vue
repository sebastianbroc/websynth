<template>
  <div class="synth_module">
    <div class="module_label">
      <div>
        <h3>VCA</h3>
        <p>{{ label }}</p>
      </div>
      <img class="icon" src="@/assets/icons/icon_vca.png">
    </div>
    <div class="controls">
      <div class="control_row">
        <Handle id="main" type="target" class="custom_handle port_input" :position="Position.Left"/><span>signal in</span>
      </div>
      <div class="control_row">
        <Handle id="gain" type="target" class="custom_handle port_input" :position="Position.Left"/><span>control in</span>
      </div>
      <div class="divider_row"></div>
      <div class="control_row">
        <Handle type="source" class="custom_handle port_output" :position="Position.Bottom"/><span>output</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import {Handle, Position} from "@vue-flow/core";

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])


</script>
<style scoped>
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
