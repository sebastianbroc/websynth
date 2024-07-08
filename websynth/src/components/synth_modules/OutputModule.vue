<template>
  <div class="synth_module">
    <div class="module_label">
      <div>
        <h3>Output</h3>
      </div>
      <img class="icon" src="@/assets/icons/icon_output.png">
    </div>
    <div class="controls">
      <div class="control_row">
        <Handle type="target" class="custom_handle port_input" :position="Position.Left" /><span>signal in</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'
</script>

<style scoped>
 h3 {
   margin: 0;
   width: fit-content;
 }
</style>
