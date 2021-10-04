import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import InsightSatelite from '../views/InsightSatelite.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/InsightSatelite',
    name: 'InsightSatelite',
    component: InsightSatelite
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
