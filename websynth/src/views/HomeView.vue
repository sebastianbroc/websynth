<template>
  <div class="main">
    <NavBar></NavBar>
    <!--<button @click="playTone(500)">Ton</button>-->
    <!--<p id="oscList">{{elements}}</p>-->
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
            if(module.data.frequency) this.handleOscillator(module.id, module.data.frequency, module.data.waveform)
        }
      })
    },
    initAudio(){
      this.audioContext = new AudioContext();
      this.mainVolume = this.audioContext.createGain();
      this.mainVolume.connect(this.audioContext.destination);
      this.mainVolume.gain.value = 1.0;
    },
    getModuleChild(id){
      return this.elements.find(m => m.type == "default" && m.sourceNode.id === id)
    },
    handleOscillator(id, freq, waveform){
      let presentOscFound = false
      this.oscList.forEach(osc => {
        if(osc.id === id){
          osc.module.frequency.value = freq
          osc.module.type = waveform
          presentOscFound = true
          if (this.getModuleChild(id) && this.getModuleChild(id).targetNode.type === "output"){
            console.log("connected to main output")
            osc.module.connect(this.mainVolume)
            osc.connected = true
          } else if (osc.connected) {
            try {
              osc.module.disconnect(this.mainVolume)
              osc.connected = false
            } catch(e){
              //disconnection failed, do nothing as it is probably because it is already disconnected
              osc.connected = false
            }
          }
        }
      })

      if(!presentOscFound){
        const newOsc = this.audioContext.createOscillator();
        if (this.getModuleChild(id) && this.getModuleChild(id).targetNode.type === "output"){
          console.log("added to osc list and connected to main output")
          newOsc.connect(this.mainVolume);
        }
        newOsc.type = waveform;
        newOsc.frequency.value = freq;
        newOsc.start();
        this.oscList.push({"id": id, module: newOsc, connected: true})
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
    font-size: 0.6rem;
  }
</style>
