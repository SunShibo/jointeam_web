new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '1',
			currentPage: 1,
		};
	},
	methods: {
		handleSelect(key, keyPath) {
//			console.log(key, keyPath);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		}
	}
}).$mount('#app')
