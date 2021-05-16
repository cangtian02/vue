<!--
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2020-07-14 16:00:10
 * @Description: ...
--> 
<template>
  <div id="app">
    {{$kkb}}
    <br /><br />
    <button @click="about">about</button><br /><br />
    <router-link to="/">Home</router-link><br /><br />
    <router-link to="/about">About</router-link>
    <br /><br /><br /><br /><hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    about() {
      this.$krouter.push('/about')
    }
  }
}
</script>

<style>

</style>
