<template>
  <div class="modulebar" :class="{expanded: expanded}">
    <button class="pulltab" @click="toggleExpansion"><p>{{"<"}}</p></button>
    <div class="modulebar-content">
      <aside>
        <div class="description">Modules</div>
        <div class="nodes">
          <div class="node vue-flow__node-oscillator" :draggable="true" @dragstart="onDragStart($event, 'oscillator')">Oscillator <img class="icon" src="@/assets/icons/icon_oscillator.png"></div>
          <div class="node vue-flow__node-filter" :draggable="true" @dragstart="onDragStart($event, 'filter')">Filter <img class="icon" src="@/assets/icons/icon_filter.png"></div>
          <div class="node vue-flow__node-mixer" :draggable="true" @dragstart="onDragStart($event, 'mixer')">Mixer <img class="icon" src="@/assets/icons/icon_mixer.png"></div>
          <div class="node vue-flow__node-envelope" :draggable="true" @dragstart="onDragStart($event, 'envelope')">Envelope <img class="icon" src="@/assets/icons/icon_envelope.png"></div>
          <div class="node vue-flow__node-vca" :draggable="true" @dragstart="onDragStart($event, 'vca')">VCA <img class="icon" src="@/assets/icons/icon_vca.png"></div>
          <div class="node vue-flow__node-sequencer" :draggable="true" @dragstart="onDragStart($event, 'sequencer')">Sequencer <img class="icon" src="@/assets/icons/icon_sequencer.png"></div>
          <div class="node vue-flow__node-clock" :draggable="true" @dragstart="onDragStart($event, 'clock')">Clock <img class="icon" src="@/assets/icons/icon_clock.png"></div>
          <div class="node vue-flow__node-midi" :draggable="true" @dragstart="onDragStart($event, 'midi')">Midi <img class="icon" src="@/assets/icons/icon_midi.png"></div>
          <div class="node vue-flow__node-comment" :draggable="true" @dragstart="onDragStart($event, 'comment')">Comment <img class="icon" src="@/assets/icons/icon_comment.png"></div>
        </div>
      </aside>
    </div>
  </div>
</template>


<script setup>
import useDragAndDrop from '@/mixins/useDnD'
const { onDragStart } = useDragAndDrop()
</script>

<script>

export default {
  name: 'ModuleBar',
  data(){
    return {
      expanded: true
    }
  },
  methods: {
    toggleExpansion(){
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss">
.modulebar {
  z-index: 10;
  position: absolute;
  width: 200px;
  right: -220px;
  transition: right 0.15s ease-in-out;
  top: 0;
  background: var(--c-five);
  font-family: monospace;
  padding: 10px;
  border-radius: 0 0 0 4px;

  &.expanded {
    right: 0;

    .pulltab p {
      transform: rotate(180deg);
    }
  }

  .pulltab {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: -40px;
    width: 40px;
    height: 40px;
    background: var(--c-five);
    border-radius: 0 0 0 4px;
    border: none;

    p {
      transition: all 0.15s ease-in-out;
      font-size: 1.2rem;
    }
  }
}

.description {
  margin-bottom: 20px;
}

aside .nodes {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: scroll;
}

aside .nodes .node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  text-align: left;
  padding: 10px;
  border: solid 1px black;
  border-radius: 5px;
  font-size: 0.8rem;

  .icon {
    width: 30px;
    padding: 0;
    margin: 0;
  }
}
</style>
