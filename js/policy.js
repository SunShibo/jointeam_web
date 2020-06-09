new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '1',
			politicsList: [],
			pageNo: 1,
			pageSize: 1000,
			activeIndex: '1',
			currentPage: 1,


		};
	},
	methods: {
		handleSelect(key, keyPath) {
			//			console.log(key, keyPath);
		},
	},
	computed: {
		getTop() {
			return this.politicsList[0];
		},
		getThird() {
			return this.politicsList.slice(1, 4);
		},
		getEnd() {
			return this.politicsList.slice(4);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		}

	},
	created() {
		var that = this;
		//politics/selectPoliticsList
		axios.post(url + "/politics/selectPoliticsList", {
			pageNo: this.pageNo,
			pageSize: this.pageSize
		}).then((res) => {
			let tempList = res.data.data.records;

			for (let i = 0; i < tempList.length; i++) {
				//console.log(formatTime(tempList[i].updateTime));
				tempList[i]["formatDate"] = formatTime(tempList[i].updateTime);
			}
			// tempList =  tempList.map(function(item){
			// 	item["formatDate"] = formatTime(item.updateTime);
			// });
			that.politicsList = tempList;



			//alert(typeof that.politicsList);

		});
	}
}).$mount('#app')
