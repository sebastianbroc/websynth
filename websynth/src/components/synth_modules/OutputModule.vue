<template>
  <div class="synth_module">
    <Handle type="target" :position="Position.Left" />
    {{ nodesData.data.frequency ? nodesData.data.frequency: null }}
  </div>
</template>

<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

const connections = useHandleConnections({
  type: 'target',
})

const nodesData = useNodesData(() => connections.value[0]?.source)
</script>
