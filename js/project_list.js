var cont = new Vue({
	// el:'#app',
	data() {
		return {
			projectId : '',
			activeIndex: '4',
			progressList: [{title: '技术现场勘查', stuffName: '负责人:张三', formatStartTime: '4月29日 星期三', status: 'finished', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/XAs5BG_1590898805161.png'},
				{title: '技术现场勘查', stuffName: '负责人：李四', formatStartTime: '4月29日 星期三', status: 'finished', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/K6r5hX_1590898943734.jpg'},
				{title: '技术现场勘查', stuffName: '负责人：王五', formatStartTime: '4月29日 星期三', status: 'having', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/8CkdH4_1590899169530.jpg'},
				{title: '技术现场勘查', stuffName: '负责人：赵柳', formatStartTime: '4月29日 星期三', status: 'having', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/XAs5BG_1590898805161.png'}
			],
			projectList: [
				{projectId: 1, projectName: 'Low Cost Advertising', title: '技术现场勘查', stuffName: '负责人:张三', formatStartTime: '4月29日 星期三', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/XAs5BG_1590898805161.png'},
				{projectId: 2, projectName: 'Tips For Designing An', title: '技术现场勘查', stuffName: '负责人：李四', formatStartTime: '4月29日 星期三', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/K6r5hX_1590898943734.jpg'},
				{projectId: 3, projectName: 'Tips For Designing An', title: '技术现场勘查', stuffName: '负责人：王五', formatStartTime: '4月29日 星期三', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/8CkdH4_1590899169530.jpg'},
				{projectId: 4, projectName: 'Tips For Designing An', title: '技术现场勘查', stuffName: '负责人：赵柳', formatStartTime: '4月29日 星期三', image: 'http://zjtc-bucket-01.oss-cn-beijing.aliyuncs.com/wxapp/XAs5BG_1590898805161.png'}
			]
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
				pageNo: 1, pageSize: 4, accomplishStatus: cont.accomplishStatus
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
		},
		initProgress(){
			axios.post(url + '/project/selectProjectByUserId', {
				pageNo: 1, pageSize: 4, accomplishStatus: cont.accomplishStatus
			})
			.then(function(response) {
				if(response.code == "00000"){
					let progressArr = [];
					for(let i = 0; i <= response.data.records.length; i++){
						let project = response.data.records[i];
						progressArr.push({projectId: project.projectId, projectName: project.projectName,
							title: project.title, stuffName: project.stuffName, image: project.image,
							formatStartTime: project.formatStartTime});
					}
					cont.progressList = progressArr;
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


$(function () {
	cont.projectId = projectId;
	console.log("projectId" + projectId);
	// 初始化项目
	cont.initProject();
	// 初始化项目进度
	cont.initProgress();
})