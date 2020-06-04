new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '4',
			template:[
				{temp:'质量验收模板'},
				{temp:'质量验收模板3'}
			]
		}
		
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}).$mount('#app')


