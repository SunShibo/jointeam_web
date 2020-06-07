var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '2',
			template: [],
			num: 0,
			records:[]
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		mallDetails(id) {
			window.location.href = 'mallDetails.html?id='+id
		},
		queryTypes() {
			var that = this;
			axios.post(url + '/server/queryTypes')
				.then(function(res) {
//					console.log(res);
					if(res.data.success = true) {
						that.template = res.data.data;
						that.mouth();
						let temp = res.data.data;
						let arr = [];
						temp.forEach(function(item,index){
							var childs = item.child;
							childs.forEach(function(items,index){
								arr.push(items.id)
							}
						})
						that.query(arr[0],1)
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
			axios.post(url + '/server/query', {
					typeId: id,
					pageSize: 4,
					pageNo: 1
				})
				.then(function(res) {
//					console.log(res);
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
		querys(items, index) {
			var id = '';
			var itemList = items.child;
			itemList.forEach(function(item,index){
				id = item.id;
			})
			console.log(itemList)
			var that = this;
			that.num = index;
			axios.post(url + '/server/query', {
					typeId: id,
					pageSize: 4,
					pageNo: 1
				})
				.then(function(res) {
//					console.log(res);
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
		mouth() {
			var that = this;
			var temp = that.template;
			var arr = [];
			temp.forEach(function(item, index) {
				let temps = item.child.length;
				arr.push(temps);
			})
			var ma4 = Math.max.apply(null, arr);
			//			console.log(ma4);
			var height = 280 * ma4;
			$('.card_temp').css('height',height);
		}
	},
	mounted() {
		this.queryTypes();
	}
}).$mount('#app')