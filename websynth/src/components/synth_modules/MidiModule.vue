<template>
  <div class="synth_module">
    <div class="module_label">
      <div>
        <h3>Midi</h3>
        <p>{{ label }}</p>
      </div>
      <img class="icon" src="@/assets/icons/icon_midi.png">
    </div>
    <div class="controls">
      <div class="control_row" v-if="midiDevice">
        <span>Device: <br>{{midiDevice}}</span>
      </div>
      <div class="divider_row"></div>
      <div class="control_row" v-if="midiDevice">
        <span>{{midiData ? 'Data: ' +  midiData : "No Data Received yet"}}</span>
      </div>
      <div class="control_row" v-if="midiNote">
        <span>Note: {{midiNote}} {{node.data.frequency}}Hz</span>
      </div>
      <div class="divider_row"></div>
      <div class="control_row">
        <Handle type="source" class="custom_handle port_output" :position="Position.Bottom" /><span>output</span>
      </div>
    </div>
    <p v-if="!midiGranted" class="warning">Midi Access <br>not granted</p>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, reactive, ref, watch} from 'vue'
import {Handle, Position, useNode} from "@vue-flow/core";
import midiNoteConverter from '@/mixins/midiNoteConverter'
const emit = defineEmits(['nodesChange', 'moduleChanged'])
const {node} = useNode()

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

const noteConverter = new midiNoteConverter()

let midiGranted = ref(false)
let midiDevice = ref(null)
let midiData = ref(null)
let midiNote = ref(null)
//eslint-disable-next-line
let midiObj = null

onMounted(() => {
  node.data = reactive({
    ...node.data,
    frequency: null
  })

  watch(node.data, () => {
    emitChange();
  })

  navigator.permissions.query({ name: "midi", sysex: true }).then((result) => {
    if (result.state === "granted") {
      // Access granted.
      midiGranted.value = true
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
      return 0
    } else if (result.state === "prompt") {
      // Using API will prompt for permission
      return 0
    }
    // Permission was denied by user prompt or permission policy
    midiGranted.value = false
  });
})

let onMIDISuccess = (midiAccess) => {
  console.log("MIDI ready!");
  midiObj = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
  listInputsAndOutputs(midiObj)
  startLoggingMIDIInput(midiObj)
}

let onMIDIFailure = (msg) => {
  console.error(`Failed to get MIDI access - ${msg}`);
}

let startLoggingMIDIInput = (midiAccess) => {
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
}

let onMIDIMessage = (event) => {
  //ignore clock and "active sensing" midi values, also do only update the current value if something changed
  if(midiData.value != event.data && event.data[0] !== 248 && event.data[0] !== 254){
    midiData.value = event.data
    let convertedValue = noteConverter.convert(event.data[1])
    midiNote.value = convertedValue.note
    node.data.frequency = convertedValue.frequency
  }
}

let listInputsAndOutputs = (midiAccess) => {
  for (const entry of midiAccess.inputs) {
    const input = entry[1];
    if(input.type === "input") midiDevice.value = input.name

    console.log(
        `Input port [type:'${input.type}']` +
        ` id:'${input.id}'` +
        ` manufacturer:'${input.manufacturer}'` +
        ` name:'${input.name}'` +
        ` version:'${input.version}'`,
    );
  }

  for (const entry of midiAccess.outputs) {
    const output = entry[1];
    console.log(
        `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`,
    );
  }
}

let emitChange = () => {
  emit('moduleChanged', [{id: props.id, data: node.data}])
}
</script>
<script>
export default {
  data(){
    return {
      frequency: null,
      waveform: "sine"
    }
  }
}
</script>
<style scoped>
.controls {
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0;
  padding: 0;
}

p {
  margin: 0;
  padding: 0;
  color: var(--c-semitransparent);
  font-size: 0.6rem;
}

.warning {
  margin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0, 0.8) !important;
  text-align: center;
  border-radius: 5px;
  font-size: 0.8rem;
}

input[type=text] {
  width: 80px;
}
</style>
