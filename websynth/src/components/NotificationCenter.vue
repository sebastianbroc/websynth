<template>
  <div class="notifications">
    <div v-for="notification in store().state.notifications" :key="notification" class="notification">
      <h2>User <b>{{notification.username}}</b> wants to join your session.</h2>
      <div class="buttons">
        <button @click="handleInvite(true, notification.userid)">accept</button>
        <button @click="handleInvite(false, notification.userid)">decline</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: 'NotificationCenter',
  inject: ["eventBus"],
  methods: {
    store() {
      return store
    },
    handleInvite(accept, id){
      this.eventBus.emit("handleInvite", {accept: accept, userid: id})
    }
  }
}
</script>

<style lang="scss">
.notifications {
  position: absolute;
  top: 0;
  padding-top: 20px;
  padding-left: 10px;
  z-index: 1010;

  .notification {
    background: var(--c-secondary);
    padding: 10px;
    border-radius: 5px;

    h2 {
      font-size: 1rem;
      font-weight: normal;
      margin: 0 0 10px 0;
    }

    .buttons {
      display: flex;
      justify-content: end;
      gap: 5px;

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
    }
  }
}
</style>
