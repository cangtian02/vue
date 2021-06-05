<template>
    <div class="yx-scroll" ref="scrollWarp">

        <!-- scroll盒子 -->
        <div class="yx-scroll-box">

            <!-- 下拉刷新提示 -->
            <div class="yx-pull-warp yx-pullDwon-warp" v-if="isOpenPullDownRefresh">{{ pullDownText }}</div>

            <!-- 主体内容 -->
            <div class="yx-slot" ref="scrollSlot">
                <slot></slot>
            </div>

            <!-- 上拉加载提示 -->
            <div class="yx-pull-warp yx-pullUp-warp" v-if="isOpenPullUpRefresh">{{ pullUpText }}</div>

        </div>

    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'yx-scroll',
    props: {
        // 列表数据，用于watch监听，实现数据更新后的效果
        data: {
            type: Array,
            default: null
        },
        // 当数据刷新后，刷新scroll的延迟时间
        refreshDelay: {
            type: Number,
            default: 20
        },
        // 是否开启点击事件
        click: {
            type: Boolean,
            default: true
        },
        // 是否开启下拉刷新
        isOpenPullDownRefresh: {
            type: Boolean,
            default: true
        },
        // 是否开启上拉加载
        isOpenPullUpRefresh: {
            type: Boolean,
            default: true
        }
    },
    data (){
        return {
            pullHeight: 40, // 刷新提示dom的高度
            pullDownText: '下拉刷新', // 下拉刷新提示文字
            pullUpText: '上拉加载',  // 上拉加载提示文字
            isPullingDown: false,  // 是否处于下拉刷新状态
            isPullingUp: false  // 是否处于上拉加载状态
        }
    },
    mounted (){
        setTimeout(() => {
            this.initScroll()
        }, 20)
    },
    updated (){
        // 当yx-scroll-box高度小于外层盒子高度时设置yx-scroll-box最小高度，因主体内容高度不足外层盒子高度时，scroll将失效
        this.$refs['scrollSlot'].style.minHeight = this.$refs['scrollWarp'].offsetHeight + 'px'
    },
    methods: {
        initScroll (){
            // 下拉刷新配置
            let pullDownRefresh = this.isOpenPullDownRefresh ? {threshold: this.pullHeight, stop: this.pullHeight} : this.isOpenPullDownRefresh

            // 上拉加载配置
            let pullUpLoad = this.isOpenPullUpRefresh ? {threshold: this.pullHeight, stop: this.pullHeight} : this.isOpenPullUpRefresh

            // 初始化scroll
            this.scroll = new BScroll(this.$refs['scrollWarp'], {
                click: this.click,
                pullDownRefresh: pullDownRefresh,
                pullUpLoad: pullUpLoad
            })

            // 下拉刷新初始化
            if(this.isOpenPullDownRefresh) {
                this.initpullDownRefresh()
            }

            // 上拉加载初始化
            if(this.isOpenPullUpRefresh) {
                this.initpullUpLoad()
            }
        },
        // 下拉刷新初始化
        initpullDownRefresh (){
            // 监控scroll的偏移Y轴值，在不处于下拉刷新的时候，当小于提示dom高度后更改提示内容，反之回到初始内容
            this.scroll.on('scroll',(pos) => {
                if(!this.isPullingDown) {
                    pos.y > this.pullHeight ? this.pullDownText = '释放刷新' : this.pullDownText = '下拉刷新'
                }
            })

            this.scroll.on('pullingDown',() => {
                this.isPullingDown = true
                if(this.isPullingDown) {
                    this.pullDownText = '数据刷新中...'
                }
                this.$emit('pullingDown')
            })
        },
        // 上拉加载初始化
        initpullUpLoad (){
            this.scroll.on('pullingUp',() => {
                this.isPullingUp = true
                if(this.isPullingUp) {
                    this.pullUpText = '数据加载中...'
                }
                this.$emit('pullingUp')
            })            
        },
        // 组件更新  flag == 0  父组件调用当列表加载完使用，显示暂无更多数据  flag == 1正常数据更新操作
        forceUpdate (flag = 0){
            this.pullUpText = '上拉加载'
            if(this.isOpenPullDownRefresh && this.isPullingDown) {   // 下拉刷新
                this.scroll.finishPullDown()
                this.isPullingDown = false
                this.pullDownText = '下拉刷新'
            } else if (this.isOpenPullUpRefresh && this.isPullingUp) {   // 上拉加载
                this.scroll.finishPullUp()
                this.isPullingUp = false
                this.pullUpText = flag == 0 ? '我可是有底线的' : '上拉加载'
            }
            this.scroll && this.scroll.refresh()
        },
        // 重新计算
        refresh() {
            setTimeout(() => {
                this.scroll && this.scroll.refresh()
            }, 20)
        }
    },
    watch: {
        data (){  // 监控data数据变化进行组件更新
            setTimeout(() => {
                this.forceUpdate(1)
            }, this.refreshDelay)
        }
    }
}
</script>

<style scoped>
.yx-scroll{position: absolute;left: 0;top: 0;right: 0;bottom: 0;overflow: hidden;}
    .yx-pull-warp{height: 40px;line-height: 40px;text-align: center;font-size: 14px;}
    .yx-pullDwon-warp{margin-top: -40px;}
</style>
