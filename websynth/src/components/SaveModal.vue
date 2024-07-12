<template>
  <div>
    <div class="modal savemodal" :class="{visible: visible && type === 'save'}">
      <h2>What's the name of your creation?</h2>
      <div class="text_input">
        <input type="text" id="patchname" placeholder="My Patch" v-model="patchname"><span class="file-ending">.json</span>
      </div>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel')" class="cancel">cancel</button>
        <button @click="emitEvent('save')" :disabled="!patchname">save</button>
      </div>
    </div>
    <div class="modal loadmodal" :class="{visible: visible && type === 'load'}">
      <h2>Select or drag-and-drop a valid .json patch file</h2>
      <div class="text_input">
        <input type="file" id="patchfile" @change="loadFile">
      </div>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel')" class="cancel">cancel</button>
        <button @click="emitEvent('load')">load</button>
      </div>
    </div>
    <div class="modal start_collaboration_modal" :class="{visible: visible && type === 'start_collaboration' && !store().state.sessionID}">
      <h2>Start Collaboration</h2>
      <div class="text_input">
        <input type="password" v-model="password" placeholder="session password"><br>
        <input type="password" v-model="retypePassword" placeholder="repeat password"><br>
        <p class="help_text">Set a password if you want to limit access to your session.<br>Otherwise, leave the fields blank.</p>
      </div>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel')" class="cancel">cancel</button>
        <button @click="emitEvent('start_collaboration_button')" :disabled="(password || retypePassword) && (password !== retypePassword)">start collaborating</button>
      </div>
    </div>
    <div class="modal start_collaboration_modal" :class="{visible: visible && type === 'start_collaboration' && store().state.sessionID}">
      <h2>Your Session has been successfully created!</h2>
      <p>Your Session ID is: <b>{{store().state.sessionID}}</b></p>
      <p>Use this link to invite collaborators: <i>{{"http://test.com/?session=" + store().state.sessionID}}</i></p>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel')" class="finish">finish</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: 'ModuleBar',
  props: ['visible', 'type'],
  inject: ["eventBus"],
  data() {
    return {
      patchname: null,
      patch: null,
      password: null,
      retypePassword: null
    }
  },
  methods: {
    store(){
      return store
    },
    emitEvent(type){
      if(type === "save"){
        this.eventBus.emit("modal-click-save", this.patchname)
      } else if (type === "load"){
        this.eventBus.emit("modal-click-load", this.patch)
      } else if (type === "start_collaboration_button"){
        this.eventBus.emit("modal-click-start_collaboration", this.password)
      } else if (type === "cancel"){
        this.eventBus.emit("modal-click-cancel")
      }

      this.resetFields()
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
    },
    resetFields(){
      this.patch = null
      this.patchname = null
      this.password = null
      this.retypePassword = null
    }
  }
}
</script>

<style lang="scss">
.modal {
  border-radius: 5px;
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

  h2, p {
    margin: 0;
    font-weight: normal;
    font-family: monospace;
  }

  #patchname, .file-ending, input[type=password] {
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

      &.finish {
        border: solid 2px green;
        color: green;
      }
    }
  }

  .help_text {
    font-family: monospace;
  }
}
</style>
