var cont = new Vue({
	// el:'#app',
	data() {
		return {
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
		}
		
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		bindTap(key, keyPath){
			window.location.href = keyPath;
		}
		,
		cutTab(index,typeId){
			this.eIndex = index;
			this.queryTemplateList(typeId);
		},
		queryTemplateList(typeId){
			var that = this;
			axios.post(url+"/template/queryTemplate",{
				typeId:typeId,
				pageNo:that.pageNo,
				pageSize:that.pageSize
			}).then((res)=>{
				let tempList = res.data.data.records;
				for(let i =0;i<tempList.length;i++){
					let type = tempList[i].name.split(".")[1];
					let image = "";
					if(type=="pdf"){
					       image ="images/word_2.png";
					      }else if(type=="docx"){
					       image = "images/word_1.png";
					      }else if(type=="xlsx"){
					       image = "images/word_3.png";
					      }else{
					      image = "images/word_4.png";
					      }
						  tempList[i]["image"] = image;
				}
				that.template = tempList;
			});
		},
		downloadFile(path){
			_czc.push(['_trackEvent', '模板', '下载模板', '下载模板','1','template']);
			window.open(path);
		}
		,
		
	},
	created(){
		var cookie = localStorage.getItem('cookie');
		if(cookie!=null && cookie.length){
			this.isLogin = true;
		}else{
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
// var height = 138*cont.itemTemp.length;
// $('.card_temp').css('height',height)

// $('.card_list_left:first').addClass('light_greycolor');
// $('.card_img:first').attr('src','images/right_2.png');
// $('.cards_t:first').addClass('temps').siblings('div').removeClass('temps');

// $('.card_list_left').click(function(){
// 	var index = $(this).index();
// 	$(this).siblings('div').removeClass('light_greycolor');  // 删除其他兄弟元素的样式
//     $(this).addClass('light_greycolor'); 
	
	
// 	$(this).siblings().find('img').attr('src','images/right_1.png');
// 	//$(this).find('img').attr('src','images/right_2.png');
// 	$('.cards_t').eq(index).addClass('temps').siblings('div').removeClass('temps');
// })


