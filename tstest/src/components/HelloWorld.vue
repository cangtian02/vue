<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <h4>{{ num }}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TestObj } from "../types/testType";

@Component
export default class HelloWorld extends Vue {
  @Prop({ default: "111" }) private msg!: string;

  private testString?: string = "testString";
  private obj: TestObj = {
    name: "string name",
    title: "string title",
    num: 1
  };

  public created() {
    console.log(this.testString);
    console.log(this.obj.name);
  }

  // computed 计算
  public get num() {
    return this.obj.num + 1;
  }

  public testFunction() {
    console.log("testFunction");
  }
}
</script>
