import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../pages/Home.vue'
import Detail from '../pages/Detail.vue'

export function createRouter () {
  return new Router({
    mode: 'history', // SSR必须使用history模式
    scrollBehavior: () => ({y: 0}),
    routes: [
      {path: '/', component: Home},
      {path: '/home', component: Home},
      {path: '/detail', component: Detail},
    ]
  })
}
