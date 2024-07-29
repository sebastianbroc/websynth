import { createStore } from 'vuex'

export default createStore({
  state: {
    playbackHalted: false,
    modalOpened: false,
    websocketConnected: false,
    sessionID: null,
    error: null,
    info: null,
    notifications: [],
    inputType: "knob"
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
    },
    changeInfo(state, p) {
      state.info = p
    },
    changeNotifications(state, p){
      state.notifications = p
    },
    toggleInputType(state){
      state.inputType = state.inputType === "knob" ? "text" : "knob"
    }
  },
  actions: {
  },
  modules: {
  }
})
