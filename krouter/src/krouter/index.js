/*
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2020-07-14 16:04:30
 * @Description: 路由入口
 */ 

let Vue

class KRouter {

  static install(_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate() {
        // 在这个可以随意挂载参数到vue下，在业务层使用this.xxx就可以获取
        Vue.prototype.$kkb = '骚狗子'
        // 这里的router是在main.js挂在上去的，页面执行main.js时vue实例$options下就有会包含router
        if (this.$options.router) {
          // 挂载一个$krouter到全局Vue下，在业务层就可以使用this.$krouter来调用此类下的方法，如push
          Vue.prototype.$krouter = this.$options.router
          // 启动路由
          this.$options.router.init()
        }
      }
    })
  }

  // 类初始化
  constructor(options) {
    this.$options = options
    // 记录路由表
    this.routeMap = {}
    // 利用vue本身的双向绑定来切换当前路由
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }

  // 启动路由  插件use启动
  init() {
    // 处理路由表
    this.createRouteMap()
    // 初始化插件 router-view router-link
    this.initComponent()
    // 监听hashchange事件  生命周期  路由守卫
    this.bindEvents()
  }

  // 监听hash变化 初始化load
  bindEvents() {
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
    window.addEventListener('load', this.onHashChange.bind(this), false)
  }

  onHashChange(e) {
    // console.log(e)
    // 获取当前的hash值
    let hash = this.getHash()
    // 获取当前路由的配置对象
    let router = this.routeMap[hash]
    // 获取当前路由跳转的历史hash和当前要跳转的hash
    let { from, to } = this.getFrom(e)

    if (!this.routeMap[hash]) {
      console.error('哦吼，路由不对啊小老弟')
      return
    }

    // 如果配置有beforeEnter生命周期就执行 没有就直接跳转
    if (router.beforeEnter) {
      router.beforeEnter(from, to, () => {
        // 当要执行路由跳转的时候要判断下当前页面的hash是不是和要跳的是一样的
        if (hash === window.location.hash.slice(1)) {
          this.app.current = hash
        }
      })
    } else {
      this.app.current = hash
    }
  }

  getFrom(e) {
    // oldURL当前hash  newURL即将要跳转的hash
    let from, to
    if (e.newURL) {
      from = e.oldURL.split('#')[1]
      to = e.newURL.split('#')[1]
    } else {
      from = ''
      to = location.hash
    }
    return { from, to }
  }

  getHash() {
    return window.location.hash.slice(1) || '/'
  }

  createRouteMap() {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item
    })
  }

  initComponent() {
    // 注册router-view组件，用于业务层路由组件显示
    Vue.component('router-view', {
      render: h => {
        const component = this.routeMap[this.app.current].component
        return h(component)
      }
    })
    // 注册router-link组件，用于业务层点击跳转路由
    // 使用template会报compiler错误，template最终也会转成render执行，所以这里直接用render方法
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        return h('a', {
          attrs: {
            href: `#${this.to}`
          }
        },
        // 插槽 https://cn.vuejs.org/v2/api/#vm-slots
        [this.$slots.default]
        )
      },
      // template: '<a :href="to"><slot></slot></a>'
    })
  }

  // 用于业务层使用this.$krouter来跳转路由
  push(url) {
    if (this.routeMap[url]) {
      window.location.hash = url
    } else {
      console.error('怎么的，小老弟，瞎跳')
    }
  }

}
 
export default KRouter
