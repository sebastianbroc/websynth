import { createRouter, createWebHashHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
