<template>
  <div class="main">
    <NavBar></NavBar>
    <!--<button @click="playTone(500)">Ton</button>-->
    <!--<p id="audioNodeList">{{elements}}</p>-->
    <p id="audioNodeList">{{audioNodeList}}</p>
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
      audioNodeList: []
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
    updateElements(value){
      this.elements = value

      this.elements.forEach(module => {
        this.handleNodeList(module)
        this.buildConnection(module)


        /*switch(module.type){
          case 'oscillator':
            if(module.data.frequency) this.handleOscillator(module.id, module.data.frequency, module.data.waveform)
            break;
          case 'filter':
            this.buildConnection(module)
        }*/
      })
    },
    getModuleChild(id){
      //m.type == "default" is used to search in edges (connections between modules) which are part of the elements array
      return this.elements.find(m => m.type == "default" && m.sourceNode.id === id)
    },
    buildConnection(source){
      let target = this.getModuleChild(source.id)
      if(target){
        let audioNode = this.audioNodeList.find(n => n.id === source.id)
        let targetAudioNode = this.audioNodeList.find(n => n.id === target.target)


        if (target && !audioNode.connected){
          if(target.targetNode.type === "output"){
            if(Array.isArray(audioNode.module)) {
              audioNode.module[0].connect(this.mainVolume)
            } else {
              audioNode.module.connect(this.mainVolume)
            }
            console.log("connected to main volume")
          } else if (target.targetNode.type === "mixer"){
            audioNode.module.connect(targetAudioNode.module[parseInt(parseInt(target.targetHandle) + 1)])
          } else {
            if(Array.isArray(audioNode.module)) {
              audioNode.module[0].connect(targetAudioNode.module)
            } else {
              audioNode.module.connect(targetAudioNode.module)
            }
          }
          audioNode.connected = true

          try{ //in case it is an oscillator, we have to start it *after* connecting to the main Volume
            audioNode.module.start()
          } catch(e){
            //do nothing
          }
        }
      } else {
        try {
          let audioNode = this.audioNodeList.find(n => n.id === source.id)
          audioNode.connected = false
          audioNode.module.disconnect()
        }catch(e){
          //do nothing
        }
      }
    },
    handleNodeList(module){
      if(module.type !== "output" && module.type !== "default"){
        let Node = this.audioNodeList.find(n => n.id === module.id);
        let isNewNode = !Node
        let createdNewNode = false
        if(Node) Node = Node.module

        switch(module.type){
          case 'mixer':
            if(module.data){
              if(isNewNode){
                //the gain node at position 0 is our main out of the mixer
                let gainNodes = [this.audioContext.createGain()]
                gainNodes[0].gain.setValueAtTime(1, this.audioContext.currentTime)
                for(let i = 0; i < module.data.channels ; i++){
                  let newGainNode = this.audioContext.createGain()
                  newGainNode.connect(gainNodes[0])
                  gainNodes.push(newGainNode)
                }
                Node = gainNodes
              }
              for(let i = 0; i < module.data.channels ; i++){
                Node[i + 1].gain.setValueAtTime(module.data.volumes[i], this.audioContext.currentTime)
              }
              createdNewNode = true
            }
            break;
          case 'filter':
            if(module.data && module.data.frequency){
              if(isNewNode) Node = this.audioContext.createBiquadFilter()
              Node.frequency.setValueAtTime(module.data.frequency, this.audioContext.currentTime + 0.01)
              Node.type = module.data.type
              createdNewNode = true
            }
            break;
          case 'oscillator':
            if(isNewNode){
              Node = this.audioContext.createOscillator()
            }
            if(module.data.frequency){
              Node.frequency.value = module.data.frequency
              Node.type = module.data.waveform
              if (isNewNode){
                Node.start()
                console.log("started oscillator")
              }
              createdNewNode = true
            }
            break;
        }
        if(isNewNode && createdNewNode) this.audioNodeList.push({"id": module.id, module: Node, connected: false})
      }
    },
    handleOscillator(id, freq, waveform){
      let presentOscFound = false
      this.audioNodeList.forEach(osc => {
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
              //disconnection failed, do nothing as it is likely because it is already disconnected
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
        this.audioNodeList.push({"id": id, module: newOsc, connected: true})
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

  #audioNodeList {
    position: absolute;
    z-index: -10;
    color: rgba(0,0,0,0.2);
    font-family: monospace;
    font-size: 0.6rem;
  }
</style>
