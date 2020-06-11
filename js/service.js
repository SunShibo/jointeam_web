var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '2',
			template: [],
			num: 0,
			records: [],
<<<<<<< HEAD
			height_s:[]
=======
			eIndex: -1,
>>>>>>> 9fa909db46bd021321c63d1c8523a7c6ad793bd7
		}
	},
	/* computed: {
		getStart: {
			get: function() {},
			set: function(typeId) {
				let tempList = [];
				for (var i = 0; i < this.records.length; i++) {
					if (this.records[i].typeId == typeId) {
						tempList.push(this.records[i]);
						if(index==4){
							
						}
					}
				}
				return tempList;
			}

		}
	}, */
	methods: {
		getStart(typeId){
			var that = this;
			let tempList = [];
			for (let i = 0; i < that.records.length; i++) {
				if (that.records[i].typeId == typeId) {
					tempList.push(that.records[i]);
					if(tempList.length==4){
						break;
					}
				}
			}
			//console.log("chenLIst:"+that.records.length);
			return tempList;
		},
		getEnd(typeId){
			var that = this;
			let tempList = [];
			for (let i = 0; i < that.records.length; i++) {
				if (that.records[i].typeId == typeId) {
					tempList.push(that.records[i]);
				}
			}
			
			let tempList02 = [];
			for (let i = 0; i < tempList.length; i++) {
				 if(i>4){
					tempList02.push(tempList[i]);
				}
			}
			
			//console.log("chenLIst:"+tempList.length);
			return tempList02;
		}
		,
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		seeMore(id) {
			if (id == this.eIndex) {
				this.eIndex = -1;
			} else {
				this.eIndex = id;
			}
		},
		mallDetails(id) {
			window.location.href = 'mallDetails.html?id=' + id
		},

		//查询大类型
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
						pageSize: 1000,
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
<<<<<<< HEAD
			$('.card_temp').css('height', 280 * items.child.length);
			
=======

>>>>>>> 9fa909db46bd021321c63d1c8523a7c6ad793bd7
			queryList.forEach(function(item, index) {
				axios.post(url + '/server/query', {
						typeId: item,
						pageSize: 10000,
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

<<<<<<< HEAD
=======

var height = $('.cards_t').height();
$('.card_temp').css('height', height);

$('.card_list_left').click(function() {
	var heights = $('.cards_t').eq(index).height();
	if (heights > height) {
		$('.card_temp').css('height', heights)
	}
})
>>>>>>> 9fa909db46bd021321c63d1c8523a7c6ad793bd7
