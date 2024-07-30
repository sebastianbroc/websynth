<template>
  <div class="main">
    <NavBar></NavBar>
    <p id="audioNodeList">{{audioNodeList}}</p>
    <WorkSpace @updateElements="updateElements" @elementChanges="handleChanges"></WorkSpace>
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
        this.$store.commit('changePlaybackState', true)
        this.mainVolume.connect(this.audioContext.destination)
        this.resetConnectionStatus()
        this.eventBus.emit("getModules", "getModules")
      } else if (param === "pause playback"){
        this.$store.commit('changePlaybackState', false)
        this.mainVolume.disconnect();
      }
    })

    this.eventBus.on("triggerModule", (moduleId) => {
      this.triggerModule(moduleId)
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
    handleChanges(input){
      if(input){
        this.handleNodeList(input)

        this.elements.filter(e => e.type !== "default" && e.type !== "output").forEach(module => {
          this.buildConnection(module)
        })
      }
    },
    triggerModule(id){
      let module = this.elements.find(m => m.id === id)

      switch(module.type){
        case 'envelope':
          try{
            this.audioNodeList.find(n => n.id === module.id).module.trigger();
          } catch {
            //the module has likely not been created yet
          }
          break;
      }
    },
    updateElements(value){
      this.elements = value
      this.elements.filter(e => e.type !== "default" && e.type !== "output").forEach(module => {
        this.buildConnection(module)
      })
      this.handleOrphans()
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

        try{
          if (audioNode && target && !audioNode.connected){

            let sourceModule = Array.isArray(audioNode.module) ? audioNode.module[0] : audioNode.module.module ?? audioNode.module

            switch(target.targetNode.type){
              case 'output':
                if(Array.isArray(audioNode.module)) {
                  audioNode.module[0].connect(this.mainVolume)
                } else {
                  sourceModule.connect(this.mainVolume)
                }
                break;
              case 'mixer':
                sourceModule.connect(targetAudioNode.module[parseInt(target.targetHandle)])
                break;
              default:
                if(target.targetHandle && targetAudioNode){
                  if(target.targetHandle === "main"){
                    sourceModule.connect(targetAudioNode.module)
                  } else {
                    if(target.targetHandle.includes("prop")){
                      console.log("connecting to " + target.targetHandle.substring(5))

                      if(source.handleBounds.source[0].id.includes("out") && source.handleBounds.source[0].id.substring(4) === "audio"){
                        sourceModule.connect(targetAudioNode.cvControls[target.targetHandle.substring(5)])
                      } else {
                        sourceModule.connect(targetAudioNode.module[target.targetHandle.substring(5)])
                      }
                      try{
                        sourceModule.start();
                      } catch {
                        //do nothing
                      }
                    } else {
                      sourceModule.connect(targetAudioNode.module[target.targetHandle])
                    }
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
        } catch(e) {
          console.error(e)
          //do nothing
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
        let cvControls = {}
        if(Node) cvControls = Node.cvControls ?? {}
        if(Node) Node = Node.module

        switch(module.type){
          case 'midi':
            if(isNewNode){
              Node = {module: new ConstantSourceNode(this.audioContext, {
                  offset: 0
                })}
            } else {
              Node.module.offset.value = module.data.frequency
            }
            if(isNewNode) createdNewNode = true
            break;
          case 'sequencer':
                if(isNewNode){
                  Node = {steps: [0], currentStep: 0, module: new ConstantSourceNode(this.audioContext, {
                      offset: 0
                    })}
                } else {
                  Node.steps = module.data.steps
                  Node.currentStep = module.data.currentStep
                  Node.module.offset.value = module.data.steps[module.data.currentStep]
                }

              if(isNewNode) createdNewNode = true
            break;
          case 'envelope':
            if(isNewNode){
              Node = new EnvelopeGenerator(this.audioContext, (module.data.attack / 100), (module.data.decay / 100), (module.data.sustain / 100), (module.data.release / 100), module.data.intensity)
              createdNewNode = true
            } else {
              Node.updateData((module.data.attack / 100), (module.data.decay / 100), (module.data.sustain / 100), (module.data.release / 100), module.data.intensity)
            }
            break;
          case 'vca':
            if(isNewNode){
              Node = this.audioContext.createGain()
              Node.gain.setValueAtTime(0, this.audioContext.currentTime)
              createdNewNode = true
            }
            break;
          case 'mixer':
            if(module.data && module.data.channels){
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
              if(isNewNode) {
                Node = this.audioContext.createBiquadFilter()
                cvControls = this.buildCVControls(Node, ["frequency"])
              }
              Node.frequency.setValueAtTime(module.data.frequency, this.audioContext.currentTime + 0.01)
              Node.type = module.data.type
              cvControls.frequency.gain.setValueAtTime(module.data.cv_in_level, this.audioContext.currentTime + 0.01)
              createdNewNode = true
            }
            break;
          case 'oscillator':
            if(isNewNode){
              Node = this.audioContext.createOscillator()
              cvControls = this.buildCVControls(Node, ["frequency", "detune"])
              //cvControls = {"frequency": this.audioContext.createGain()}
              //cvControls.frequency.connect(Node.frequency)
            }
            if(module.data.frequency && Node.frequency){
              Node.frequency.value = module.data.frequency
              Node.type = module.data.waveform
              cvControls.frequency.gain.setValueAtTime(module.data.cv_in_level, this.audioContext.currentTime)
              createdNewNode = true
            }
            break;
        }
        if(isNewNode && createdNewNode) this.audioNodeList.push({"id": module.id, module: Node, connected: false, cvControls: cvControls})
      }
    },
    buildCVControls(node, controls){
      //build an array of gain nodes which are connected to the audio module's properties to control intensity of cv signals
      let out = {}
      controls.forEach(ctrl => {
        out[ctrl] = this.audioContext.createGain()
        out[ctrl].gain.setValueAtTime(1, this.audioContext.currentTime)
        out[ctrl].connect(node[ctrl])
      })
      return out
    },
    handleDisconnection(source){
      try {
        let audioNode = this.audioNodeList.find(n => n.id === source.id)

        if(audioNode){
          audioNode.connected = false
          if(Array.isArray(audioNode.module)){
            audioNode.module[0].disconnect()
          } else if (audioNode.module.module) {
            audioNode.module.module.disconnect()
          } else {
            audioNode.module.disconnect()
          }
        }
      } catch(e){
        //do nothing
      }
    },
    handleOrphans(){
      this.audioNodeList.forEach((audioNode, index) => {
        let match = this.elements.find(e => e.id === audioNode.id)
        if(!match){
          try{
            if(Array.isArray(audioNode.module)) {
              audioNode.module[0].disconnect()
            } else {
              audioNode.module.disconnect()
            }
          } catch {
            //do nothing
          }

          this.audioNodeList.splice(index, 1)
        }
      })
    },
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
