<template>
  <div class="synth_module">
    <div class="controls">
      <img class="icon" src="@/assets/icons/icon_comment.png">
      <div class="control_row">
        <textarea v-model="node.data.comment" @load='this.style.height = "";this.style.height = this.scrollHeight + "px"' oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' placeholder="Your Comment here..."></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, inject, onMounted, reactive, watch} from 'vue'
import {useNode} from "@vue-flow/core";
const emit = defineEmits(['moduleChanged'])
const eventBus = inject("eventBus")
const {node} = useNode()

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])


onMounted(() => {
  mount()
})

let mount = () => {
  node.data = reactive({
    ...node.data,
    comment: node.data.comment ?? ""
  })

  watch(node.data, () => {
    emitChange();
  })
}

eventBus.on('remountModules', () => {
  mount()
})

let emitChange = () => {
  emit('moduleChanged', [{id: props.id, data: node.data}])
}

</script>
<style scoped>
.controls {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: start;

  img {
    width: 30px;
  }
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

input[type=text] {
  width: 80px;
}

textarea {
  background: transparent;
  resize: none;
  border: none;
}
</style>
