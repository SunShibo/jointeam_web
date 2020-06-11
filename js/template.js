var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '4',
			eIndex: 0,
			isLogin: false,
			card: [],
			template: [],
			itemTemp: [],
			pageNo: 1,
			pageSize: 100,
			height:'',
			height_h:''
		}

	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		cutTab(index, typeId) {
			this.eIndex = index;
			this.queryTemplateList(typeId);
			var heights = $('.cards_t').height();
			if (heights > this.height_h) {
				this.height = heights;
			}
		},
		queryTemplateList(typeId) {
			var that = this;
			axios.post(url + "/template/queryTemplate", {
				typeId: typeId,
				pageNo: that.pageNo,
				pageSize: that.pageSize
			}).then((res) => {
				let tempList = res.data.data.records;
				for (let i = 0; i < tempList.length; i++) {
					let type = tempList[i].name.split(".")[1];
					let image = "";
					if (type == "pdf") {
						image = "images/word_2.png";
					} else if (type == "docx") {
						image = "images/word_1.png";
					} else if (type == "xlsx") {
						image = "images/word_3.png";
					} else {
						image = "images/word_4.png";
					}
					tempList[i]["image"] = image;
				}
				that.template = tempList;
				var height_s = this.template.length;
				$('.card_temp').css('height', 170*height_s/2);
			});
		},
		downloadFile(path) {
			window.open(path);
		},

	},
	created() {
		var cookie = localStorage.getItem('cookie');
		if (cookie != null && cookie.length) {
			this.isLogin = true;
		} else {
			this.isLogin = false;
		}
		var that = this;
		axios.post(url + '/template/queryType')
			.then(function(res) {
				let tempTypeList = res.data.data;
				that.card = tempTypeList;
				that.queryTemplateList(that.card[0].typeId);
			})
			.catch(function(error) {
				console.log(error);
			});
	}
}).$mount('#app')
