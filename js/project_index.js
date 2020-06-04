var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '5',
			accomplishStatus: 'having',
			card:[
				{name:'进行中'},
				{name:'已完成'}
			],
			projectList: []
			/*projectList: [
				{projectId: 1, projectName: 'Low Cost Advertising', title: '技术现场勘查', stuffName: '负责人:张三', formatStartTime: '4月29日 星期三', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/XAs5BG_1590898805161.png'},
				{projectId: 2, projectName: 'Tips For Designing An', title: '技术现场勘查', stuffName: '负责人：李四', formatStartTime: '4月29日 星期三', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/K6r5hX_1590898943734.jpg'},
				{projectId: 3, projectName: 'Tips For Designing An', title: '技术现场勘查', stuffName: '负责人：王五', formatStartTime: '4月29日 星期三', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/8CkdH4_1590899169530.jpg'},
				{projectId: 4, projectName: 'Tips For Designing An', title: '技术现场勘查', stuffName: '负责人：赵柳', formatStartTime: '4月29日 星期三', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/XAs5BG_1590898805161.png'}
			]*/
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		template_href(projectId){
			window.location.href='./project_list.html?projectId=' + projectId;
		},
		initProject(){
			axios.post(url + '/project/selectProjectByUserId', {
				pageNo: 1, pageSize: 1000, accomplishStatus: cont.accomplishStatus
			})
			.then(function(response) {
				if(response.code == "00000"){
					let projectArr = [];
					for(let i = 0; i <= response.data.records.length; i++){
						let project = response.data.records[i];
						projectArr.push({projectId: project.projectId, projectName: project.projectName,
							title: project.title, stuffName: project.stuffName, image: project.image,
							formatStartTime: project.formatStartTime});
					}
					cont.projectList = projectArr;
				}else{
					window.location.href = "./login.html";
				}
			})
			.catch(function(error) {
				console.log(error);
			});
		}
	}
}).$mount('#app')

var height = 138*cont.projectList.length;
$('.card_temp').css('height',height)

$('.card_list_left:first').addClass('light_greycolor');
$('.card_img:first').attr('src','images/right_2.png');
$('.cards_t:first').addClass('temps').siblings('div').removeClass('temps');

$('.card_list_left').click(function(){
	var index = $(this).index();
	$(this).siblings('div').removeClass('light_greycolor');  // 删除其他兄弟元素的样式
    $(this).addClass('light_greycolor');
	
	$(this).find('img').attr('src','images/right_2.png');
	$(this).siblings().find('img').attr('src','images/right_1.png');
	
	$('.cards_t').eq(index).addClass('temps').siblings('div').removeClass('temps');

	if(index == 0){  // 进行中
		cont.accomplishStatus = 'having';
	}else if(index == 1){  // 已完成
		cont.accomplishStatus = 'finished';
	}
	cont.initProject();
})


$(function(){
	cont.initProject();
})