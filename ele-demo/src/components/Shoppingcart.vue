<template>
	<transition name="cart">
		<div class="shop-cart" v-if="isShowcart" :class="{active: isShowcart}">
			<div class="t"><span>清空</span>购物车</div>
			<ul>
				<li class="borderBotscaleY" v-for="item in cartlist">
					<div class="s">{{ item.name }}</div>
					<div class="m">￥{{ item.salePrice }}</div>
					<div class="buy-num-box">
						<numbox :classindex="item.cindex" :itemindex="item.index" :buynum="item.buynNum" @num-val="numval"></numbox>
					</div>					
				</li>				
			</ul>
			<p>欢迎下单</p>
		</div>
	</transition>
</template>

<script>
import Numbox from './Numbox';

export default {
  name: 'shoppingcart',
  data () {
  	return {
  		cartlist: []
  	}
  },
  components: { Numbox },
  props: ['list', 'isShowcart'],
  methods: {
  	numval (obj) {
  		this.list[obj.classindex].items[obj.itemindex].buynNum = obj.val;
  	}
  },
  watch: {
    list: {
      handler (val){
      	this.cartlist = [];
	  	val.forEach((e,i)=>{
	  		e.items.forEach((v,j)=>{
	  			if(v.buynNum != 'undefined' && v.buynNum > 0){
	  				this.cartlist.push({
	  					"name": v.name,
	  					"salePrice": v.salePrice * v.buynNum,
	  					"buynNum": v.buynNum,
	  					"cindex": i,
	  					"index": j						
	  				});
	  			}	
	  		});
	  	});
      },
      deep: true      
    }
  }  
}		
</script>

<style>
.shop-cart{position: absolute;bottom: 2.4rem;left: 0;right: 0;z-index: 2;background: #F4F4F4;display: none;}
	.shop-cart.active{display: block;}
	.shop-cart .t{line-height: 2rem;font-size: .7rem;padding: 0 .75rem;}
	.shop-cart .t span{float: right;}
	.shop-cart p{line-height: 1.4rem;font-size: .7rem;text-align: center;}
	.shop-cart ul{background: #FFFFFF;padding: 0 .75rem;max-height: 9.3rem;overflow-y: scroll;}
	.shop-cart ul li{display: -webkit-flex;display: flex;padding: .75rem 0;position: relative;}
	.shop-cart ul li .s{-webkit-flex: 1;flex: 1;font-size: .7rem;line-height: 1.2rem;}
	.shop-cart ul li .m{display: inline-block;font-size: .7rem;color: #E60010;line-height: 1.2rem;}
	.shop-cart ul li .buy-num-box{display: inline-block;}
	.shop-cart ul li .show-box{display: block;}
    .shop-cart.cart-enter-active{-webkit-animation: shopCartshow .3s;animation: shopCartshow .3s;}
    .shop-cart.cart-leave-active{-webkit-animation: shopCarthide .3s;animation: shopCarthide .3s;}		
@-webkit-keyframes shopCartshow{
	from{opacity: 0;-webkit-transform: translateY(100%);transform: translateY(100%);}
	to{opacity: 1;-webkit-transform: translateY(0%);transform: translateY(0%);}
}
@keyframes shopCartshow{
	from{opacity: 0;-webkit-transform: translateY(100%);transform: translateY(100%);}
	to{opacity: 1;-webkit-transform: translateY(0%);transform: translateY(0%);}
}
@-webkit-keyframes shopCarthide{
	from{opacity: 1;-webkit-transform: translateY(0%);transform: translateY(0%);}
	to{opacity: 0;-webkit-transform: translateY(1000%);transform: translateY(100%);}
}
@keyframes shopCarthide{
	from{opacity: 1;-webkit-transform: translateY(0%);transform: translateY(0%);}
	to{opacity: 0;-webkit-transform: translateY(1000%);transform: translateY(100%);}
}
</style>