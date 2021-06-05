<template>
	<div class="detail" v-html="detail.detail"></div>
</template>

<script>
	export default {
		asyncData(store, route) {
			return store.dispatch('fetchDetail', {id: route.query.id})
		},
		name: "detail",
		data() {
			return {

			}
		},
		computed: {
			detail() {
				return this.$store.getters.getDetail
			},
		},
		mounted() {
			
		},
		methods: {

		},
	}
</script>

<style>
.detail img{max-width: 100% !important;height: auto !important;}
</style>
