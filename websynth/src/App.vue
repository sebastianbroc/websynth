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
</style>
