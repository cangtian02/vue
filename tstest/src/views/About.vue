<!--
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2020-09-29 16:11:07
 * @Description: ...
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="click">点击</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";

@Component
export default class About extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: () => void): void {
    console.log("beforeRouteEnter");
    next();
  }

  beforeRouteLeave(to: Route, from: Route, next: () => void): void {
    console.log("beforeRouteLeave");
    next();
  }

  created() {
    console.log(this.$route);
  }

  click() {
    this.$router.push("/");
  }
}
</script>
