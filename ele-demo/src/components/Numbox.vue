<template>
	<div class="num-box">
		<div class="show-box" :class="{active: numval > 0}">
			<div class="btn min" @click="minClick">-</div>
			<div class="val">{{ numval }}</div>
		</div>
		<div class="btn plus" :class="{active: plusFlag}" @click="plusClick">+</div>
	</div>
</template>

<script>
export default {
  name: 'numbox',
  data (){
  	return {
  		plusFlag: false,
  		numval: this.buynum
  	}
  },
  props: ['classindex', 'itemindex', 'buynum'],
  methods: {
  	plusClick () {
  		this.numval++;
  		this.plusFlag = true;
  		setTimeout(()=>{
  			this.plusFlag = false;
  		},300);
  	},
  	minClick () {
  		this.numval--;
  		if(this.numval < 1){
  			this.numval = 0;
  		}
  	}
  },
  watch: {
  	numval: {
  		handler (val, oldVal){
  			let obj = {'val': val, 'classindex': this.classindex, 'itemindex': this.itemindex};
  			this.$emit('num-val', obj)
  		},
  		deep: true
  	}
  }
}		
</script>

<style>
.num-box{position: relative;height: 1.1rem;width: 4rem;}
	.num-box .btn{float: left;width: 1rem;height: 1rem;line-height: .9rem;font-size: .8rem;text-align: center; border: .05rem solid #3190E8;border-radius: 50%;}
	.num-box .plus{background: #3190E8;color: #FFFFFF;position: absolute;right: 0;top: 0;z-index: 2;}
	.num-box .plus.active{-webkit-animation: plusClick .1s;animation: plusClick .1s;}
	.num-box .show-box .min{color: #3190E8;}
	.num-box .show-box{position: absolute;top: 0;right: 1rem;z-index: 1;display: none;}
	.num-box .show-box.active{display: block;}
	.num-box .show-box .val{float: left;line-height: 1.1rem;padding: 0 .25rem;font-size: .7rem;}
	.num-box .show-box.active .min, .num-box .show-box.active .val{-webkit-animation: opacity .3s forwards;animation: opacity .3s forwards;}
@-webkit-keyframes opacity{
	from{-webkit-transform: translateX(100%) rotate(360deg);transform: translateX(100%) rotate(360deg);}
	to{-webkit-transform: translateX(0%) rotate(0deg);transform: translateX(0%) rotate(0deg);}
}
@keyframes opacity{
	from{-webkit-transform: translateX(100%) rotate(360deg);transform: translateX(100%) rotate(360deg);}
	to{-webkit-transform: translateX(0%) rotate(0deg);transform: translateX(0%) rotate(0deg);}
}
@-webkit-keyframes plusClick{
	from{-webkit-transform: rotate(0deg);transform: rotate(0deg);}
	to{-webkit-transform: rotate(-30deg);transform: rotate(-30deg);}
}
@keyframes plusClick{
	from{-webkit-transform: rotate(0deg);transform: rotate(0deg);}
	to{-webkit-transform: rotate(-30deg);transform: rotate(-30deg);}
}
</style>