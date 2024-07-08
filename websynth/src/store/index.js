import { createStore } from 'vuex'

export default createStore({
  state: {
    playbackHalted: false
  },
  getters: {
  },
  mutations: {
    changePlaybackState(state, p){
      state.playbackHalted = p
    }
  },
  actions: {
  },
  modules: {
  }
})
