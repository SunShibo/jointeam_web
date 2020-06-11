var cont = new Vue({
	// el:'#app',
	data() {
		return {
<<<<<<< HEAD
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
=======
			activeIndex: 'template.html',
			eIndex:0,
			isLogin:false,
			card:[
				// {name:'质检报告'},
				// {name:'质检报告1'},
				// {name:'质检报告2'},
				// {name:'质检报告3'}
			],
			template:[
				// {temp:'质量验收模板'},
				// {temp:'质量验收模板1'},
				// {temp:'质量验收模板2'},
				// {temp:'质量验收模板3'}
			],
			itemTemp:[
				{name:'时间设计点击俺就'},
				{name:'分手的'},
				{name:'的热无若'}
			],
			pageNo:1,
			pageSize:100
>>>>>>> 9fa909db46bd021321c63d1c8523a7c6ad793bd7
		}

	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
<<<<<<< HEAD
		cutTab(index, typeId) {
=======
		bindTap(key, keyPath){
			window.location.href = keyPath;
		}
		,
		cutTab(index,typeId){
>>>>>>> 9fa909db46bd021321c63d1c8523a7c6ad793bd7
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
<<<<<<< HEAD
		downloadFile(path) {
=======
		downloadFile(path){
			_czc.push(['_trackEvent', '模板', '下载模板', '下载模板','1','template']);
>>>>>>> 9fa909db46bd021321c63d1c8523a7c6ad793bd7
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
