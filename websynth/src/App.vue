<template>
  <router-view/>
</template>

<style>
:root {
  --c-primary: #FEFAE0;
  --c-secondary: #D4A373;
  --c-tertiary: #FAEDCD;
  --c-four: #E9EDC9;
  --c-five: #CCD5AE;
  --c-semitransparent: rgba(0,0,0,0.2);

  --warning-one: #ff7300;
  --warning-two: #ff0000;

  --lighten: rgba(255,255,255,0.8);


  --p-knob-range-background: var(--c-secondary);
  --p-knob-value-background: white;
  --p-knob-text-color: white;
  --p-knob-focus-ring-color: white;
  --p-knob-focus-ring-offset: 200px;
  --p-knob-focus-ring-width: 0;
  --p-knob-focus-ring-shadow: none;
}

#app {
  font-family: 'Inter', sans-serif;
}

body {
  margin: 0;
  background: var(--c-primary);
}

.warning {
  animation: warning-color 1s infinite;
}

@keyframes warning-color {
  0% {background : var(--warning-one);}
  50% {background : var(--warning-two);}
  100% {background : var(--warning-one);}
}

.synth_module {
  background: var(--c-primary);
}

.custom_handle {
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  transform: none !important;
}

.port_input {
  background: red !important;
}

.port_output {
  background: var(--c-secondary) !important;
}

.divider_row {
  height: 20px;
}

.vue-flow__edges {
  z-index: 1001 !important;
}
</style>
