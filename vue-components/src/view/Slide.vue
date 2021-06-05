<template>
	<div class="slide" id="slide">
		<Slide>
			<li><img src="../assets/1.jpg" /></li>
			<li><img src="../assets/2.jpg" /></li>
			<li><img src="../assets/3.jpg" /></li>
		</Slide>
	</div>
</template>

<script>
import Slide from '@/components/slide/Slide'

export default {
    name: 'scroll',
    components: { Slide }   
}
</script>

<style scoped>
li{list-style-type: none;}
</style>
