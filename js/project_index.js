var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '5',
			isLogin:false,
			accomplishStatus: 'having',
			card: [{
					name: '进行中'
				},
				{
					name: '已完成'
				}
			],
			 projectList: []
			
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		template_href(projectId,staffId) {
			if (this.accomplishStatus = 'having') {
				window.location.href = './project_list.html?projectId=' + projectId+"&staffId="+staffId;
			} else {
				window.location.href = './customerDetails.html?projectId=' + projectId;
			}
		},
		initProject() {
			var cookie =  localStorage.getItem('cookie');
			if(cookie!=null && cookie.length){
				this.isLogin = true;
			}else{
				this.isLogin = false;
			}
			
			if(this.isLogin){
				var vm = this;
				axios({
						url: url + '/project/selectProjectByUserId',
						method: 'POST',
						data: {
							pageNo: 1,
							pageSize: 1000,
							accomplishStatus: vm.accomplishStatus
						},
						headers: {
							'Token': cookie
						}
					})
					.then(function(response) {
						if (response.data.success) {
							console.log(response.data.data.records)
							var projectArr = [];
							for (var i = 0; i < response.data.data.records.length; i++) {
								var project = response.data.data.records[i];
								projectArr.push({
									staffId:project.staffId,
									projectId: project.projectId,
									projectName: project.projectName,
									title: project.title,
									stuffName: project.stuffName,
									image: project.image,
									formatStartTime: project.formatStartTime
								});
							}
							vm.projectList = projectArr;
						} else {
							window.location.href = "./login.html";
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}else{
				window.location.href = "./login.html";
			}
			
			
		}
	}
}).$mount('#app')

var height = 138 * cont.projectList.length;
$('.card_temp').css('height', height)

$('.card_list_left:first').addClass('light_greycolor');
$('.card_img:first').attr('src', 'images/right_2.png');
$('.cards_t:first').addClass('temps').siblings('div').removeClass('temps');

$('.card_list_left').click(function() {
	var index = $(this).index();
	$(this).siblings('div').removeClass('light_greycolor'); // 删除其他兄弟元素的样式
	$(this).addClass('light_greycolor');

	$(this).find('img').attr('src', 'images/right_2.png');
	$(this).siblings().find('img').attr('src', 'images/right_1.png');

	$('.cards_t').eq(index).addClass('temps').siblings('div').removeClass('temps');

	if (index == 0) { // 进行中
		cont.accomplishStatus = 'having';
	} else if (index == 1) { // 已完成
		cont.accomplishStatus = 'finished';
	}
	cont.initProject();
})


$(function() {
	cont.initProject();
})
