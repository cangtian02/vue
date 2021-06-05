<template>
  <div class="page">

    <div class="page-top">
      <shopinfo :info="shopinfo"></shopinfo>
    </div>

    <div class="page-center">
      <tabs :list="shoplist"></tabs>
    </div>

    <div class="page-bottom">
      <buybar :info="shopinfo" :buynum="buyNum" @isShowcart="isShowcartFlag"></buybar>
    </div>
    
    <shoppingcart :list="shoplist" :isShowcart="isShowcart"></shoppingcart>
    
    <transition name="mask">
      <div class="mask" v-if="isShowcart" :class="{active: isShowcart}"></div>
    </transition>

  </div>  
</template>

<script>
import Vue from 'vue';
import Resource from 'vue-resource';

import Shopinfo from './components/Shopinfo';
import Buybar from './components/Buybar';
import Shoppingcart from './components/Shoppingcart';
import Tabs from './components/Tabs';

Vue.use(Resource);

export default {
  name: 'app',
  data () {
     return {
      shopinfo: '',
      shoplist: [],
      buyNum: 0,
      isShowcart: false
     } 
  },
  components: { Shopinfo , Buybar, Shoppingcart, Tabs},
  mounted: function (){
    this.$nextTick(()=>{
      this.getData();
    });
  },
  methods: {
    getData: function (){
      this.$http.get('../static/shop_data.json').then((res)=>{
        res = res.body.result;
        this.shopinfo = res.info;
        this.shoplist = res.list;
      });
    },
    isShowcartFlag (flag) {
      this.isShowcart = flag;
    }
  },
  watch: {
    shoplist: {
      handler (val, oldVal){
        let buyNum = 0;
        val.forEach((e)=>{
          if(typeof e.classnum != 'undefined' && e.classnum > 0 ){
            buyNum = buyNum + e.classnum; 
          }
        });
        this.buyNum = buyNum;
      },
      deep: true      
    }
  } 
}
</script>

<style>
html{font-size: 20px;height: 100%;}
body{height: 100%;margin: 0}
ul,li{list-style: none;margin: 0;padding: 0;}
h1,h2,h3,h4,h5,h6,p{margin: 0;}

.borderBotscaleY:after{content: '';position: absolute;background: #e7e7e7;left: 0;right: 0;bottom: 0;height: 1px;-webkit-transform-origin: 50% 100%;transform-origin: 50% 100%;-webkit-transform: scaleY(.5);transform: scaleY(.5);}

.page{position: relative;height: 100%;overflow: hidden;}
  .page-top{height: 5rem;position: absolute;left: 0;right: 0;top: 0;z-index: 1;}
  .page-center{position: absolute;left: 0;right: 0;bottom: 0;top: 5rem;z-index: 1;}
  .page-bottom{height: 2.4rem;position: absolute;left: 0;right: 0;bottom: 0;z-index: 3;}

.mask{position: absolute;top: 0;bottom: 2.4rem;left: 0;right: 0;z-index: 1;background: #000;}
  .mask{opacity: .5}
  .mask.mask-enter-active{-webkit-animation: maskShow .3s;animation: maskShow .3s;}
  .mask.mask-leave-active{-webkit-animation: maskHide .3s;animation: maskHide .3s;}
@-webkit-keyframes maskShow{
  from{opacity: 0;}
  to{opacity: .5;}
}
@keyframes maskShow{
  from{opacity: 0;}
  to{opacity: .5;}
}
@-webkit-keyframes maskHide{
  from{opacity: .5;}
  to{opacity: 0;}
}
@keyframes maskHide{
  from{opacity: .5;}
  to{opacity: 0;}
}      
</style>