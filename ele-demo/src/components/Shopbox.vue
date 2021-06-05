<template>
	<div class="shop-box">
		<ul class="shop-class">
			<li class="borderBotscaleY" 
				v-for="(classlist ,index) in list" 
				:class="{active: index==currentindex}"
				@click="classClick(index)"
			>
				<p>{{ classlist.class }}</p>
				<i>{{ classlist.classnum }}</i>
			</li>
		</ul>
		<div class="shop-list">
			<section v-for="(classlist, cindex) in list">
				<div class="t">{{ classlist.items_title }}</div>
				<ul class="item-list">
					<li class="borderBotscaleY" v-for="(item, index) in classlist.items">
						<img :src="item.img" class="l" />
						<div class="r">
							<h2>{{ item.name }}</h2>
							<p>{{ item.dec }}</p>
							<small>￥{{ item.salePrice }}</small>
						</div>
						<div class="n">
							<numbox :classindex="cindex" :itemindex="index" :buynum="0" @num-val="numval" ></numbox>
						</div>
					</li>									
				</ul>
			</section>
		</div>
	</div>
</template>

<script>
import Numbox from './Numbox';

export default {
  name: 'shopbox',
  data () {
  	return {
  		currentindex: 0
  	}
  },
  components: { Numbox },
  props: [ 'list'],
  methods: {
  	classClick (i) {
  		this.currentindex = i;	
  	},
  	numval (obj) {
  		let curClass = this.list[obj.classindex];
  		let curItems = curClass.items[obj.itemindex];
		if(typeof curItems.buynNum == 'undefined'){
			this.$set(curItems,'buynNum', obj.val);	
		}else{
			curItems.buynNum = obj.val;
		}
		let classnum = '';
		curClass.items.forEach( (e)=> {
			if(typeof e.buynNum != 'undefined' && e.buynNum > 0 ){
				classnum++;	
			}
		});
		if(typeof curClass.classnum == 'undefined'){
			this.$set(curClass,'classnum', classnum);	
		}else{
			curClass.classnum = classnum;
		}		
  	}
  } 
}		
</script>

<style>
.shop-box{display: -webkit-flex;display: flex;height: 100%;}
	.shop-class{display: inline-block;width: 4rem;background: #F4F4F4;padding-bottom: 4.5rem;overflow-y: scroll;}
	.shop-class li{height: 3rem;position: relative;}
	.shop-class li.active{background: #FFFFFF;}
	.shop-class li.active:before{content: '';width: .1rem;background: #247BF0;position: absolute;top: 0;bottom: 0;left: 0;}
	.shop-class li p{height: 100%;padding: 0 .5rem;display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center;font-size: .7rem;color: #666;line-height: .7rem;}
	.shop-class li i{font-style: normal;font-size: .6rem;color: #FFFFFF;line-height: .7rem;padding: 0 .25rem;background: #E60010;border-radius: .5rem;position: absolute;right: .1rem;top: .1rem;}
	.shop-box .shop-list{-webkit-flex: 1;flex: 1;padding-bottom: 4.5rem;overflow-y: scroll;}
	.shop-box .shop-list section .t{font-size: .7rem;color: #333;padding-left: .75rem;line-height: 1.4rem;background: #F7F7F7;position: relative;}
	.shop-box .shop-list section .t:after{content: '';width: .1rem;background: #EEEEEE;position: absolute;left: 0;top: 0;bottom: 0;}

.item-list{padding-left: .5rem;background: #FFFFFF;}
	.item-list li{display: -webkit-flex;display: flex;padding: .5rem 0;position: relative;}
	.item-list li .l{display: inline-block;width: 3rem;height: 3rem;}
	.item-list li .r{-webkit-flex: 1;flex: 1;margin: 0 .25rem 0 .5rem;}
	.item-list li .r h2{font-weight: normal;font-size: .7rem;line-height: 1rem;}
	.item-list li .r p{min-height: .7rem;font-size: .6rem;color: #999;line-height: .7rem;margin-bottom: .25rem;}
	.item-list li .r small{color: #E60010;font-size: .8rem;text-indent: -.15rem;}
	.item-list li .n{position: absolute;right: .5rem;bottom: .5rem;}
</style>