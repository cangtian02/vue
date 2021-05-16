/*
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2020-09-29 16:11:32
 * @Description: ...
 */
import Vue from "vue";
import router from "./router";
import { Component } from 'vue-property-decorator';
import App from "./App.vue";

Vue.config.productionTip = false;

// 注册路由钩子
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
