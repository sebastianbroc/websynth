<template>
  <div class="synth_module">
    <Handle type="target" :position="Position.Left" />
    <div class="module_label">{{ props.label }}</div>
    {{ nodesData && nodesData.data.frequency ? nodesData.data.frequency: null }}
  </div>
</template>

<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'
import {defineProps} from "vue";
const props = defineProps(['id', 'label'])

const connections = useHandleConnections({
  type: 'target',
})

const nodesData = useNodesData(() => connections.value[0]?.source)
</script>
