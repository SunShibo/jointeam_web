new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '3'
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}).$mount('#app')
