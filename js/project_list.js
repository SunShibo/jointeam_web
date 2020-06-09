var cont = new Vue({
	// el:'#app',
	data() {
		return {
			projectId: 0,
			staffId:0,
			activeIndex: '4',
			progressList: [],
			projectList: [],
			staffBO:{}
		}

	},
	created(){
		this.projectId = getQueryVariable('projectId');
		this.staffId =  getQueryVariable('staffId');
	},
	mounted() {
		this.initProject();
		this.initProgress();
	}
	,
	methods: {
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
						pageSize: 5,
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
						 	progressArr[i]["startFormatDate"] = formatTime(progressArr[i].startTime);
						 	progressArr[i]["endFormatDate"] = formatTime(progressArr[i].predictEndTime);
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
