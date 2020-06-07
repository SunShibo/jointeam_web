var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '1',
			template: [],
            records:[]
			
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		queryTypes() {
			var that = this;
			axios.post(url + '/server/queryTypes')
				.then(function(res) {
//					console.log(res);
					if(res.data.success = true) {
						that.template = res.data.data;
						let temp = res.data.data;
						let arr = [];
						temp.forEach(function(item,index){
							var childs = item.child;
							childs.forEach(function(items,index){
								arr.push(items.id)
							})
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
			axios.post(url + '/client/queryAll', {
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
			axios.post(url + '/client/queryAll', {
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
		customer(){
			window.location.href = 'customerDetails.html'
		}
	},
	mounted() {
		this.queryTypes();
	}
}).$mount('#app')