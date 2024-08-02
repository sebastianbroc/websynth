<template>
  <div v-if="id !== store.state.userID">
    <!--<img src="@/assets/cursor.svg" alt="user cursor" :style="{color: node.data.color}">-->
    <svg width="407" height="401" viewBox="0 0 407 401" fill="none" xmlns="http://www.w3.org/2000/svg" :style="{color: node.data.color}">
      <path d="M2.292 20.9095C-3.26493 9.05044 9.05043 -3.26497 20.9095 2.29196L398.528 179.236C413.469 186.237 406.112 208.805 389.915 205.656L176.675 164.194C166.848 162.284 158.25 171.004 160.299 180.803L202.671 383.435C206.072 399.7 183.341 407.288 176.29 392.241L2.292 20.9095Z" fill="currentColor"/>
    </svg>
    <p>{{node.data.username}}</p>
  </div>
</template>

<script setup>
import {defineProps, onMounted} from 'vue'
import {useNode} from "@vue-flow/core";
import {useStore} from "vuex";
const {node} = useNode()
const store = useStore()

// props were passed from the slot using `v-bind="customNodeProps"`
//eslint-disable-next-line
const props = defineProps(['id', 'label'])

onMounted(() => {
})
</script>

<style scoped>
 svg {
   width: 40px;
   height: 40px;
 }

 p {
   position: absolute;
   top: 20%;
   left: 60%;
   font-size: 0.8rem;
   text-align: center;
   background: var(--c-primary);
   font-family: monospace;
   padding: 10px;
   border-radius: 2px;
 }
</style>
