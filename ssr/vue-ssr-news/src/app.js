import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './route/index'
import { createStore } from './store/index'
import { sync } from 'vuex-router-sync'

const router = createRouter()
const store = createStore()

// 将路由状态添加到vuex中
sync(store, router)

const app = new Vue({
	router,
	store,
	render: h => h(App)
})

export { app, router, store }
