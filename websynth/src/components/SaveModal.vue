<template>
  <div>
    <div class="modal savemodal" :class="{visible: visible && type === 'save'}">
      <h2>What's the name of your creation?</h2>
      <div class="text_input">
        <input type="text" id="patchname" placeholder="My Patch" v-model="patchname"><span class="file-ending">.json</span>
      </div>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel', true)" class="cancel">cancel</button>
        <button @click="emitEvent('save', true)" :disabled="!patchname">save</button>
      </div>
    </div>
    <div class="modal loadmodal" :class="{visible: visible && type === 'load'}">
      <h2>Select a valid .json patch file</h2>
      <div class="text_input">
        <input type="file" id="patchfile" @change="loadFile">
      </div>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel', true)" class="cancel">cancel</button>
        <button @click="emitEvent('load', true)">load</button>
      </div>
    </div>
    <div v-if="type === 'start_collaboration'">
      <div class="modal start_collaboration_modal" :class="{visible: visible && type === 'start_collaboration' && !store().state.sessionID && !collaboration_type && !session}">
        <h2>Collaborate</h2>
        <div class="choice_buttons">
          <button @click="collaboration_type = 'create'"><img src="@/assets/add.svg"><p>Create Session</p></button>
          <button @click="collaboration_type = 'join'"><img src="@/assets/join.svg"><p>Join Session</p></button>
        </div>
        <div class="buttonWrapper">
          <button @click="emitEvent('cancel', true)" class="cancel">cancel</button>
        </div>
      </div>
      <div class="modal start_collaboration_modal" :class="{visible: visible && type === 'start_collaboration' && !store().state.sessionID && collaboration_type === 'create'}">
        <h2>Start Collaboration</h2>
        <div class="text_input">
          <input type="text" v-model="username" placeholder="your name"><br>
          <input type="password" v-model="password" placeholder="session password"><br>
          <input type="password" v-model="retypePassword" placeholder="repeat password"><br>
          <p class="help_text">Set a password if you want to limit access to your session.<br>Otherwise, leave the fields blank.</p>
        </div>
        <div class="buttonWrapper">
          <button @click="emitEvent('cancel', true)" class="cancel">cancel</button>
          <button @click="emitEvent('start_collaboration_button')" :disabled="((password || retypePassword) && (password !== retypePassword) || !username)">start collaborating</button>
        </div>
      </div>
      <div class="modal start_collaboration_modal" :class="{visible: visible && type === 'start_collaboration' && !store().state.sessionID && collaboration_type === 'join'}">
        <h2>Join Session</h2>
        <div class="text_input" v-if="!store().state.info">
          <input type="text" v-model="username" placeholder="your name"><br>
          <input type="text" v-model="existingSessionID" placeholder="session id"><br>
          <input type="password" v-model="password" placeholder="session password"><br>
          <p class="help_text error" v-if="store().state.error">{{store().state.error}}</p>
          <p class="help_text">Enter the Session ID you got from the host to join.</p>
          <p class="help_text"><b class="help_text error">Warning:</b> Your current patch will get overwritten by the remote session's patch. Save your patch before joining if you want to keep it!</p>
        </div>
        <div class="text_input" v-if="store().state.info" style="display: flex; flex-direction: column; align-items: center">
          <span class="loader"></span>
          <p class="help_text">{{store().state.info}}</p>
        </div>
        <div class="buttonWrapper">
          <button @click="emitEvent('cancel', true); store().commit('changeInfo', null); store().commit('changeError', null);" class="cancel">cancel</button>
          <button @click="emitEvent('join_collaboration_button')" :disabled="!existingSessionID || !username" v-if="!store().state.info">join</button>
        </div>
      </div>
    </div>
    <div class="modal start_collaboration_modal" :class="{visible: visible && type === 'start_collaboration' && store().state.sessionID && collaboration_type === 'create'}">
      <h2>Your Session has been successfully created!</h2>
      <p>Your Session ID is: <b @click="copyText(store().state.sessionID)">{{store().state.sessionID}}</b></p>
      <p>Use this link to invite collaborators: <i><a :href="'https://sebastianbroc.github.io/websynth/?session=' + store().state.sessionID">{{"https://sebastianbroc.github.io/websynth/?session=" + store().state.sessionID}}</a></i></p>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel', true)" class="finish">start patching</button>
      </div>
    </div>
    <div class="modal start_collaboration_modal" :class="{visible: visible && type === 'start_collaboration' && store().state.sessionID && collaboration_type === 'join'}">
      <h2>You have successfully joined the Session!</h2>
      <p>You are now Part of the Session <b>{{store().state.sessionID}}</b>!</p>
      <div class="buttonWrapper">
        <button @click="emitEvent('cancel', true); sendRemount();" class="finish">start patching</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: 'ModuleBar',
  props: ['visible', 'type', 'session'],
  inject: ["eventBus"],
  data() {
    return {
      username: null,
      patchname: null,
      patch: null,
      password: null,
      retypePassword: null,
      collaboration_type: null,
      existingSessionID: null
    }
  },
  mounted(){
    if(this.session){
      this.existingSessionID = this.session
      this.collaboration_type = "join"
    }
  },
  methods: {
    store(){
      return store
    },
    emitEvent(type, reset){
      if(type === "save"){
        this.eventBus.emit("modal-click-save", this.patchname)
      } else if (type === "load"){
        this.eventBus.emit("modal-click-load", this.patch)
      } else if (type === "start_collaboration_button"){
        this.eventBus.emit("modal-click-start_collaboration", {username: this.username, password: this.password})
      } else if(type === "join_collaboration_button"){
        this.eventBus.emit("modal-click-join_collaboration", {id: this.existingSessionID, username: this.username, password: this.password})
      } else if (type === "cancel"){
        this.eventBus.emit("modal-click-cancel")
      }

      if(reset) this.resetFields()
    },
    sendRemount(){
      this.eventBus.emit("remountModules", {})
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
    copyText(text) {
        navigator.clipboard.writeText(text);
    },
    resetFields(){
      this.username = null
      this.patch = null
      this.patchname = null
      this.password = null
      this.retypePassword = null
      this.collaboration_type = null
      this.existingSessionID = null
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

  b {
    cursor: pointer;
  }

  b:hover {
    background: var(--lighten);
  }

  #patchname, .file-ending, input {
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
    margin-top: 10px;

    &.error {
      color: red;
    }
  }

  .choice_buttons {
    display: flex;
    gap: 10px;

    button {
      cursor: pointer;
      width: 50%;
      background: none;
      border: solid 2px;
      outline: none;

      &:hover {
        background: white;
      }

      img {
        filter: invert(100%);
        width: 80px;
      }

      p {
        margin: 5px;
        white-space: nowrap;
      }
    }
  }
}

.loader{
  display: block;
  position: relative;
  height: 20px;
  width: 140px;
  background-image:
      linear-gradient(#FFF 20px, transparent 0),
      linear-gradient(#FFF 20px, transparent 0),
      linear-gradient(#FFF 20px, transparent 0),
      linear-gradient(#FFF 20px, transparent 0);
  background-repeat: no-repeat;
  background-size: 20px auto;
  background-position: 0 0, 40px 0, 80px 0, 120px 0;
  animation: pgfill 1s linear infinite;
}
@keyframes pgfill {
  0% {   background-image: linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0); }
  25% {   background-image: linear-gradient(var(--c-primary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0); }
  50% {   background-image: linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-primary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0); }
  75% {   background-image: linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-primary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0); }
  100% {   background-image: linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-secondary) 20px, transparent 0), linear-gradient(var(--c-primary) 20px, transparent 0); }
}

</style>
