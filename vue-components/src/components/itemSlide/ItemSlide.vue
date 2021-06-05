<template>
	<div class="ct-itemSlide" @touchstart="getItem" @touchmove="moveItem" @touchend="endMove">
		<slot></slot>
		<div class="ct-itemSlide-btn-box" ref="slideCont" v-if="status">
			<div class="ct-itemSlide-btn" v-if="buttons.length == 0" @click="handle">删除</div>

			<div class="ct-itemSlide-btn" 
				v-if="buttons.length > 0" 
				v-for="(item, index) in buttons" 
				:key="index" 
				:style="{background: item.color ? item.color : colors[index]}"
				@click="handle(index)"
			>
				{{ item.name }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'itemSlide',
	data () {
		return {
			toggle: false,  // 显示状态 
			isOut: true,  // false执行滑动事件，true不执行
			x: 0,  // x轴坐标位置
			offsetVal: 0,  // 滑动距离
			width: 0,  // 操作按钮盒子的宽度,
			colors: ['#C9C6C6', '#EFAC4D', '#C63B34']  // 自定义按钮背景颜色
		}
	},
	props: {
		// 检查边界值  按钮盒子宽度的百分比
		rate: {
			default: 0.4
		},
		// 是否启用插件
		status: {
			default: true
		},
		// 自定义操作按钮
		buttons: {
			default: () => {
				return []
			}
		},
		// 自定义操作按钮时列表所在位置
		sub: {
			default: 0
		}
	},
	created () {
		this.$nextTick(() => {
			if(this.status) {
				// 初始化按钮盒子宽度
				this.width = this.$refs.slideCont.clientWidth;
				this.isOut = false;
			}
		});
	},
	methods: {
		getItem (e) {
			if(!this.status) return;
			if(e.touches.length > 1) return;  // 只允许单指操作

			const m = e.touches[0];
			this.isOut = false;
			this.x = m.clientX;
		},
		moveItem (e) {
			if(!this.status) return;
			if(this.isOut) return;
			if(e.touches.length > 1) return;  // 只允许单指操作

			const t = e.target || window.event.srcElement;
			const m = e.touches[0];

			if (this.isChild(t, 'ct-itemSlide')) {
				this.offsetVal += (this.x - 0) - (m.clientX - 0);

				if (this.offsetVal > this.width) {
					this.offsetVal = this.width;
				} else if (this.offsetVal < 0){
					this.offsetVal = 0;
				}

				this.x = m.clientX;
				this.$refs.slideCont.style.WebkitTransform = 'translate3d(' + -(this.offsetVal - this.width) + 'px, 0, 0)';
			} else {
				this.isOut = true;
				this.toggleBtn(1);
			}
		},
		endMove (e) {
			if(!this.status) return;
			if(e.touches.length > 1) return;  // 只允许单指操作

			let rateWidth = this.buttons.length > 0 ? this.width / this.buttons.length : this.rate * this.width;
			if(this.toggle) {
				-(this.offsetVal - this.width) > rateWidth ? this.toggleBtn(1) : this.toggleBtn(0);
			} else {
				this.offsetVal > rateWidth ? this.toggleBtn(0) : this.toggleBtn(1);
			}
		},
		// i: 0显示 1隐藏  操作按钮
		toggleBtn (i) {
			let x = i == 0 ? 0 : '100%';

			this.$refs.slideCont.style.WebkitTransitionDuration = '.3s';
			this.$refs.slideCont.style.WebkitTransform = 'translate3d(' + x + ', 0, 0)';

			setTimeout(() => {
				this.$refs.slideCont.removeAttribute('style');
				if(i == 0) {
					this.offsetVal = this.width;
					this.$refs.slideCont.style.WebkitTransform = 'translate3d(0, 0, 0)';
					this.toggle = true;
				} else {
					this.offsetVal = 0;
					this.toggle = false;
				}
			}, 300);
		},
		isChild (t, className) {
			let inif = () => {
				if (t.className.indexOf(className) > -1) {
					return true;
				} else {
					t = t.parentNode;
					if (t.nodeName.toLowerCase() === 'body') {
						return false;
					}
					return inif();
				}
			}
			return inif();
		},
		// 操作按钮点击事件回调 使用一个默认按钮时回调函数不带参数，使用自定义按钮回调带一个数组0：父组件传来的位置，1：该按钮在自定义按钮数组中的位置
		handle (i) {
			this.toggleBtn(1);
			this.buttons.length > 0 ? this.$emit('handle', [this.sub, i]) : this.$emit('handle');
		}
	}
}
</script>

<style scoped>
.ct-itemSlide{width: 100%;height: auto;position: relative;overflow: hidden;}

.ct-itemSlide-btn-box{display: flex;height: 100%;position: absolute;top: 0;right: 0;transition-property: transform, opacity;transform: translate3d(100%,0, 0) scale(0);}

.ct-itemSlide-btn{display: flex;justify-content: center;align-items: center;width: 60px;height: 100%;color: #fff;font-size: 14px;background:#C63B34;}
</style>