var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '2',
			template: [],
			num: 0,
			records: [],
			height_s:[]
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		mallDetails(id) {
			window.location.href = 'mallDetails.html?id=' + id
		},
		queryTypes() {
			var that = this;
			axios.post(url + '/server/queryTypes')
				.then(function(res) {
					// console.log(res);
					if (res.data.success = true) {
						that.template = res.data.data;
						// that.mouth();
						let temp = res.data.data;
						let arr = [];
						let height_h = [];
						let tempList = temp[0].child;
						tempList.forEach(function(item, index) {
							arr.push(item.id);
							height_h.push(item)
						})
						that.height_s = height_h;
						$('.card_temp').css('height', 280 * that.height_s.length);
						that.query(arr, 0);
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		query(ids, index) {
			var that = this;
			that.num = index;

			var queryList = ids;
			var records = [];

			queryList.forEach(function(item, index) {
				axios.post(url + '/server/query', {
						typeId: item,
						pageSize: 4,
						pageNo: 1
					})
					.then(function(res) {
						// console.log(res);
						if (res.data.success = true) {
							var recordsList = res.data.data.records;
							recordsList.forEach(function(item, index) {
								records.push(item);
							})
							that.records = records;
							// console.log(records)
						} else {
							alert(res.data.msg)
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			})

		},
		querys(items, index) {
			var id = [];
			var that = this;

			var itemList = items.child;
			itemList.forEach(function(item, index) {
				id.push(item.id)
			})

			that.num = index;
			var queryList = id;
			var records = [];
			$('.card_temp').css('height', 280 * items.child.length);
			
			queryList.forEach(function(item, index) {
				axios.post(url + '/server/query', {
						typeId: item,
						pageSize: 4,
						pageNo: 1
					})
					.then(function(res) {
						// console.log(res);
						if (res.data.success = true) {
							var recordsList = res.data.data.records;
							recordsList.forEach(function(item, index) {
								records.push(item);
							})
							that.records = records;
						} else {
							alert(res.data.msg)
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			})
		}
	},
	mounted() {
		this.queryTypes();
	}
}).$mount('#app')

