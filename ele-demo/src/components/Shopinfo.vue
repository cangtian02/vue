<template>
	<div class="shop-info">
		<img :src="info.logo" class="bg-img" />
		<div class="info-box">
			<img :src="info.logo" class="l" />
			<div class="r">
				<h1>{{ info.name }}</h1>
				<h3>{{ info.point }}</h3>
				<p>公告：{{ info.notice }}</p>
			</div>
		</div>
	</div>	
</template>

<script>
export default {
  name: 'shopinfo',
  props: [ 'info' ]
}		
</script>

<style>
.shop-info{height: 5rem;position: relative;overflow: hidden;}
	.shop-info .bg-img{display: block;width: 150%;margin: -25% 0 0 -25%;-webkit-filter: blur(15px);filter: blur(15px);}	
	.shop-info .info-box{display: -webkit-flex;display: flex;position: absolute;left: 0;right: 0;top: 0;bottom: 0;padding: .5rem;}
	.shop-info .info-box .l{display: inline-block;width: 4rem;height: 4rem;margin-right: .5rem;border-radius: .15rem;}
	.shop-info .info-box .r{-webkit-flex: 1;flex: 1;}
	.shop-info .info-box .r h1{font-size: .9rem;font-weight: normal;line-height: 1.6rem;color: #FFFFFF;}
	.shop-info .info-box .r h3{height: 1.4rem;font-weight: normal;line-height: .7rem;}
	.shop-info .info-box .r h3, .shop-info .info-box .r p{font-size: .6rem;color: #F5F5F5;}
</style>