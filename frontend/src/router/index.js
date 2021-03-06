import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//config of the endpoint to the vue router
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/scores',
    name: 'Score',
    component: () => import(/* webpackChunkName: "score" */ '../views/Score.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
