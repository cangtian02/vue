<!--
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2021-05-26 18:21:23
 * @Description: ...
-->
<template>
  <div id="app">
    <ListDrop :list="list" />
  </div>
</template>

<script>
import ListDrop from './components/ListDrop.vue'

export default {
  name: 'App',
  components: {
    ListDrop
  },
  data() {
    return {
      list: [0, 1, 2, 3, 4, 5]
    }
  },
  created() {
    
  },
  methods: {

  },
}
</script>

<style>

</style>
