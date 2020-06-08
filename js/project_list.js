var cont = new Vue({
	// el:'#app',
	data() {
		return {
			projectId: '',
			activeIndex: '4',
			progressList: [],
			projectList: []
		}

	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		template_href(projectId) {
			window.location.href = './project_list.html?projectId=' + projectId;
		},
		initProject() {
			var vm = this;
			axios({
					url: url + '/project/selectProjectByUserId',
					method: 'POST',
					data: {
						pageNo: 1,
						pageSize: 4,
						accomplishStatus: vm.accomplishStatus
					},
					headers: {
						'Token': localStorage.getItem('cookie')
					}
				}).then(function(response) {
					if (response.data.success) {
						let projectArr = [];
						for (let i = 0; i <= response.data.data.records.length; i++) {
							let project = response.data.data.records[i];
							projectArr.push({
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
		},
		initProgress() {
			var vm = this;
			axios({
					url: url + '/project/selectProjectByUserId',
					method: 'POST',
					data: {
						pageNo: 1,
						pageSize: 4,
						accomplishStatus: vm.accomplishStatus
					},
					headers: {
						'Token': localStorage.getItem('cookie')
					}
				})
				.then(function(response) {
					if (response.code == "00000") {
						let progressArr = [];
						for (let i = 0; i <= response.data.records.length; i++) {
							let project = response.data.records[i];
							progressArr.push({
								projectId: project.projectId,
								projectName: project.projectName,
								title: project.title,
								stuffName: project.stuffName,
								image: project.image,
								formatStartTime: project.formatStartTime
							});
						}
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
	cont.projectId = getQueryVariable('projectId');
	// 初始化项目
	cont.initProject();
	// 初始化项目进度
	cont.initProgress();
})
