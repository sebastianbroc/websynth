import { createStore } from 'vuex'

export default createStore({
  state: {
    playbackHalted: false,
    modalOpened: false
  },
  getters: {
  },
  mutations: {
    changePlaybackState(state, p){
      state.playbackHalted = p
    },
    changeModalOpened(state, p) {
      state.modalOpened = p
    }
  },
  actions: {
  },
  modules: {
  }
})
