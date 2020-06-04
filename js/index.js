new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '1',
			bannerUrl: [],
			industry: {
				title: '',
				image: '',
				introduction: '',
				source: '',
				updateTime: ''
			}
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		loadBanner(){
			var that = this;
			axios.post(url + '/banner/selectAll')
				.then(function(res) {
//					console.log(res);
					if(res.success = true) {
						that.bannerUrl = res.data.data;
					} else {
						alert(res.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		loadData() {
			var that = this;
			axios.post(url + '/main/meau')
				.then(function(res) {
					console.log(res);
					if(res.success = true) {
						let dataTime = res.data.data.industry.list.updateTime;
						let times = that.unixTimeToDateTime(dataTime);
						res.data.data.industry.list['updateTime'] = times;
						that.industry = res.data.data.industry.list;
					} else {
						alert(res.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		unixTimeToDateTime(unixtime) {
			var now = new Date(unixtime * 1000); // 依情况进行更改 * 1
			y = now.getFullYear();
			m = now.getMonth() + 1;
			d = now.getDate();
			return (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
		},
	},
	mounted() {
		this.loadBanner();
		this.loadData();
	}
}).$mount('#app')