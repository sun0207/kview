import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/icon',
    name: 'Icon',
    component: () => import(/* webpackChunkName: "icon" */ '../views/Icon.vue')
  },
  {
    path: '/input',
    name: 'Input',
    component: () => import(/* webpackChunkName: "input" */ '../views/Input.vue')
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import(/* webpackChunkName: "button" */ '../views/Button.vue')
  },
  {
    path: '/slider',
    name: 'Slider',
    component: () => import(/* webpackChunkName: "slider" */ '../views/Slider.vue')
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import(/* webpackChunkName: "process" */ '../views/Progress.vue')
  },
  {
    path: '/circle',
    name: 'Circle',
    component: () => import(/* webpackChunkName: "circle" */ '../views/Circle.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
