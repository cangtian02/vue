/*
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2020-07-14 15:16:30
 * @Description: ...
 */ 
import Vue from 'vue'
import Home from './views/Home.vue'
import KRouter from './krouter'

Vue.use(KRouter)

export default new KRouter({
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: (from, to, next) => {
        // next执行才跳转
        setTimeout(() => {
          next()
        }, 2000)
      },
    }, {
      path: '/about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
