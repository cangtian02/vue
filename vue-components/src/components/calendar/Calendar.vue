<template>
    <div class="yx-calendar">
        <div class="yx-calendar-box" :class="{'yx-calendar-show': calendarShow,'yx-calendar-hide': !calendarShow}">

            <div class="yx-calendar-bar">
                <div class="yx-calendar-bars yx-calendar-year-bar">
                    <div class="yx-calendar-bar-btn yx-calendar-bar-btn-prev" @click="calendarBtn(0)"><i></i></div>
                    <div class="yx-calendar-current-value">{{ year }}</div>
                    <div class="yx-calendar-bar-btn yx-calendar-bar-btn-next" @click="calendarBtn(1)"><i></i></div>
                </div>
                <div class="yx-calendar-bars yx-calendar-month-bar">
                    <div class="yx-calendar-bar-btn yx-calendar-bar-btn-prev" @click="calendarBtn(2)"><i></i></div>
                    <div class="yx-calendar-current-value">{{month | month_zh }}月</div>
                    <div class="yx-calendar-bar-btn yx-calendar-bar-btn-next" @click="calendarBtn(3)"><i></i></div>
                </div>      
            </div>

            <div class="yx-calendar-inner">

                <ul class="yx-calendar-week-days">
                    <li>周日</li>
                    <li>周一</li>
                    <li>周二</li>
                    <li>周三</li>
                    <li>周四</li>
                    <li>周五</li>
                    <li>周六</li>
                </ul>

                <div class="yx-calendar-months">
                    <div class="yx-calendar-months-wrap" :style="{transform: transform_wrap}" @touchstart="touchstartX" @touchmove="touchmoveX" @touchend="touchendX" ref="root">
                        
                        <div class="yx-calendar-month yx-calendar-month-prev" :style="{transform: transform_prev }">
                            <div class="yx-calendar-row" v-for="prevMonth in prevMonth">
                                <div class="yx-calendar-day" v-for="lineMonth in prevMonth"><span>{{ lineMonth.day }}</span></div>
                            </div>            
                        </div>

                        <div class="yx-calendar-month yx-calendar-month-current" :style="{transform: transform_current }">
                            <div class="yx-calendar-row" v-for="curMonth in curMonth">

                                <div class="yx-calendar-day" v-for="lineMonth in curMonth" 
                                    :class="{ 
                                        'yx-calendar-day-ash': lineMonth.month != month, 
                                        'yx-calendar-day-today': dateVal == '' ? lineMonth.date == today : (lineMonth.date != dateVal && lineMonth.date == today), 
                                        'yx-calendar-day-selected': dateVal == '' ? false : lineMonth.date == dateVal }" 
                                        :data-year="lineMonth.year" 
                                        :data-month="lineMonth.month" 
                                        :data-day="lineMonth.day" 
                                        :data-date="lineMonth.date" 
                                        @click="selectDate(lineMonth.date,lineMonth.month == month)">

                                    <span>{{ lineMonth.day }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="yx-calendar-month yx-calendar-month-next" :style="{transform: transform_next }">
                            <div class="yx-calendar-row" v-for="nextMonth in nextMonth">
                                <div class="yx-calendar-day" v-for="lineMonth in nextMonth"><span>{{ lineMonth.day }}</span></div>
                            </div>            
                        </div>
                    </div>               
                </div>

            </div>

        </div>

        <div class="yx-calendar-mask" :class="{'yx-calendar-mask-show': calendarShow,'yx-calendar-mask-hide': !calendarShow}" @click="calendarclose"></div>      
    </div>
</template>

<script>

let iStartX = 0             // 记录手指开始按下的X坐标
let iStartTranslateX = 0    // 物体移动到的X坐标
let transform = 0           // 盒子初始偏移值

export default {
    props: {
        dateVal: {type: String,default: ''},                     // 初始化选中日期
        calendarclose: {type: Function,default: function(){}},   // 组件关闭方法
        modalconfirm: {type: Function,default: function(){}}     // 选中日期方法
    },  
    data (){
        return {
            calendarShow: false,         // 组件显示动画开关
            today: '',             // 当天日期
            prevMonth: [],         // 上月数据
            curMonth: [],          // 本月数据
            nextMonth: [],         // 下月数据
            year: '',              // 今年年份
            month: '',             // 今月月份
            day: '',               // 今日日期
            transform_arr: [0, -100, 0, 100], // 盒子偏移基础数据
            transform_wrap: '',         // 日期盒子css偏移样式  如：translate3d(-100%,0,0)
            transform_prev: '',         // 上月日期盒子css偏移样式
            transform_current: '',      // 本月日期盒子css偏移样式
            transform_next: ''          // 下月日期盒子css偏移样式
        }
    }, 
    created (){     
        this.$nextTick(() => {
            let date = new Date()

            // 如果日期没有设置，使用当天日期
            if (this.dateVal == '') {
                this.year = Number(date.getFullYear())
                this.month = Number(date.getMonth() + 1)
                this.day = Number(date.getDate())
            } else {
                let val = this.dateVal.split('-')
                this.year = Number(val[0])
                this.month = Number(val[1])
                this.day = Number(val[2])
            }

            // 当天日期 yy-mm-dd
            this.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

            this.init()
        })
    },
    filters: {
        // 返回中文月份
        month_zh (value){
            let month_zh_arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
            return month_zh_arr[value - 1]
        }
    },
    methods: {
        // 组件初始化
        init (){
            // 上月月份数据
            this.prevMonth = this.setMonth_arr(this.month - 1)

            // 本月月份数据
            this.curMonth = this.setMonth_arr(this.month)

            // 下月月份数据
            this.nextMonth = this.setMonth_arr(this.month + 1)

            // 日期盒子css偏移样式
            this.transform_wrap = 'translate3d(' + this.transform_arr[0] + '%,0,0)'

            // 上月日期盒子css偏移样式
            this.transform_prev = 'translate3d(' + this.transform_arr[1] + '%,0,0)'

            // 本月日期盒子css偏移样式
            this.transform_current = 'translate3d(' + this.transform_arr[2] + '%,0,0)'

            // 下月日期盒子css偏移样式
            this.transform_next = 'translate3d(' + this.transform_arr[3] + '%,0,0)'
        },    
        // 如果当前年份能被4整除但是不能被100整除或者能被400整除，即可确定为闰年，返回1，否则返回0
        is_leap (year){
            return (year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0))
        },
        // 各月份的总天数
        day_arr (year,month){
            let day_str = new Array(31, 28 + this.is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
            return day_str[month - 1]
        },
        // 当月第一天星期几
        firstday (year,month){
            return new Date(year, month - 1, 1).getDay()
        },
        // 重置月份数据
        setMonth_arr (month){
            let idx                 // 排列自然序号
            let _year               // 当年
            let _month              // 当月
            let _day                // 当天
            let year = this.year    // 年份
            let month_line = []     // 月份行数据
            let month_arr = []      // 月份完整数据

            // 当月份小于1月时，重置月份为12月，并年份减1，反之当月份大于12月时，重置月份为1月，并年份加1
            if (month < 1) {
                month = 12
                year = this.year - 1
            } else if (month > 12) {
                month = 1
                year = this.year + 1
            }

            /**
             * i => 行 k => 列，按照日历布局格式输出月数据数组
             * 布局以6行7列分布，先行再列
             */
            for (let i = 0; i < 6; i++) {
                // 重置空行数据，用于缓存行数据后插入到月份完整数据数组中
                month_line = []

                for(let k = 0; k < 7; k++) {
                    idx = i * 7 + k
                    _year = year
                    _month = month
                    // 自然序号减去当月第一天星期几，因循环是从0开始,所以要再加上1，缓存相应自然序号日期，便于下面计算真实日期
                    _day = idx - this.firstday(year, month) + 1

                    if (_day > this.day_arr(year, month)) {
                        // 当自然序号日期大于当月总天数时
                        if (month + 1 > 12) {
                            _year = year + 1
                            _month = 1
                        } else {
                            _month = month + 1
                        }
                        // 计算真实日期
                        _day = idx - this.firstday(year, month) + 1 - this.day_arr(year, month)
                    } else if (_day < 1) {
                        // 当自然序号日期小于1时         
                        if (month - 1 < 1) {
                            _month = 12
                            _year = year - 1
                        } else {
                            _month = month - 1
                        }
                        // 计算真实日期
                        _day = this.day_arr(_year, _month) + (idx - this.firstday(year, month) + 1)
                    }

                    // 缓存行日期数据
                    month_line.push({
                        "year": _year,
                        "month": _month,
                        "day": _day,
                        "date": _year + '-' + _month + '-' + _day
                    })
                }

                month_arr.push(month_line)
            }

            return month_arr
        },
        // 组件bar按钮点击事件
        calendarBtn (i){
            /**
             * i = 0 => 上一年，i = 1 => 下一年，i = 2 => 上一月，i = 3 => 下一月
             * 最小到1970年1月
             */
            switch (i){
                case 0:
                    this.year == 1970 ? this.year = this.year : this.year = this.year - 1
                    this.transform_fun('left')
                    break
                case 1:
                    this.year = this.year + 1
                    this.transform_fun('right')
                    break
                case 2:
                    if (this.year == 1970 && this.month == 1) {
                        this.month = this.month
                    } else if (this.year == 1970 && this.month > 1) {
                        this.month = this.month - 1
                    } else if (this.year > 1970 && this.month == 1) {
                        this.month = 12
                        this.year = this.year - 1
                    } else if (this.year > 1970 && this.month > 1) {
                        this.month = this.month - 1
                    }
                    this.transform_fun('left')
                    break
                case 3:
                    if (this.month == 12) {
                        this.month = 1
                        this.year = this.year + 1
                    } else {
                        this.month = this.month + 1
                    }
                    this.transform_fun('right')
                    break                
            }
            // 重置各项数据
            this.init()
        },
        // 日期盒子动画
        transform_fun (direction){
            if (direction == 'left') {
                this.transform_arr[0] = this.transform_arr[0] + 100
                this.transform_arr[1] = this.transform_arr[1] - 100
                this.transform_arr[2] = this.transform_arr[2] - 100
                this.transform_arr[3] = this.transform_arr[3] - 100       
            } else if (direction == 'right') {
                this.transform_arr[0] = this.transform_arr[0] - 100
                this.transform_arr[1] = this.transform_arr[1] + 100
                this.transform_arr[2] = this.transform_arr[2] + 100
                this.transform_arr[3] = this.transform_arr[3] + 100
            }
        },
        /**
         * 选中日期事件
         * @param  {[type]} date [选中日期]
         * @param  {[type]} flag [选中是否为本月日期]
         */
        selectDate (date, flag){
            // 不是本月日期不处理
            if(!flag) return
            // 是本月日期重置选中日期，并执行确认与关闭组件事件
            this.dateVal = date
            this.calendarconfirm()
            this.calendarclose()
        },
        // 日期盒子手指按下
        touchstartX (){
            const touchOne = event.changedTouches[0]
            iStartX = touchOne.pageX
            this.$refs.root.style.transition = '0ms'
            transform = Number(this.$refs.root.style.WebkitTransform.match(/translate3d\((\S*)%/)[1])
            iStartTranslateX = transform / 100 * this.$refs.root.offsetWidth
        },
        // 日期盒子手指拖动
        touchmoveX (){
            const iMoveX = event.changedTouches[0].pageX - iStartX
            this.$refs.root.style.WebkitTransform = this.$refs.root.style.transform = 'translate3d(' + (iStartTranslateX + iMoveX) + 'px,' + '0,0)'   
        },
        // 日期盒子手指离开
        touchendX (){
            let iMoveX = event.changedTouches[0].pageX - iStartX
            this.$refs.root.style.transition = '300ms'

            if ( (iMoveX < 0 && iMoveX < -100) || (iMoveX > 0 && iMoveX > 100) ) {
                // 拖动距离大于100px，拖动距离小于-100时执行上一月方法，大于100执行下一月方法
                if (iMoveX < 0) {
                    this.calendarBtn(3)
                } else {
                    this.calendarBtn(2)
                }
            } else {
                // 拖动距离小于100px，回归手指拖动前状态
                this.$refs.root.style.WebkitTransform = this.$refs.root.style.transform = 'translate3d(' + transform + '%,' + '0,0)'     
            }      
        }    
    }
}
</script>

<style scoped>
.yx-calendar-box{height: 300px;overflow: hidden;background: #fff;border-top: 1px solid #efefef;position: absolute;left: 0;right: 0;bottom: 0;z-index: 999;}

.yx-calendar-box{transition-property: transform, opacity;transform: translate3d(0, 100%, 0);opacity: 0;}
.yx-calendar-show{opacity: 1;transition-duration: 300ms;transform: translate3d(0, 0, 0);}
.yx-calendar-hide{opacity: 0;transition-duration: 300ms;transform: translate3d(0, 100%, 0);}

.yx-calendar-box .yx-calendar-bar{height: 44px;}
    .yx-calendar-box .yx-calendar-bars{float: left;display: -webkit-box;width: 50%;height: 100%;}
    .yx-calendar-box .yx-calendar-bar-btn{display: inline-block;width: 44px;height: 44px;}
    .yx-calendar-box .yx-calendar-current-value{-webkit-box-flex: 1;text-align: center;line-height: 44px;}
    .yx-calendar-box .yx-calendar-bar-btn i{display: block;width: 0;height: 0;border-top: 10px solid transparent;border-bottom: 10px solid transparent;margin: 11px;}
    .yx-calendar-box .yx-calendar-bar-btn-prev i{border-right: 20px solid #007AFF;}
    .yx-calendar-box .yx-calendar-bar-btn-next i{border-left: 20px solid #007AFF;}

.yx-calendar-box .yx-calendar-inner{height: 256px;}

.yx-calendar-box .yx-calendar-week-days{height: 20px;margin: 0;padding: 0;display: -webkit-box;background: #f7f7f7;}
    .yx-calendar-box .yx-calendar-week-days li{list-style: none;-webkit-box-flex: 1;text-align: center;line-height: 20px;font-size: 14px;}

.yx-calendar-box .yx-calendar-months{height: 236px;}
    .yx-calendar-box .yx-calendar-months-wrap{height: 100%;position: relative;-webkit-transition: 300ms;transition: 300ms;}
    .yx-calendar-box .yx-calendar-month{position: absolute;top: 0;bottom: 0;left: 0;right: 0;}
    .yx-calendar-box .yx-calendar-row{display: -webkit-box;height: 38px;border-top: 1px solid #efefef;}
    .yx-calendar-box .yx-calendar-row:first-child{border-top: none;}
    .yx-calendar-box .yx-calendar-day{-webkit-box-flex: 1;}
    .yx-calendar-box .yx-calendar-day span{display: block;width: 30px;line-height: 30px;margin: 4px auto;text-align: center;font-size: 14px;color: #3d4145}
    .yx-calendar-box .yx-calendar-day.yx-calendar-day-ash span{color: #ccc;}
    .yx-calendar-box .yx-calendar-day.yx-calendar-day-selected span{color: #fff;background: #007AFF;border-radius: 50%;}
    .yx-calendar-box .yx-calendar-day.yx-calendar-day-today span{background: #e3e3e3;border-radius: 50%;}

.yx-calendar-mask{position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 998;background: #000;opacity: 0;transition-property: opacity;}
.yx-calendar-mask-show{opacity: .5;transition-duration: 300ms;}
.yx-calendar-mask-hide{opacity: 0;transition-duration: 300ms;}    
</style>