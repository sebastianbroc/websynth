<template>
  <div>
    <div class="savemodal" :class="{visible: visible && type === 'save'}">
      <h2>What's the name of your creation?</h2>
      <div class="text_input">
        <input type="text" id="patchname" placeholder="My Patch" v-model="patchname"><span class="file-ending">.json</span>
      </div>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel')" class="cancel">cancel</button>
        <button @click="emitEvent('save')" :disabled="!patchname">save</button>
      </div>
    </div>
    <div class="loadmodal" :class="{visible: visible && type === 'load'}">
      <h2>Select or drag-and-drop a valid .json patch file</h2>
      <div class="text_input">
        <input type="file" id="patchfile" @change="loadFile">
      </div>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel')" class="cancel">cancel</button>
        <button @click="emitEvent('load')">load</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleBar',
  props: ['visible', 'type'],
  inject: ["eventBus"],
  data() {
    return {
      patchname: null,
      patch: null
    }
  },
  methods: {
    emitEvent(type){
      if(type === "save"){
        this.eventBus.emit("modal-click-save", this.patchname)
        this.patchname = null
      } else if (type === "load"){
        this.eventBus.emit("modal-click-load", this.patch)
        this.patch = null
      } else if (type === "cancel"){
        this.patch = null
        this.patchname = null
        this.eventBus.emit("modal-click-cancel")
      }
    },
    loadFile(e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.readFile(files[0]);
    },
    readFile(file){
      let reader = new FileReader();
      reader.onload = e => {
        this.patch = JSON.parse(JSON.stringify(e.target.result));
      };
      reader.readAsText(file);
    }
  }
}
</script>

<style lang="scss">
.savemodal, .loadmodal {
  display: none;
  position: absolute;
  padding: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--c-secondary);
  z-index: 1001;

  &.visible {
    display: flex;
  }

  flex-direction: column;
  gap: 10px;

  h2 {
    margin: 0;
    font-weight: normal;
    font-family: monospace;
  }

  #patchname, .file-ending {
    background: transparent;
    font-size: 1.2rem;
    font-family: monospace;
    border: none;

    &:focus {
      outline: none;
    }
  }

  .file-ending {
    color: grey;
    user-select: none;
  }

  .buttonWrapper {
    display: flex;
    justify-content: end;
    gap: 10px;

    button {
      cursor: pointer;
      font-family: monospace;
      background: none;

      &.cancel {
        border: solid 2px var(--warning-two);
        color: var(--warning-two);
      }
    }
  }
}
</style>
