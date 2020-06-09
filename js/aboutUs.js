new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '3',
			introd:[
				{name:'国家高新技术企业、中关村高新技术企业'},
				{name:'工程咨询资质'},
				{name:'建筑机电安装工程专业承包资质'},
				{name:'电子与智能化工程专业承包资质'},
				{name:'中央国家机关工程定点实施单位（机电工程）'},
				{name:'国家发改委、财政部、工信部首批备案节能服务公司'},
				{name:'国家发改委、财政部首批备案的合同能源管理节能服务公司'},
				{name:'工信部首批推荐的工业和通信业合同能源管理节能服务公司'},
				{name:'全国工业领域电力需求侧管理第一批服务机构'}
			],
			isLogin:false,
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	},
	created(){
		var cookie = localStorage.getItem('cookie');
		if(cookie!=null && cookie.length){
			this.isLogin = true;
		}else{
			this.isLogin = false;
		}
	}
}).$mount('#app')
