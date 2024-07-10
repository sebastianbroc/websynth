<template>
  <div class="savemodal" :class="{visible: visible}">
      <h2>What's the name of your patch?</h2>
      <input type="text" id="patchname" placeholder="My Patch" v-model="patchname">
      <div class="saveButton">
        <button @click="emitEvent('save')">save</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleBar',
  props: ['visible'],
  inject: ["eventBus"],
  data() {
    return {
      patchname: null
    }
  },
  methods: {
    emitEvent(){
      this.eventBus.emit("modal-click-save", this.patchname)
    },
  }
}
</script>

<style lang="scss">
.savemodal {
  display: none;
  position: absolute;
  padding: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--c-secondary);
  z-index: 1000;

  &.visible {
    display: flex;
  }

  flex-direction: column;
  gap: 20px;

  h2 {
    margin: 0;
    font-weight: normal;
    font-family: monospace;
  }

  #patchname {
    background: transparent;
    font-size: 1.2rem;
    font-family: monospace;
    border: none;

    &:focus {
      outline: none;
    }
  }

  .saveButton {
    display: flex;
    justify-content: end;

    button {
      font-family: monospace;
    }
  }
}
</style>
