<template>
  <div class="navbar">
    <div class="navbar-content one-third">
      <a><b>websynth</b> //</a>
      <div class="category" @click="e => {e.target.classList.toggle('active');}">
        <a>home</a>
      </div>
      <div class="category" @click="e => {e.target.classList.toggle('active');}">
        <a>files</a>
      </div>
      <div class="category" @click="e => {e.target.classList.toggle('active');}">
        <a>view</a>
      </div>
      <div class="category" @click="e => {e.target.classList.toggle('active');}">
        <a>options</a>
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
    <div class="one-third"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  inject: ["eventBus"],
  data() {
    return {
      playing: false
    }
  },
  methods: {
    emitEvent(param){
      this.eventBus.emit("navBar-click", param)
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
      background: var(--lighten);
      padding: 10px;
      z-index: 1000;

      button {
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

.one-third {
  width: 33%;
}
</style>
