<template>
  <div class="navbar">
    <div class="navbar-content one-third">
      <a><b>websynth</b> //</a>
      <div class="category">
        <a @click="e => {hideOtherMenus(e.target); e.target.classList.toggle('active');}">home</a>
        <div class="options">
          <span>there is nothing here yet</span>
        </div>
      </div>
      <div class="category">
        <a @click="e => {hideOtherMenus(e.target); e.target.classList.toggle('active');}">patch</a>
        <div class="options">
          <button @click="emitEvent('save patch to file')">save patch to file</button>
          <button @click="emitEvent('load patch from file')">load patch from file</button>
        </div>
      </div>
      <div class="category">
        <a @click="e => {hideOtherMenus(e.target); e.target.classList.toggle('active');}">view</a>
        <div class="options">
          <span>there is nothing here yet</span>
        </div>
      </div>
      <div class="category">
        <a @click="e => {hideOtherMenus(e.target); e.target.classList.toggle('active');}">options</a>
        <div class="options">
          <button @click="emitEvent('reset workspace')">reset workspace</button>
        </div>
      </div>
    </div>
    <div class="playback_controls one-third">
      <button @click="emitEvent('pause playback'); this.playing = false;" v-if="playing">
        <img class="icon" src="@/assets/icons/icon_pause.png"><span>pause</span>
      </button>
      <button @click="emitEvent('start playback'); this.playing = true;" v-if="!playing">
        <img class="icon" src="@/assets/icons/icon_play.png"><span>play</span>
      </button>
    </div>
    <div class="websocket-status one-third">
      <button v-if="!store().state.websocketConnected" class="collaborate" @click="emitEvent('start collaboration')"><img src="@/assets/collaborate.svg"> Collaborate</button>
      <div class="connection_status" v-if="store().state.websocketConnected">
        <div v-if="store().state.websocketConnected" id="connected"></div><div v-else id="disconnected"></div><p>Session <b>{{store().state.websocketConnected ? store().state.sessionID: 'disconnected'}}</b></p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: 'NavBar',
  inject: ["eventBus"],
  data() {
    return {
      playing: false
    }
  },
  methods: {
    store() {
      return store
    },
    emitEvent(param){
      this.eventBus.emit("navBar-click", param)
    },
    hideOtherMenus(e){
      let elements = document.querySelectorAll(".category a")
      elements.forEach(element => {
        if (element !== e) {
          element.classList.remove("active")
        }
      })
    }
  }
}
</script>

<style lang="scss">
.navbar {
  width: 100vw;
  background: var(--c-tertiary);
  display: flex;
  justify-content: space-between;
  position: relative;
  /*border-bottom: solid 1px black;*/
}

.navbar-content {
  margin-left: 10px;
  padding: 8px 0 8px 0;
  display: flex;

  .category {
    .options {
      display: none;
      position: absolute;
      background: white;
      padding: 10px;
      z-index: 1001;

      span {
        font-size: 0.8rem;
      }

      button {
        text-align: left;
        font-size: 0.8rem;
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
          background: var(--c-tertiary);
        }
      }
    }

    &:has(a.active) {
      background: var(--lighten);

      .options {
        display: flex;
        flex-direction: column;
      }
    }
  }

  a {
    padding: 0 4px 0 4px;
    border-radius: 2px;

    &:hover {
      cursor: pointer;
      background: var(--lighten);
    }
  }
}

.playback_controls {
  display: flex;
  justify-content: center;
  padding: 3px;

  button {
    cursor: pointer;
    background: var(--c-secondary);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

    &:hover {
      background: var(--lighten);
    }
  }

  .icon {
    width: 20px;
  }
}

.websocket-status {
  display: flex;
  justify-content: end;
  padding-right: 10px;
  align-items: center;
  gap: 10px;

  p {
    font-family: monospace;
    margin: 0;
  }

  .connection_status {
    display: flex;
    align-items: center;
    gap: 5px;

    div {
      width: 10px;
      height: 10px;
      border-radius: 100%;

      &#connected {
        background: green;
      }

      &#disconnected {
        background: red;
      }
    }
  }

  .collaborate {
    cursor: pointer;
    background: var(--c-secondary);
    border: none;
    outline: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      background: white;
    }

    img {
      filter: invert(100%);
    }
  }
}

.one-third {
  width: 33%;
}
</style>
