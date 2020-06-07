new Vue({
	data() {
		return {
			activeIndex: '2',
			query: {},
			introd: [],
			records:[]
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			//			console.log(key, keyPath);
		},
		queryDetails() {
			var ids = getQueryString('id');
			var that = this;
			axios.post(url + '/server/queryDetails', {
					id: ids
				})
				.then(function(res) {
//					console.log(res);
					if(res.data.success = true) {
						that.query = res.data.data;
						var arr = [];
						str = that.query.serveUnit; //这是一字符串 
						var strs = new Array(); //定义一数组 
						strs = str.split(","); //字符分割 
						for(i = 0; i < strs.length; i++) {
							arr.push(strs[i])
						}
						that.introd = arr;
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		recos(id){
			var that = this;
			axios.post(url + '/server/queryDetails', {
					id: id
				})
				.then(function(res) {
//					console.log(res);
					if(res.data.success = true) {
						that.query = res.data.data;
						var arr = [];
						str = that.query.serveUnit; //这是一字符串 
						var strs = new Array(); //定义一数组 
						strs = str.split(","); //字符分割 
						for(i = 0; i < strs.length; i++) {
							arr.push(strs[i])
						}
						that.introd = arr;
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		queryTypes() {
			var that = this;
			axios.post(url + '/server/queryTypes')
				.then(function(res) {
//					console.log(res);
					if(res.data.success = true) {
//						that.template = res.data.data;
						let temp = res.data.data;
						let arr = [];
						temp.forEach(function(item,index){
							var childs = item.child;
							childs.forEach(function(items,index){
								arr.push(items.id)
							})
						})
						that.querys(arr[0])
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		querys(id) {
			var that = this;
			axios.post(url + '/server/query', {
					typeId: id,
					pageSize: 4,
					pageNo: 1
				})
				.then(function(res) {
//					console.log(res);
					if(res.data.success = true) {
						that.records = res.data.data.records;
					} else {
						alert(res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.queryDetails();
		this.queryTypes();
	}
}).$mount('#app')

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}