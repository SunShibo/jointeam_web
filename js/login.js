new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '6',
			phone:'',
			password:'',
			checked: true
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		onSubmit(){
			console.log('submit!');
		}
	}
}).$mount('#app')
