new Vue({
	data() {
		return {
			activeIndex: '1',
			records: [],
			introd:[]
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			//			console.log(key, keyPath);
		},
		queryById() {
			var id = getQueryString('id');
			var that = this;
			axios.post(url + '/client/queryById', {
					id: id
				})
				.then(function(res) {
					// console.log(res);
					if (res.data.success = true) {
						that.introd = res.data.data;
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		queryTypes() {
			var that = this;
			axios.post(url + '/server/queryTypes')
				.then(function(res) {
					//					console.log(res);
					if (res.data.success = true) {
						that.template = res.data.data;
						let temp = res.data.data;
						let arr = [];
						temp.forEach(function(item, index) {
							arr.push(item.id)
						})
						that.query(arr[0], 0);
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		query(id, index) {
			var that = this;
			that.num = index;
			axios.post(url + '/client/queryAll', {
					typeId: id,
					pageSize: 4,
					pageNo: 1
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
		recos(id) {
			var that = this;
			axios.post(url + '/client/queryById', {
					id: id
				})
				.then(function(res) {
					// console.log(res);
					if(res.data.success = true) {
						let introds = res.data.data;
						that.introd = introds;
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.queryById();
		this.queryTypes();
	}
}).$mount('#app')

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
