<template>
  <div class="main">
    <NavBar></NavBar>
    <p id="audioNodeList">{{audioNodeList}}</p>
    <WorkSpace @updateElements="updateElements"></WorkSpace>
  </div>
</template>

<script>
import WorkSpace from "@/components/WorkSpace.vue";
import NavBar from "@/components/NavBar.vue";
import EnvelopeGenerator from '@/mixins/envelopeGenerator'

export default {
  name: 'HomeView',
  inject: ["eventBus"],
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
    this.resetConnectionStatus();

    this.eventBus.on("navBar-click", (param) => {
      if(param === "start playback"){
        this.mainVolume.connect(this.audioContext.destination)
        this.resetConnectionStatus()
        this.eventBus.emit("getModules", "getModules")
      } else if (param === "pause playback"){
        this.mainVolume.disconnect();
      }
    })
  },
  methods: {
    initAudio(){
      this.audioContext = new AudioContext();
      this.mainVolume = this.audioContext.createGain();
      this.mainVolume.gain.value = 1.0;
      console.log("initialized audio")
    },
    resetConnectionStatus(){
      this.audioNodeList.forEach(node => {
        node.connected = false
      })
    },
    updateElements(value){
      console.log("updating elements")
      this.elements = value

      this.elements.forEach(module => {
        this.handleNodeList(module)
        this.buildConnection(module)
      })
      this.handleOrphans()
    },
    getModuleChild(id){
      //m.type == "default" is used to search in edges (connections between modules) which are part of the elements array
      return this.elements.find(m => m.type == "default" && m.sourceNode.id === id)
    },
    handleOrphans(){
      this.audioNodeList.forEach((audioNode, index) => {
          let match = this.elements.find(e => e.id === audioNode.id)
          if(!match){
            if(Array.isArray(audioNode.module)) {
              audioNode.module[0].disconnect()
            } else {
              audioNode.module.disconnect()
            }

            this.audioNodeList.splice(index, 1)
          }
      })
    },
    buildConnection(source){
      let target = this.getModuleChild(source.id)
      if(target){
        let audioNode = this.audioNodeList.find(n => n.id === source.id)
        let targetAudioNode = this.audioNodeList.find(n => n.id === target.target)

        if (target && !audioNode.connected){
          switch(target.targetNode.type){
            case 'output':
              if(Array.isArray(audioNode.module)) {
                audioNode.module[0].connect(this.mainVolume)
              } else {
                audioNode.module.connect(this.mainVolume)
              }
              break;
            case 'mixer':
              audioNode.module.connect(targetAudioNode.module[parseInt(target.targetHandle)])
              break;
            default:
              if(target.targetHandle){
                console.log("connecting to custom target")
                console.log(target.targetHandle)
                if(target.targetHandle === "main"){
                  audioNode.module.connect(targetAudioNode.module)
                } else if(Array.isArray(audioNode.module)) {
                  audioNode.module[0].connect(targetAudioNode.module)
                } else {
                  audioNode.module.connect(targetAudioNode.module[target.targetHandle])
                }
              }
              break;
          }

          audioNode.connected = true
          try{ //in case it is an oscillator, we have to start it *after* connecting to the main Volume
            audioNode.module.start()
          } catch(e){
            //do nothing
          }
        }
      } else {
        this.handleDisconnection(source)
      }
    },
    handleNodeList(module){
      if(module.type !== "output" && module.type !== "default"){
        let Node = this.audioNodeList.find(n => n.id === module.id);
        let isNewNode = !Node
        let createdNewNode = false
        if(Node) Node = Node.module

        switch(module.type){
          case 'envelope':
            if(isNewNode){
              Node = new EnvelopeGenerator(this.audioContext, (module.data.attack / 100), (module.data.decay / 100), (module.data.sustain / 100), (module.data.release / 100))
              console.log(Node)
              createdNewNode = true
            } else {
              Node.updateData((module.data.attack / 100), (module.data.decay / 100), (module.data.sustain / 100), (module.data.release / 100))
            }

            if(module.data.triggered){
              console.log("trying to trigger...")
              Node.trigger()
            }
            break;
          case 'vca':
            if(isNewNode){
              Node = this.audioContext.createGain()
              Node.gain.setValueAtTime(1, this.audioContext.currentTime)
              createdNewNode = true
            }
            break;
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
                try{
                  Node[i + 1].gain.setValueAtTime(module.data.volumes[i], this.audioContext.currentTime)
                } catch(e){
                  //do nothing
                }
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
              createdNewNode = true
            }
            break;
        }
        if(isNewNode && createdNewNode) this.audioNodeList.push({"id": module.id, module: Node, connected: false})
      }
    },
    handleDisconnection(source){
      try {
        let audioNode = this.audioNodeList.find(n => n.id === source.id)
        audioNode.connected = false
        if(Array.isArray(audioNode.module)){
          audioNode.module[0].disconnect()
        } else {
          audioNode.module.disconnect()
        }
      } catch(e){
        //do nothing
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
