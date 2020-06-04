new Vue({
	// el:'#app',
	data() {
		return {
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
		}
	}
}).$mount('#app')


