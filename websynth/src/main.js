import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import mitt from 'mitt'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const eventBus = mitt();

createApp(App).use(store).use(router).provide('eventBus', eventBus).use(PrimeVue, {unstyled: true}).mount('#app')
