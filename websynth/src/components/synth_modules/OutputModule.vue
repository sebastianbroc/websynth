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
    <p v-if="!store.state.playbackHalted" class="warning">Playback<br>halted</p>
  </div>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'
import store from "../../store";
</script>

<style scoped>
  .synth_module {
    position: relative;
  }

 h3 {
   margin: 0;
   width: fit-content;
 }

 p {
   margin: 0;
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background: rgba(0,0,0, 0.8) !important;
 }
</style>
