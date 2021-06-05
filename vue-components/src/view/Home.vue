<template>
	<div id="home">
		<h3>基于vue的各种组件</h3>
        <section>
            <li><router-link to="/popup">popup</router-link></li>
            <li><router-link to="/calendar">calendar</router-link></li>
            <li><router-link to="/itemSlide">itemSlide</router-link></li>
            <li><router-link to="/scroll">scroll</router-link></li>
            <li><router-link to="/slide">slide</router-link></li>
            <li><router-link to="/keyboard">keyboard</router-link></li>
        </section>
	</div>
</template>

<script>
export default {
	name: 'home'
}
</script>

<style scoped>
section{display: flex;flex-wrap: wrap;margin: 0 10px;}
    section li{list-style-type: none;width: 33.3333%;padding: 0 10px 10px 0;line-height: 40px;text-align: center;}
    section a{display: block;text-decoration: none;color: #343434;border: 1px solid #3434;border-radius: 5px;}
</style>
