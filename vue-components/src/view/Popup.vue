<template>
    <div class="popup">
        <h3>popup组件使用类型</h3>
        <button @click="openToast">toast default</button>
        <button @click="openToastTop">toast top</button>
        <button @click="openToastMiddle">toast middle</button>
        <button @click="openAlert">alert</button>
        <button @click="openConfirm">confirm</button>
        <button @click="openConfirm_2">confirm buttons</button>
        <button @click="openLoading">loading</button>
    </div>
</template>

<script>
import popup from '@/components/popup/Popup'

export default {
    name: 'popup',
    methods: {
        openToast (){
            popup({
                type: 'toast',
                msg: 'toast提示框'
            })
        },    
        openToastTop (){
            popup({
                type: 'toast',
                msg: 'toast提示框',
                position: 'top'
            })
        },
        openToastMiddle (){
            popup({
                type: 'toast',
                msg: 'toast提示框',
                position: 'middle'
            })
        },
        openAlert (){
            popup({
                type: 'alert',
                msg: 'alert提示框',
                confirm: () => {
                    popup({
                        type: 'toast',
                        msg: '您关闭了alert提示框'
                    })
                }
            })
        },
        openConfirm (){
            popup({
                type: 'confirm',
                msg: 'confirm提示框',
                cancel: () => {
                    popup({
                        type: 'toast',
                        msg: '您点击了取消'
                    })                    
                },
                confirm: () => {
                    popup({
                        type: 'toast',
                        msg: '您点击了确定'
                    })
                }
            })
        },
        openConfirm_2 (){
            popup({
                type: 'confirm',
                msg: 'confirm提示框',
                buttons: [{
                    name: '按钮1',
                    actions: function(){
                        popup({
                            type: 'toast',
                            msg: '您点击了按钮1'
                        })                        
                    }                    
                },{
                    name: '按钮2',
                    actions: function(){
                        popup({
                            type: 'toast',
                            msg: '您点击了按钮2'
                        })                        
                    }                    
                }]
            })            
        },
        openLoading (){
            // 缓存popop实例
            let instance = popup({type: 'loading'})
            setTimeout(() => {
                // popop组件提供close方法来手动销毁弹出框
                instance.close()
                popup({
                    type: 'toast',
                    msg: 'loading加载框关闭'
                })                
            },3000)
        }                          
    }
}
</script>

<style scoped>
button{display: block;margin: 20px auto;padding: 10px 20px;font-size: 16px;}
</style>
