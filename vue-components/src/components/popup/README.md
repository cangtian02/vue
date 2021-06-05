# vue-popup

> A vue popup component

> [live demo -->](https://cangtian02.github.io/popup/dist/index.html)

## 组件说明

该组件使用js实例化模式加载popup弹出框，每次只创建一次性的弹出框，实例以隐式创建 Vue 组件的方式在全局创建一个弹出框，并在消失时移除，所以同时只能操作一个弹出框。

## 配置说明

### type `string`
引用的类型，分别有：'toast'、'alert'、'confirm'、'loading'

### msg `string`
内容文本

### duration `number`
引用toast类型时，弹出框自动销毁时间，单位ms，默认时间2000ms

### position `string`
引用toast类型时，弹出框在屏幕的位置，默认在下方 可设置top、middle

### confirm `function`
调用alert或者confirm时点击确定按钮回调事件

### cancel `function`
调用aconfirm时点击取消按钮回调事件

### buttons `array`
调用aconfirm时自定义按钮，使用了该配置后confirm与cancel无效

### 引入方式

``` bash
import popup from '@/components/popup'
```

## 最佳实践

### toast

``` bash
    popup({
        type: 'toast',
        msg: 'toast提示框'
    })
```

### toast

``` bash
    popup({
        type: 'toast',
        msg: 'toast提示框',
        position: 'top'
    })
```

### toast

``` bash
    popup({
        type: 'toast',
        msg: 'toast提示框',
        position: 'middle'
    })
```

### alert

``` bash
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
```

### loading

``` bash
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
```

### confirm 默认按钮方式

``` bash
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
```

### confirm 自定义按钮方式

``` bash
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
```

