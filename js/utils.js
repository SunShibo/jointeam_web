var storage = {
	set: function(key, value) {
		console.log('set', key, value)
		if (value === undefined || value === null) {
			localStorage.setItem(key, null)
			return
		}
		if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
			localStorage.setItem(key, JSON.stringify({
				_type: typeof value,
				value: value
			}))
		} else {
			localStorage.setItem(key, JSON.stringify(value))
		}
	},
	get: function(key, defaultValue) {
		// console.log('storage get ' + key)
		var item = localStorage.getItem(key)
		if (item === null) {
			return defaultValue || null
		}
		var ret = JSON.parse(item)
		if (ret && typeof ret === 'object') {
			if (ret._type === 'string' || ret._type === 'number' || ret._type === 'boolean') {
				return ret.value
			}
		}
		return ret
	},
	setItem: function(key, value) {
		this.set(key, value)
		return this
	},
	getItem: function(key) {
		return this.get(key)
	}
}

//根据传入字段 获取指定地址栏参数值
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}

//格式化时间
function formatTime(dateTime) {
	var date = new Date(dateTime);
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes() + ':';
	return M + D + h + m
}

//格式化时间
function formatDate(dateTime) {
	var date = new Date(dateTime);
	Y = date.getFullYear();
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    D = date.getDate();
	return Y+"-"+M+"-"+D
}


function formatDateTime(dateTime){
	var date = new Date(dateTime);
	M = date.getMonth()+1;
	d = date.getDate() ;
	day =  date.getDay()+1;
	var text = "";
	switch(day){
		case 1:
		text = "一";
		
		case 2:
		text = "二";
		
		case 3:
		text = "三";
		
		case 4:
		text = "四";
		
		case 5:
		text = "五";
		
		case 6:
		text = "六";
		
		case 7:
		text = "日";
	}
	return M+"月"+d+"日"+" "+"星期"+text;
}

//oss对象
function Client(data) {
	//后端提供数据
	return new OSS({
		region: data.region, //oss-cn-beijing-internal.aliyuncs.com
		accessKeyId: data.accessKeyId,
		accessKeySecret: data.accessKeySecret,
		stsToken: data.stsToken,
		bucket: data.bucket
	})
}
