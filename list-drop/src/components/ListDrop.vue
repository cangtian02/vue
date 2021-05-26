<!--
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2021-05-26 11:05:02
 * @Description: ...
-->
<template>
  <div class="listDrop" ref="listDrop">
    <li v-for="(item, idx) in list" :key="idx">
      <div class="listDrop_box" :style="listStyle[idx]">
        <div class="listDrop_move">
          <i 
            @mousedown="(e) => mousedown(e, idx)"
            @mousemove="(e) => mousemove(e, idx)" 
            @mouseup="(e) => mouseup(e, idx)"
          ></i>
        </div>
        <div class="listDrop_content">噼里啪啦-----{{idx}}</div>
      </div>
    </li>
  </div>
</template>

<script>
const hiddenStyle = 'opacity: 0;visibility: hidden;'
const transformStyle = 'transform: translate3d(0,0,0);transition: all .3s ease;'
let isDown = false
let isCopy = false
let copyIndex = 0
let clientY = 0
let boxName = 'listDrop_box'
let boxDom = null

export default {
  name: 'ListDrop',
  props: {
    list: Array
  },
  data() {
    return {
      listStyle: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let listStyle = new Array(this.list.length)
      this.listStyle = listStyle
    },
    mousedown(e, idx) {
      isDown = true
      copyIndex = idx
      clientY = e.clientY
    },
    mousemove(e, idx) {
      if (!isDown) return

      boxDom = this.$refs.listDrop.children[idx].children[0].cloneNode(true)
      boxDom.id = boxName

      if (!isCopy) {
        isCopy = true
        document.body.append(boxDom)
        this.initListStyle(e, idx)
      }
      
      this.moveBox(e)
    },
    mouseup(e, idx) {
      if (!isDown) return
      // console.log('mouseout', e, idx)
      isDown = false
      if (isCopy) {
        document.body.removeChild(document.getElementById(boxName))
        isCopy = false
      }
    },
    initListStyle(e, idx) {
      let listStyle = JSON.parse(JSON.stringify(this.listStyle))
      listStyle[idx] = hiddenStyle
      this.listStyle = listStyle
    },
    moveBox(e) {
      let y = e.clientY - clientY
      // if (y > 0) {
        y = this.$refs.listDrop.offsetTop + y
        console.log(y)
        // this.$refs.listDrop.offsetTop
      // } else {

      // }
      document.getElementById(boxName).style.left = this.$refs.listDrop.offsetLeft + 'px'
      document.getElementById(boxName).style.top = y + 'px'
    } 
  },
}
</script>

<style scoped>
.listDrop{border: 1px solid #eee;margin: 50px;}
  .listDrop li{list-style: none;height: 60px;border-bottom: 1px solid #eee;}
  .listDrop li:last-child{border-bottom: none;}
  .listDrop_box{display: flex;height: 60px;}
  .listDrop_move{width: 60px;position: relative;}
  .listDrop_move i{content: '';width: 30px;height: 30px;background: #eee;position: absolute;left: 15px;top: 15px;cursor: pointer;}
  .listDrop_content{flex: 1;padding-left: 20px;line-height: 60px;}

#listDrop_box{position: fixed;z-index: 99;pointer-events: none;}
</style>
