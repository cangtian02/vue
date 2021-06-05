<template>
	<div class="buy-bar">
		<div class="l" :class="{active: buynum > 0}" @click="switchCart">{{ buynum }}</div>
		<div class="c">
			<p class="n">购物车为空</p>
			<!--<p class="m">￥元</p>
			<p class="s">另需配送费{{ info.send }}元</p>-->
		</div>
		<div class="r">￥{{ info.send }}起送</div>
	</div>
</template>

<script>
export default {
  name: 'buybar',
  data () {
  	return {
  		isShowcart: false
  	}
  },
  props: [ 'info' , 'buynum'],
  methods: {
  	switchCart () {
  		if(this.buynum > 0){
  			this.isShowcart = !this.isShowcart;
  			this.$emit('isShowcart', this.isShowcart);
  		}
  	}
  }
}		
</script>

<style>
.buy-bar{display: -webkit-flex;display: flex;height: 2.4rem;background: rgba(69,69,71,.95);}
	.buy-bar .l{display: inline-block;width: 1.8rem;height: 1.8rem;margin: -.6rem .75rem 0 .75rem;border: .25rem solid #454547;border-radius: 50%;background: #333;text-align: center;line-height: 1.8rem;font-size: .8rem;color: #999;}
	.buy-bar .l.active{background: #247BF0;color: #FFFFFF;}
	.buy-bar .c{-webkit-flex: 1;flex: 1;}
	.buy-bar .c .n{line-height: 2.4rem;color: #999;font-size: .7rem;}
	.buy-bar .c .m{font-size: .8rem;color: #FFFFFF;margin-top: .3rem;}
	.buy-bar .c .s{font-size: .6rem;color: #FFFFFF;}	
	.buy-bar .r{display: inline-block;line-height: 2.4rem;padding: 0 1rem;background: #535350;color: #999;font-size: .7rem;}
	.buy-bar .r.active{background: #5BDB5B;color: #FFFFFF;}
</style>