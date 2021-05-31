<!--
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2021-05-31 15:53:49
 * @Description: ...
-->
<template>
  <div class="listDrop" ref="listDrop">
    <li v-for="(item, idx) in list" :key="idx">
      <div class="listDrop_box" :style="listStyle[idx]">
        <div class="listDrop_move"></div>
        <div class="listDrop_content">噼里啪啦-----{{idx}}</div>
      </div>
    </li>
  </div>
</template>

<script>
const itemHeight = 60
let isDown = false
let isMove = false
let copyIndex = 0
let moveIndex = -1
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
  mounted() {
    this.initEvent()
  },
  methods: {
    init() {
      let listStyle = new Array(this.list.length)
      this.listStyle = listStyle
    },
    initEvent() {
      document.addEventListener('mousedown', this.mousedown, false)
      document.addEventListener('mousemove', this.mousemove, false)
      document.addEventListener('mouseup', this.mouseup, false)
    },
    mousedown(e) {
      e.preventDefault()
      
      if (e.target.className !== 'listDrop_move') return

      isDown = true
      clientY = e.clientY
      copyIndex = Math.ceil((clientY - this.$refs.listDrop.offsetTop) / itemHeight) - 1
      document.documentElement.style.cursor = 'pointer'
    },
    mousemove(e) {
      if (!isDown) return

      if (!isMove) {
        isMove = true
        boxDom = this.$refs.listDrop.children[copyIndex].children[0].cloneNode(true)
        boxDom.id = boxName
        boxDom.style = ''
        boxDom.style.width = this.$refs.listDrop.clientWidth + 'px'
        boxDom.style.left = this.$refs.listDrop.offsetLeft + 'px'
        boxDom.style.top = (this.$refs.listDrop.offsetTop + copyIndex * itemHeight) + 'px'
        document.body.append(boxDom)
        this.initListStyle(e)
      }
      
      this.moveBox(e)
    },
    mouseup(e) {
      if (!isDown) return

      isDown = false
      if (isMove) {
        document.body.removeChild(document.getElementById(boxName))
        isMove = false
      }
      document.documentElement.style.cursor = 'auto'

      let listStyle = JSON.parse(JSON.stringify(this.listStyle))
      let n = moveIndex > copyIndex ? itemHeight * (moveIndex - copyIndex) : -(itemHeight * (copyIndex - moveIndex))
      listStyle[copyIndex] = `transform: translate3d(0,${n}px,0);`
      this.listStyle = listStyle

    },
    initListStyle(e) {
      let listStyle = JSON.parse(JSON.stringify(this.listStyle))
      listStyle[copyIndex] = 'opacity: 0;visibility: hidden;'
      this.listStyle = listStyle
    },
    moveBox(e) {
      let y = e.clientY - clientY
      document.getElementById(boxName).style.transform = `translate3d(0, ${y}px, 0)`
      
      let idx = Math.ceil((e.clientY - this.$refs.listDrop.offsetTop) / itemHeight) - 1
 
      if (idx < 0 || idx > this.listStyle.length - 1) return

      if (idx !== moveIndex) {
        let listStyle = JSON.parse(JSON.stringify(this.listStyle))

        if (moveIndex === -1 && idx < copyIndex) {
          listStyle[idx] = `transform: translate3d(0,${-itemHeight}px,0);transition: all .6s ease;`
        }

        if (moveIndex === -1 && idx > copyIndex) {
          listStyle[idx] = `transform: translate3d(0,${itemHeight}px,0);transition: all .6s ease;`
        }

        if (idx < moveIndex) {
          listStyle[moveIndex] = `transform: translate3d(0,0,0);transition: all .6s ease;`
        }

         if (idx > moveIndex && moveIndex > -1) {
          listStyle[idx] = `transform: translate3d(0,${-itemHeight}px,0);transition: all .6s ease;`
        }

        // if (idx > moveIndex && idx !== copyIndex) {
        //   listStyle[idx] = `transform: translate3d(0,${-itemHeight}px,0);transition: all .6s ease;`
        // }

        
        // if (idx < copyIndex && idx !== moveIndex) {
        //   listStyle[idx] = `transform: translate3d(0,${itemHeight}px,0);transition: all .6s ease;`
        // } else if (idx < moveIndex) {
        //   listStyle[moveIndex] = `transform: translate3d(0,0,0);transition: all .6s ease;`
        // }

        this.listStyle = listStyle
        moveIndex = idx
      }
    } 
  },
}
</script>

<style scoped>
.listDrop{border: 1px solid #eee;margin: 50px;}
  .listDrop li{list-style: none;height: 60px;border-bottom: 1px solid #eee;}
  .listDrop li:last-child{border-bottom: none;}
  .listDrop_box{display: flex;height: 60px;}
  .listDrop_move{width: 30px;height: 30px;margin: 15px; background: #eee;cursor: pointer;}
  .listDrop_content{flex: 1;padding-left: 20px;line-height: 60px;}

#listDrop_box{position: fixed;z-index: 9;pointer-events: none;background: #eee;border-bottom: 1px solid #eee;
border-right: 1px solid #eee;}
</style>
