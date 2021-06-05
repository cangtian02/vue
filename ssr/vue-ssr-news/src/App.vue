<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: "app",
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

		},
	}
</script>

<style>
	*{margin: 0;padding: 0;box-sizing: border-box;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);-webkit-touch-callout: none;}

	html{font-size: 20px;font-family: sans-serif,"Microsoft YaHei",微软雅黑;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;}
	body{background: #F2F4F5;font-size: .7rem;color: #343434;}
	html, body{height: 100%;position: relative;}

	@media only screen and (min-width: 400px) {
		html{font-size: 21.33333333px !important;}
	}
	@media only screen and (min-width: 414px) {
		html{font-size: 22.08px !important;}
	}
	@media only screen and (min-width: 480px) {
		html{font-size: 25.6px !important;}
	}

	ul,li{list-style-type: none;}
	i,em{font-style: normal;}
	input{outline: none;border: none;}
	a,a:active{text-decoration: none;color: #fff;}
</style>
