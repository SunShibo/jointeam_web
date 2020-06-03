new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '4'
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}).$mount('#app')


