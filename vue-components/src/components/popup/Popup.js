import Vue from 'vue'
// 引入popup基础组件
import _popup from './Popup.vue'

// 使用基础Vue构造器，命名一个子类
const PopupConstructor = Vue.extend(_popup)

// new一个实例并挂载到dom节点上
let getInstance = () => {
	return new PopupConstructor().$mount(document.createElement('div'))
}

/**
 * 给实例添加一个关闭组件方法
 */
PopupConstructor.prototype.close = function () {
	this.popupShow = false
	// 因组件的关闭css动画时间是300ms，故使用300ms延迟再撤销dom结构
	setTimeout(() => {
		this.$el.parentNode.removeChild(this.$el)
		this.showType = -1
	}, 300)
}

/**
 * popup主要方法，接收组件的传值显示相关dom并执行相关回调
 * @param  {Object} options [组件接收参数]
 * options = {
 * 	type: String,        表明调用组件哪个方法,('toast'、'alert'、'confirm'、'loading')
 * 	msg: String,         提示文本
 *  position: String,    toast提示dom处在什么位置，默认底部有三种值 'top', 'middle', 'bottom'
 * 	duration: Number,    toast提示框关闭时间，默认2000ms
 * 	confirm: Function,   调用alert或者confirm时点击确定按钮回调事件
 * 	cancel: Function,    调用aconfirm时点击取消按钮回调事件
 * 	buttons: Array       调用aconfirm时自定义按钮
 * }
 */
let popup = (options = {}) => {
	// 命名实例
	let instance = getInstance()

	// 实例化接收参数
	instance.type = options.type || ''
	instance.msg = options.msg || ''
	instance.position = options.position || 'bottom'
	instance.duration = options.duration || 2000

	// 当调用alert方法时，实例点击确定按钮方法，实现方法回调
	if (instance.type === 'alert') {
		let confirm = options.confirm || function () { }
		instance.confirmFun = () => {
			closePopup()
			new confirm
		}
	}

	// 当调用confirm方法时，根据接收options.buttons参数执行相对应方法
	if (instance.type === 'confirm') {
		if (typeof options.buttons !== 'undefined') {
			// 有接收到options.buttons执行自定义按钮
			for (let i = 0, l = options.buttons.length; i < l; i++) {
				instance.buttons.push({
					name: options.buttons[i].name,
					actions: function () {
						closePopup()
						new options.buttons[i].actions
					}
				})
			}
		} else {
			// 没有接收到options.buttons使用默认按钮
			let cancel = options.cancel || function () { }
			let confirm = options.confirm || function () { }
			let _buttons = [{
				name: '取消',
				actions: function () {
					closePopup()
					cancel()
				}
			}, {
				name: '确定',
				actions: function () {
					closePopup()
					confirm()
				}
			}]
			instance.buttons = _buttons
		}
	}

	// 将组件添加到body中
	document.body.appendChild(instance.$el)

	// dom更新后执行事件
	Vue.nextTick(() => {
		// 根据组件接收到的type更改showType变量，显示相对应的dom结构
		switch (instance.type) {
			case 'toast':
				instance.showType = 1
				break
			case 'alert':
				instance.showType = 2
				break
			case 'confirm':
				instance.showType = 3
				break
			case 'loading':
				instance.showType = 4
				break
		}

		/**
		 * 因为在组件中dom节点使用showType来做的v-if判断，因vue的v-if切换是局部编译，不同于v-show的css显示隐藏切换
		 * v-if切换会有dom更新的一段时间，相当于上面把组件添加到body后使用nextTick方法一样，所以在这里会使用20ms的延迟再执行dom显示
		 * 为什么是20ms，而不是10ms或者是30、40等等呢？看者自己去Google or Baidu吧 ^-^
		 */
		setTimeout(() => {
			instance.popupShow = true
		}, 20)

		// 如果调用的是toast方法时，时间到了就关闭组件
		if (instance.showType === 1) {
			setTimeout(() => {
				closePopup()
			}, instance.duration)
		}
	})

	/**
	 * 关闭组件方法
	 */
	let closePopup = () => {
		instance.popupShow = false
		// 因组件的关闭css动画时间是300ms，故使用300ms延迟再撤销dom结构
		setTimeout(() => {
			instance.$el.parentNode.removeChild(instance.$el)
			instance.showType = -1
		}, 300)
	}

	return instance
}

export default popup