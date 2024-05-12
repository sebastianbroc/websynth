<template>
  <div class="main">
    <NavBar></NavBar>
    <button @click="playTone(500)">Ton</button>
    <WorkSpace></WorkSpace>
  </div>
</template>

<script>
import WorkSpace from "@/components/WorkSpace.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'HomeView',
  components: {
    WorkSpace,
    NavBar
  },
  data() {
    return {
      audioContext: null,
      mainVolume: null,
      oscList: []
    }
  },
  mounted(){
    this.initAudio();
  },
  methods: {
    initAudio(){
      this.audioContext = new AudioContext();
      this.mainVolume = this.audioContext.createGain();
      this.mainVolume.connect(this.audioContext.destination);
      this.mainVolume.gain.value = 1.0;
    },
    playTone(freq){
      const osc = this.audioContext.createOscillator();
      osc.connect(this.mainVolume);
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.start();
      return osc;
    }
  }
}
</script>
<style>
  .main {
    width: 100vw;
    height: 100vh;
  }
</style>
