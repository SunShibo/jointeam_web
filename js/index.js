new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '1',
			bannerUrl: [{
				url: 'images/banner_2.png'
			}, {
				url: 'images/banner_3.png'
			}, {
				url: 'images/banner_4.png'
			}]
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}).$mount('#app')
