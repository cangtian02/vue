<template>  
	<div class="ct-popup">

        <div class="ct-popup-toast" v-if="showType == 1" 
            :class="{
                'ct-popup-show': popupShow,
                'ct-popup-hide': !popupShow, 
                'top': position == 'top',
                'middle': position == 'middle',
                'bottom': position == 'bottom'
            }"
        >
            {{ msg }}
        </div>

        <div class="ct-popup-alert" v-if="showType == 2" :class="{'ct-popup-show': popupShow,'ct-popup-hide': !popupShow}">
            <div class="ct-popup-inner">{{ msg }}</div>
            <div class="ct-popup-btn-box">
                <div class="ct-popup-btn" @click="confirmFun">确定</div>
            </div>              
        </div>

        <div class="ct-popup-alert" v-if="showType == 3" :class="{'ct-popup-show': popupShow,'ct-popup-hide': !popupShow}">
            <div class="ct-popup-inner" v-html="msg"></div>
            <div class="ct-popup-btn-box">
                <div class="ct-popup-btn" v-for="(item, index) in buttons" :key="index" @click="item.actions">{{ item.name }}</div>
            </div>
        </div>

        <div class="ct-popup-loding" v-if="showType == 4" :class="{'ct-popup-show': popupShow,'ct-popup-hide': !popupShow}">
            <i></i><em></em>
        </div>

        <div class="ct-popup-mask" 
            v-if="showType == 2 || showType == 3 || showType == 4" 
            :class="{'ct-popup-mask-show': popupShow,'ct-popup-mask-hide': !popupShow}">
        </div>

	</div> 
</template>

<script>
export default {
    data (){
        return {
            msg: '',
            position: '',
            confirmFun: function(){},
            buttons: [],
            showType: -1,
            popupShow: false
        }
    }
}
</script>

<style scoped>
.ct-popup-toast, 
.ct-popup-alert,
.ct-popup-loding{position: fixed;left: 50%;z-index: 99999;transition-property: transform, opacity;transform: translate3d(-50%,-50%, 0) scale(0);opacity: 0;}

.ct-popup-toast{padding: 0 15px;line-height: 32px;color: #fff;text-align: center;font-size: 12px;white-space:nowrap;background: #4F4E4E;border-radius: 5px;}
    .ct-popup-toast.top{top: 50px;}
    .ct-popup-toast.middle{top: 50%;margin-top: -16px;}
    .ct-popup-toast.bottom{bottom: 50px;}

.ct-popup-alert{width: 240px;border-radius: 5px;background: #E8E8E8;top: 50%;}
    .ct-popup-alert .ct-popup-inner{padding: 20px 5px;color: #3d4145;text-align: center;font-size: 14px;}

.ct-popup-btn-box{display: flex;}
    .ct-popup-btn{flex: 1;color: #349ADB;font-size: 14px;text-align: center;line-height: 40px;border-top: 1px solid #B5B5B5;border-right: 1px solid #B5B5B5;}
    .ct-popup-btn:last-child{border-right: none;}

.ct-popup-loding{width: 60px;height: 60px;background: #000;border-radius: 10px;top: 50%;}
    .ct-popup-loding em{width: 32px;height: 32px;border-radius: 50%;border: 2px solid #fff;position: absolute;top: 14px;left: 14px;z-index: 1;}
    .ct-popup-loding i{width: 32px;height: 32px;position: absolute;top: 14px;left: 14px;z-index: 2;}
    .ct-popup-loding i:after{content: '';width: 10px;height: 10px;background: #000;position: absolute;right: -6px;top: 10px;}
    .ct-popup-loding i{animation: loding 1s linear infinite;}
    @keyframes loding{
        to {
            transform: rotate(360deg);
        }
    }

.ct-popup-show{opacity: 1;transition-duration: 300ms;transform: translate3d(-50%,-50%, 0) scale(1);}
.ct-popup-hide{opacity: 0;transition-duration: 300ms;transform: translate3d(-50%,-50%, 0) scale(0);}

.ct-popup-mask{position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 99998;background: #000;opacity: 0;transition-property: opacity;}
.ct-popup-mask-show{opacity: .5;transition-duration: 300ms;}
.ct-popup-mask-hide{opacity: 0;transition-duration: 500ms;}
</style>