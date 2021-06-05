<template>
	<div class="home">
		<ul v-for="(item, i) in list" :key="i">
			<li @click="goDetail(item.id)">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		asyncData(store, route) {
			return store.dispatch('fetchList', {page: 1})
		},
		name: "home",
		data() {
			return {
				page: 1,
			}
		},
		computed: {
			list () {
				return this.$store.getters.getList
			},
		},
		mounted() {

		},
		methods: {
			goDetail(id) {
				this.$router.push({path: '/detail', query: {id}})
			}
		},
	}
</script>

<style scoped>
li {line-height: 2.4rem;padding-left: .6rem;border-bottom: .5px solid #eee;}
</style>
