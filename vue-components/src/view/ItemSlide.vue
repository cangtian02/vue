<template>
	<div class="itemSlide" id="itemSlide">
        <h3>默认操作按钮</h3>
        <li v-for="(item, index) in list" :key="index">
            <ItemSlide @handle="handle(index)" :status="index != 0">
                <div class="item">{{ item.name }}</div>
            </ItemSlide>
        </li>

        <h3>自定义操作按钮 (使用默认背景色)</h3>
        <li v-for="(item, index) in list" :key="index + 2">
            <ItemSlide :buttons="buttons1" :sub="index" @handle="handleArr">
                <div class="item">{{ item.name }}</div>
            </ItemSlide>
        </li>

        <h3>自定义操作按钮 (使用自定义背景色)</h3>
        <li v-for="(item, index) in list" :key="index + 4">
            <ItemSlide :buttons="buttons2" :sub="index" @handle="handleArr">
                <div class="item">{{ item.name }}</div>
            </ItemSlide>
        </li>
	</div>
</template>

<script>
import ItemSlide from '@/components/itemSlide/ItemSlide'

export default {
    name: 'itemSlide',
    data (){
        return {
            list: [
                { name: '第一个列表' },
                { name: '第二个列表' }
            ],
            buttons1: [
                { name: '编辑' },
                { name: '加入' },
                { name: '删除' }
            ],
            buttons2: [
                { name: '编辑', color: '#52A0D1' },
                { name: '加入', color: '#67E889' },
                { name: '删除', color: '#7640D6' }
            ]
        }
    },
    components: { ItemSlide },
    methods: {
        handle (i){
            console.log(i)
        },
        handleArr (data){
            console.log(data)
        }
    }
}
</script>

<style scoped>
li{list-style-type: none;line-height: 40px;border-bottom: 1px solid #e4e4e4;padding-left: 10px;}
</style>
