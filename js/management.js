var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '2',
			records: [],
			recordsList: [],
			recordsList: [],
			recordLength: [],
			pageNo: 1,
			pageSize: 5,
			isLogin: false,
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			//			console.log(key, keyPath);
		},

		bindTap(key, keyPath) {
			window.location.href = keyPath;
		},
		selectPoliticsList() {
			var that = this;
			axios.post(url + '/politics/selectPoliticsList', {
					pageNo: 1,
					pageSize: 1
				})
				.then(function(res) {
					// console.log(res);
					if (res.data.success = true) {
						that.records = res.data.data.records;
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		selectIndustryList() {
			var cookie = localStorage.getItem('cookie');
			if (cookie != null && cookie.length) {
				this.isLogin = true;
			} else {
				this.isLogin = false;
			}
			var that = this;
			axios.post(url + '/industry/selectIndustryList', {
					pageNo: that.pageNo,
					pageSize: that.pageSize
				})
				.then(function(res) {
					console.log(res);
					if (res.data.success = true) {
						that.recordLength = res.data.data.records;
						that.recordsList = that.recordsList.concat(res.data.data.records);
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		politics(id) {

			var that = this;
			axios.post(url + '/industry/selectIndustryById', {
					id: id
				})
				.then(function(res) {
					// console.log(res); 
					if (res.data.success = true) {
						_czc.push(['_trackEvent', '资讯', '查看行业资讯', '资讯', '1', 'news']);
						let record = res.data.data;
						let records = that.records;
						records.splice(0, records.length);
						records.push(record);
						console.log(that.records)
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		queryDetails() {
			var id = getQueryString('id');
			var that = this;
			axios.post(url + '/politics/selectPoliticsById', {
					id: id
				})
				.then(function(res) {
					// console.log(res); 
					if (res.data.success = true) {
						let record = res.data.data;
						let records = that.records;
						records.splice(0, records.length);
						records.push(record);
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		selectIndustry() {
			var id = getQueryString('id');
			var that = this;
			axios.post(url + '/industry/selectIndustryById', {
					id: id
				})
				.then(function(res) {
					// console.log(res); 
					if (res.data.success = true) {
						let record = res.data.data;
						let records = that.records;
						records.splice(0, records.length);
						records.push(record);
					} else {
						alert(res.data.msg)
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
		}
	},
	mounted() {
		this.selectIndustryList();
		var id = getQueryString('id');
		var status = getQueryString('status');
		if (id) {
			if (status) {
				this.selectIndustry();
			} else {
				this.queryDetails();
			}
		} else {
			this.selectPoliticsList();
		}

	}
}).$mount('#app')

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$('.industry_right').scroll(function() {
	var $this = $(this),
		viewH = $(this).height(), //可见高度
		contentH = $(this).get(0).scrollHeight, //内容高度
		scrollTop = $(this).scrollTop(); //滚动高度
	if (scrollTop / (contentH - viewH) >= 0.95) { //当滚动到距离底部5%时
		cont.pageNo++;
		// 这里加载数据..
		if (cont.recordLength.length <= cont.pageSize & cont.recordLength.length != 0) {
			cont.selectIndustryList();
		}
	}
});
