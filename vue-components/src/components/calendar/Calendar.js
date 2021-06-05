import Vue from 'vue'
import mCalendar from './Calendar.vue'

const CalendarConstructor = Vue.extend(mCalendar)

let getAnInstance = () => {
	return new CalendarConstructor({
		el: document.createElement('div')
	})
}

CalendarConstructor.prototype.close = function(){
	if (this.$el.parentNode != null) this.$el.parentNode.removeChild(this.$el);
};

let calendar = ( options = {} ) => {
	let instance = getAnInstance()

	instance.dateVal = options.val || ''
	instance.calendarconfirm = options.callback || ''

	instance.calendarclose = () => {
		instance.calendarShow = false	
		setTimeout(() => {
			instance.$el.parentNode.removeChild(instance.$el)
		},300)
	}

	document.body.appendChild(instance.$el)

	setTimeout(() => {
		instance.calendarShow = true
	},20)

	return instance
}

export default calendar