<template>
	<div class="scroll" id="scroll">
        <Scroll ref="scroll" :data="list" @pullingDown="pullingDown" @pullingUp="pullingUp">
            <ul class="list">
                <li v-for="(item, index) in list" :key="index">
                    {{ item.name }} {{ index }}
                </li>
            </ul>
        </Scroll>
	</div>
</template>

<script>
import Scroll from '@/components/scroll/Scroll'

export default {
    name: 'scroll',
    data (){
        return {
            list: [],
            step: 0
        }
    },
    components: { Scroll },
    created (){
        this.getList()
    },
    methods: {
        getList (){
            setTimeout(() => {
                this.step++
                for(let i = 0; i < 15; i++) {
                    this.list.push({
                        name: '列表'
                    })
                }
            }, 1000)
        },
        // 下拉刷新
        pullingDown (){
            this.step = 0
            this.list.length = 0
            this.getList()
        },
        // 上拉加载
        pullingUp (){
            if(this.step == 2) {
                this.$refs['scroll'].forceUpdate()
            } else {
                this.getList()
            }
        }
    }    
}
</script>

<style scoped>
.scroll{position: fixed;top: 0;bottom: 0;left: 0;right: 0;overflow: hidden;}
    .list li{list-style-type: none;line-height: 60px;padding-left: 10px;color: #343434;border-bottom: 1px solid #000;}
</style>
