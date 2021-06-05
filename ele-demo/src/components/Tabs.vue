<template>
	<div class="tab-box">
		<div class="tab-nav borderBotscaleY">
			<i></i>
			<div class="tab-link active">商品</div>
			<div class="tab-link">评分</div>
		</div>
		<div class="tabs">
			<div class="tab tab1">
				<shopbox :list="list"></shopbox>
			</div>
			<div class="tab tab2"></div>
		</div>
	</div>
</template>

<script>
import Shopbox from './Shopbox';

export default {
  name: 'tabs',
  components: { Shopbox },
  props: [ 'list'],
  methods: {

  }
}		
</script>

<style>
.tab-box{height: 100%;}
	.tab-box .tab-nav{display: -webkit-flex;display: flex;line-height: 2.2rem;background: #FFFFFF;position: relative;}
	.tab-box .tab-nav i{width: 50%;height: .1rem;background: #247BF0;position: absolute;left: 0;bottom: 0;}
	.tab-box .tab-nav .tab-link{-webkit-flex: 1;flex: 1;font-size: .7rem;text-align: center;color: #434343;}
	.tab-box .tab-nav .tab-link.active{color: #247BF0;}
	.tab-box .tabs, .tab-box .tabs .tab{height: 100%;}
</style>