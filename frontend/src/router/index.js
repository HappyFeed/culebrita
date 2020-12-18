import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
  {
    path: '/save',
    name: 'Save',
    component: () => import(/* webpackChunkName: "save" */ '../views/Save.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
