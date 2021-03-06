var cont = new Vue({
	// el:'#app',
	data() {
		return {
			projectId: 0,
			staffId:0,
			activeIndex: '4',
			progressList: [],
			projectList: [],
			staffBO:{},
			activeIndex:"project_index.html",
			isLogin:false
		}

	},
	created(){
		this.projectId = getQueryVariable('projectId');
		this.staffId =  getQueryVariable('staffId');
	},
	mounted() {
		var cookie =  localStorage.getItem('cookie');
		if(cookie!=null && cookie.length){
			this.isLogin = true;
		}else{
			this.isLogin = false;
		}
		if(this.isLogin){
		this.initProject();
		this.initProgress();
		}else{
			window.location.href = "login.html";
		}
	}
	,
	methods: {
		goProjectDetail(id){
		
		}
		,
		bindTap(key, keyPath){
			window.location.href = keyPath;
		},
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		template_href(projectId,staffId) {
			window.location.href = './project_list.html?projectId=' + projectId+"&staffId="+staffId;
		}
		
		,
		initProject() {
			var vm = this;
			
			axios({
					url: url + '/project/selectProjectByUserId',
					method: 'POST',
					data: {
						pageNo: 1,
						pageSize: 1000,
						accomplishStatus:"having"
					},
					headers: {
						'Token': localStorage.getItem('cookie')
					}
				}).then(function(response) {
					
					if (response.data.success) {
						//formatTime
						let projectArr =  response.data.data.records;
						// for (let i = 0; i <= response.data.data.records.length; i++) {
						// 	let project = response.data.data.records[i];
						// 	projectArr.push({
						// 		projectId: project.projectId,
						// 		projectName: project.projectName,
						// 		title: project.title,
						// 		stuffName: project.stuffName,
						// 		image: project.image,
						// 		formatStartTime: project.formatStartTime
						// 	});
						// }
						vm.projectList = projectArr;
					} else {
						window.location.href = "./login.html";
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		initProgress() {
			var vm = this;
			axios({
					url: url + '/projectInfo/selectByProjectId',
					method: 'POST',
					data: {
						projectId: this.projectId,
						stuffId:this.staffId,
					},
					headers: {
						'Token': localStorage.getItem('cookie')
					}
				})
				.then(function(response) {
					// alert(response.data.msg);
					if (response.data.code == "00000") {
						let progressArr = response.data.data.projectInfoManageBOList;
						
						// for (let i = 0; i <= response.data.data.projectInfoManageBOList.length; i++) {
						// 	let project = response.data.data.projectInfoManageBOList[i];
						// 	alert("aaa:"+project.projectName);
						// 	progressArr.push({
						// 		projectId: project.projectId,
						// 		projectName: project.projectName,
						// 		title: project.title,
						// 		stuffName: project.stuffName,
						// 		image: project.image,
						// 		formatStartTime: project.formatStartTime,
						// 		startFormatDate:formatTime(project.startTime),
						// 		endFormatDate:formatTime(project.predictEndTime)
						// 	});
						// }
						
						// progressArr = progressArr.map(function(item){
						// 	item["startFormatDate"] = formatTime(item.startTime);
						// 	item["endFormatDate"] = formatTime(item.predictEndTime);
						// });
						
						for (let i = 0; i < progressArr.length; i++) {
						 	// progressArr[i]["startFormatDate"] = formatDate(progressArr[i].startTime);
						 	// progressArr[i]["endFormatDate"] = formatDate(progressArr[i].predictEndTime);
						 	progressArr[i]["formatDateTime"] = formatDateTime(progressArr[i].date);
						    let status =  progressArr[i].completionStatus;
							let tempText = "";
							if(status==="notStart"){
								tempText = "未开始"
							}else if(status==="having"){
								tempText = "进行中"
							}else{
								tempText = "已结束"
							}
							progressArr[i]["statusText"] = tempText;
						};
						vm.staffBO = response.data.data.staffBO;
						vm.progressList = progressArr;
					} else {
						window.location.href = "./login.html";
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	computed:{
		projectStartTime(){
			return formatDate(this.progressList[0].startTime);
		},
		projectEndTime(){
			return formatDate(this.progressList[0].predictEndTime);
		}
	}
}).$mount('#app')


$(function() {
	// cont.projectId = getQueryVariable('projectId');
	// cont.staffId = getQueryVariable('staffId');
	// // 初始化项目
	// cont.initProject();
	// // 初始化项目进度
	// cont.initProgress();
	
})
