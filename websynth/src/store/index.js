import { createStore } from 'vuex'

export default createStore({
  state: {
    playbackHalted: false,
    modalOpened: false,
    websocketConnected: false,
    sessionID: null,
    error: null
  },
  getters: {
  },
  mutations: {
    changePlaybackState(state, p){
      state.playbackHalted = p
    },
    changeModalOpened(state, p) {
      state.modalOpened = p
    },
    changeWebsocketConnected(state, p) {
      state.websocketConnected = p
    },
    changeSessionID(state, p) {
      state.sessionID = p
    },
    changeError(state, p) {
      state.error = p
    }
  },
  actions: {
  },
  modules: {
  }
})
