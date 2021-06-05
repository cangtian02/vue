<template>
	<div class="slide-container" ref="root">
		<ul class="slide-main" 
			@touchstart="touchstartX"
			@touchmove="touchmoveX"
			@touchend="touchendX"
		>
			<li v-for="list in slidelist">
				<img :src=list.src />
			</li>
		</ul>
		<ul class="slide-pagination">
			<li v-for="list in slidelist"></li>
		</ul>
	</div>
</template>

<script>
let oSlideBox; // 轮播图片盒子
let oIndex; // 圆点盒子

let iNow = 1; // 移动到第几个元素 
let iStartX = 0; //记录手指开始按下的X坐标
let iStartTranslateX = 0; //物体移动到的X坐标
let oInter; // 定时器

export default {
  name: 'slide',
  data () {
  	return {
  		isAutoplay: true // 是否自动轮播
  	}
  },
  props: [ 'slidelist', 'autoplay'],
  mounted: function(){
  	if(this.autoplay != undefined){this.isAutoplay = this.autoplay}

  	oSlideBox = this.$refs.root.querySelector('.slide-main');
  	oIndex = this.$refs.root.querySelector('.slide-pagination');

	const first = oSlideBox.children[0].cloneNode(true);
	const last = oSlideBox.children[oSlideBox.children.length - 1].cloneNode(true);
		
	oSlideBox.appendChild(first);
	oSlideBox.insertBefore(last,oSlideBox.childNodes[0]);

	this.tab(); //初始化选项
	this.setInterval(); //初始化定时器
  },
  methods: {
  	tab (){
		const oIndexList = oIndex.children;		

		oSlideBox.style.transition = 'transform .3s ease';
		oSlideBox.style.WebkitTransform = oSlideBox.style.transform = 'translate3d(' + (-(iNow * oSlideBox.offsetWidth)) + 'px,' + '0,0)';
		
		for (let i = 0; i < oSlideBox.children.length; i++) {
			oSlideBox.children[i].className = '';
		}
		for (let i = 0; i < oIndexList.length; i++) {
			oIndexList[i].className = '';
		}
		
		oSlideBox.children[iNow].className = 'active';

		if(iNow == 0){
			oIndexList[oIndexList.length - 1].className = 'active';
		}else if(iNow == oSlideBox.children.length - 1){
			oIndexList[0].className = 'active';
			// 实现无限循环
			setTimeout(function(){
				oSlideBox.style.transition = 'transform 0s ease';
				oSlideBox.style.WebkitTransform = oSlideBox.style.transform = 'translate3d(' + (-oSlideBox.offsetWidth) + 'px,' + '0,0)';
			},300);
		}else{
			oIndexList[iNow - 1].className = 'active';
		}
  	},
  	setInterval (){
  		if(!this.isAutoplay){ return }
		oInter = setInterval(function() {
			iNow++;
			if(iNow == oSlideBox.children.length){
				iNow = 2;
			}
			this.tab();
		}.bind(this), 3000);
  	},
  	touchstartX (){
  		const touchOne = event.changedTouches[0];
		clearInterval(oInter);
		oSlideBox.style.transition = 'transform 0s ease';
		iStartX = touchOne.pageX; //记录手指开始按下的X坐标

		if(iNow == 0){
			iStartTranslateX = -((oIndex.children.length) * oSlideBox.offsetWidth);
		}else if(iNow == oSlideBox.children.length - 1){		
			iStartTranslateX = -(oSlideBox.offsetWidth);
		}else{
			iStartTranslateX = -(iNow * oSlideBox.offsetWidth);
		}
  	},
  	touchmoveX (){
		const touchOne = event.changedTouches[0];
		const iMoveX = touchOne.pageX - iStartX; //计算按下时，和当前移动到的坐标的差值

		oSlideBox.style.WebkitTransform = oSlideBox.style.transform = 'translate3d(' + (iStartTranslateX + iMoveX) + 'px,' + '0,0)';  		
  	},
  	touchendX (){
		const touchOne = event.changedTouches[0];
		const iMoveX = touchOne.pageX - iStartX;
		
		iNow = - Math.round((iStartTranslateX + iMoveX) / oSlideBox.offsetWidth);

		if (iNow < 0) {	
			iNow = 0;
		}else if(iNow > oSlideBox.children.length - 1){
			iNow = oSlideBox.children.length - 1;
		}

		this.tab();
		this.setInterval(); 
  	}
  } 
}		
</script>

<style scoped>
ul,li{list-style-type: none;}
.slide-container{width: 100%;overflow: hidden;position: relative;}
.slide-container .slide-main{display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;-webkit-transform-style: preserve-3d;transform-style: preserve-3d;-webkit-transition-property: -webkit-transform;transition-property: transform;}    
.slide-container .slide-main li{-webkit-flex-shrink: 0;-ms-flex: 0 0 auto;flex-shrink: 0;width: 100%;position: relative;}
.slide-container .slide-main li a{display: block;}   
.slide-container .slide-main li img{display: block;width: 100%;}   
.slide-container .slide-pagination{position: absolute;right: 0;left: 0;bottom: 0;z-index: 10;text-align: center;background: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0));}    
.slide-container .slide-pagination li{display: inline-block;width: .4rem;height: .4rem;margin: 0 .15rem;border-radius: 50%;background: rgba(0,0,0,.2);}
.slide-container .slide-pagination li.active{background: #E60012;}
</style>