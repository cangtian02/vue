<!--
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2020-09-29 14:41:14
 * @Description: ...
-->
<template>
  <div class="testCom">
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TestCom extends Vue {
  @Prop({ default: "testCom title" }) private title!: string;
}
</script>
