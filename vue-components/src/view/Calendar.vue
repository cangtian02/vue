<template>
	<div class="calendar" id="calendar">
        <h3>一个选择框</h3>
        <input type="tel" @click="open" :value="calendarDate" readonly="readonly">
        <h3>多个选择框</h3>
        <input type="text" readonly @click="openCalendar(0)" :value="calendarDate_arr[0]">
        <input type="text" readonly @click="openCalendar(1)" :value="calendarDate_arr[1]">
	</div>
</template>

<script>
import calendar from '@/components/calendar/Calendar'

export default {
    name: 'calendar',
    data (){
        return {
            calendarDate: '',
            calendarInstance: '',
            calendarArrInstance: '',
            calendarDate_arr: ['', ''],
        }
    },
    created (){
        let date = new Date()
        let year = Number(date.getFullYear())
        let month = Number(date.getMonth() + 1)
        let day = Number(date.getDate())
        this.calendarDate = year + '-' + month + '-' + day

        this.calendarDate_arr = [year + '-' + month + '-' + day, year + '-' + month + '-' + day]
    },
    methods: {
        open (){
            this.calendarInstance = calendar({val: this.calendarDate,callback: () => {
                this.calendarDate = this.calendarInstance.dateVal
                this.calendarInstance = ''
            }})
        },
		// 打开日期选择框
		openCalendar (i){
            this.instance = calendar({
			    val: this.calendarDate_arr[i],
			    callback: () => {
					this.calendarDate_arr.splice(i, 1, this.instance.dateVal)
					this.instance = ''
				}
			})
		}
    }    
}
</script>

<style scoped>
input{display: block;line-height: 30px;margin: 0 0 10px 10px;padding-left: 10px}
</style>
