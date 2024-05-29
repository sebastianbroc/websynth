<template>
  <div class="main">
    <NavBar></NavBar>
    <!--<button @click="playTone(500)">Ton</button>-->
    <p id="oscList">{{elements}}</p>
    <WorkSpace @updateElements="updateElements"></WorkSpace>
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
      elements: null,
      oscList: []
    }
  },
  mounted(){
    this.initAudio();
  },
  methods: {
    updateElements(value){
      console.log("updated elements")
      this.elements = value

      this.elements.forEach(module => {
        switch(module.type){
          case 'oscillator':
            if(module.data.frequency) this.handleOscillator(module.id, module.data.frequency)
        }
      })
    },
    initAudio(){
      this.audioContext = new AudioContext();
      this.mainVolume = this.audioContext.createGain();
      this.mainVolume.connect(this.audioContext.destination);
      this.mainVolume.gain.value = 1.0;
    },
    playTone(id, freq){
      const osc = this.audioContext.createOscillator();
      osc.connect(this.mainVolume);
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.start();
      return osc;
    },
    handleOscillator(id, freq){
      let presentOscFound = false
      this.oscList.forEach(osc => {
        if(osc.id === id){
          osc.module.frequency.value = freq
          presentOscFound = true
        }
      })

      if(!presentOscFound){
        const newOsc = this.audioContext.createOscillator();
        newOsc.connect(this.mainVolume);
        newOsc.type = "sine";
        newOsc.frequency.value = freq;
        newOsc.start();
        this.oscList.push({"id": id, module: newOsc})
        console.log(this.oscList)
      }
    }
  }
}
</script>
<style>
  .main {
    width: 100vw;
    height: 100vh;
  }

  #oscList {
    position: absolute;
    z-index: -10;
    color: rgba(0,0,0,0.2);
    font-family: monospace;
    font-size: 2rem;
    display: none;
  }
</style>
