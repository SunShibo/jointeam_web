var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '1',
			bannerUrl: [],
			isLogin: false,
			industry: {
				title: '',
				image: '',
				introduction: '',
				source: '',
				updateTime: '',
				id: ''
			},
			pageNo: 1,
			pageSize: 3,
			serve: [],
			records: [],
			recordLength:[]
		};
	},
	methods: {
		indust(id, status) {
			window.location.href = 'management.html?id=' + id + '&status=' + status
		},
		mallDetails(id) {
			window.location.href = 'mallDetails.html?id=' + id
		},
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		loadBanner() {
			var that = this;
			axios.post(url + '/banner/selectAll')
				.then(function(res) {
					console.log(res);
					if (res.success = true) {
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
			var cookie = localStorage.getItem('cookie');
			if(cookie!=null && cookie.length){
				this.isLogin = true;
			}else{
				this.isLogin = false;
			}
			var that = this;
			axios.post(url + '/main/meau')
				.then(function(res) {
					//					console.log(res);
					if (res.success = true) {
						let dataTime = res.data.data.industry.list.updateTime;
						let times = that.unixTimeToDateTime(dataTime);
						res.data.data.industry.list['updateTime'] = times;
						that.industry = res.data.data.industry.list;
						that.serve = res.data.data.serve;
						if (that.serve.length > 3) {
							$('.mall').css('width', '1174px');
						}

					} else {
						alert(res.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		loadList() {
			var that = this;
			axios.post(url + '/industry/selectIndustryList', {
					pageNo: that.pageNo,
					pageSize: that.pageSize
				})
				.then(function(res) {
					// console.log(res);
					if (res.success = true) {
						that.recordLength = res.data.data.records;
						that.records = that.records.concat(res.data.data.records);
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
		this.loadList();
	}
}).$mount('#app')

$('.industry_right').scroll(function() {
	var $this = $(this),
		viewH = $(this).height(), //可见高度
		contentH = $(this).get(0).scrollHeight, //内容高度
		scrollTop = $(this).scrollTop(); //滚动高度
	if (scrollTop / (contentH - viewH) >= 0.95) { //当滚动到距离底部5%时
		cont.pageNo++;
		// 这里加载数据..
		if (cont.records.length <= cont.pageSize & cont.recordLength.length != 0) {
			cont.loadList();
		}
	}
});
