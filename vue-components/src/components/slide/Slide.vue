<template>
    <div class="yx-slide">
        <div class="yx-slide-content" ref="slide">
            <div class="yx-slide-group" ref='slideGroup'>
                <slot></slot>
            </div>
            <ul class="yx-slide-index">
                <li :class="{active: (currentPageIndex) === index }" v-for="(item, index) in dots" :key="index"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    props: {
        loop: {
            type: Boolean,
            default: true,
        },
        autoPlay: {
            type: Boolean,
            default: true,
        },
        interval: {
            type: Number,
            default: 3000
        },
        click: {
            type: Boolean,
            default: true
        },
        threshold: {
            type: Number,
            default: 0.3
        },
        speed: {
            type: Number,
            default: 400
        }
    },
    data (){
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    mounted (){
        this.update()
    },
    activated (){
        if (!this.slide) return
        this.slide.enable()
        let pageIndex = this.slide.getCurrentPage().pageX
        this.slide.goToPage(pageIndex, 0, 0)
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
            this._play()
        }
    },
    deactivated (){
        this.slide.disable()
        clearTimeout(this.timer)
    },
    beforeDestroy (){
        this.slide.disable()
        clearTimeout(this.timer)
    },
    methods: {
        update (){
            if (this.slide) {
                this.slide.destroy()
            }
            this.$nextTick(() => {
                this.init()
            })
        },
        next() {
            this.slide.next()
        },
        init (){
            clearTimeout(this.timer)
            this.currentPageIndex = 0
            this._setSlideWidth()
            this._initDots()
            this._initSlide()
            if (this.autoPlay) {
                this._play()
            } 
        },
        _setSlideWidth (){
            this.children = this.$refs.slideGroup.children
            let width = 0
            let slideWidth = this.$refs.slide.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                width += slideWidth
            }
            if (this.loop) {
                width += 2 * slideWidth
            }
            this.$refs.slideGroup.style.width = width + 'px'
        },
        _initSlide (){
            this.slide = new BScroll(this.$refs.slide, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: this.loop,
                    threshold: this.threshold,
                    speed: this.speed
                },
                bounce: false,
                click: this.click
            })

            this.slide.on('scrollEnd', this._onScrollEnd)

            this.slide.on('touchEnd', () => {
                if (this.autoPlay) {
                    this._play()
                }
            })

            this.slide.on('beforeScrollStart', () => {
                if (this.autoPlay) {
                    clearTimeout(this.timer)
                }
            })
        },
        _onScrollEnd (){
            let pageIndex = this.slide.getCurrentPage().pageX
            this.currentPageIndex = pageIndex
            if (this.autoPlay) {
                this._play()
            }
        },
        _initDots (){
            this.dots = new Array(this.children.length)
        },
        _play (){
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.slide.next()
            }, this.interval)
        } 
    }
}
</script>

<style scoped>
.yx-slide{width: 100%;height: 0;padding-bottom: 40.7143%;position: relative;}
	.yx-slide .yx-slide-content{position: absolute;left: 0;top: 0;right: 0;bottom: 0;overflow: hidden;}
    .yx-slide .yx-slide-group{display: flex;height: 100%;}
    .yx-slide .yx-slide-group li{flex: 1;}
    .yx-slide .yx-slide-group li a, .yx-slide .yx-slide-group li img {display: block;width: 100%;height: 100%;}
    .yx-slide .yx-slide-index{position: absolute;left: 0;right: 0;bottom: 0;padding: .15rem 0;text-align: right;}
    .yx-slide .yx-slide-index li{display: inline-block;width: .35rem;height: .35rem;border-radius: 50%;border: .05rem solid #fff;margin: 0 .15rem;}
    .yx-slide .yx-slide-index li.active{background: #fff;}
</style>
