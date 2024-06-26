<template>
  <div class="navbar">
    <div class="navbar-content">
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
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  inject: ["eventBus"],
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
</style>
