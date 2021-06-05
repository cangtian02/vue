import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/view/Home'
import Popup from '@/view/Popup'
import Calendar from '@/view/Calendar'
import ItemSlide from '@/view/ItemSlide'
import Scroll from '@/view/Scroll'
import Slide from '@/view/Slide'
import Keyboard from '@/view/Keyboard'

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/popup',
			name: 'popup',
			component: Popup
		},
		{
			path: '/calendar',
			name: 'calendar',
			component: Calendar
		},
		{
			path: '/itemSlide',
			name: 'itemSlide',
			component: ItemSlide
		},
		{
			path: '/scroll',
			name: 'scroll',
			component: Scroll
		},
		{
			path: '/slide',
			name: 'slide',
			component: Slide
		},
		{
			path: '/keyboard',
			name: 'keyboard',
			component: Keyboard
		},
	]
})
