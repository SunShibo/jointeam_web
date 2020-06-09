new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '2',
			records:[],
			recordsList:[],
			isLogin: false,
		};
	},
	methods: {
		handleSelect(key, keyPath) {
//			console.log(key, keyPath);
		},
		selectPoliticsList(){
			var that = this;
			axios.post(url + '/politics/selectPoliticsList',{
				pageNo:1,
				pageSize:1
			})
				.then(function(res) {
					console.log(res);
					if(res.data.success = true) {
						that.records = res.data.data.records;
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		selectIndustryList(){
			var cookie = localStorage.getItem('cookie');
			if(cookie!=null && cookie.length){
				this.isLogin = true;
			}else{
				this.isLogin = false;
			}
			var that = this;
			axios.post(url + '/industry/selectIndustryList',{
				pageNo:1,
				pageSize:5
			})
				.then(function(res) {
//					console.log(res);
					if(res.data.success = true) {
						that.recordsList = res.data.data.records;
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		politics(id){
			var that = this;
			axios.post(url + '/politics/selectPoliticsById',{
				id:id
			})
				.then(function(res) {
//					console.log(res);
					if(res.data.success = true) {
						let record = res.data.data;
						let records = that.records;
						records.splice(0,records.length);
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
	mounted(){
		this.selectPoliticsList();
		this.selectIndustryList();
	}
}).$mount('#app')
