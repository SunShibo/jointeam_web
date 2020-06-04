var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '6',
			phone: '',
			password: '',
			checked: true
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		onSubmit() {
			var phone = this.phone;
			var password = this.password;
			//正则表达式，十一位数字的电话号码
			var phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
			//如果手机号码输入为空，则再输入框后插入错误信息
			if(phone == '') {
				alert('手机号码不能为空！');
				return false;
			} else if(password == '') {
				alert('密码不能为空！');
				return false;
			} else if(!phoneReg.test(phone)) {
				alert('请输入正确的手机号码');
				return false;
			} else {
				var strPhone = phone;
				var strPass = password;
				localStorage.setItem('strPhone', strPhone);
				if(this.checked == true) {
					localStorage.setItem('strPass', strPass);
				} else {
					localStorage.removeItem('strPass');
				}
				axios.post(url + '/user/loginByPwd', {
						phone: phone,
						password: password
					})
					.then(function(res) {
						localStorage.setItem("cookie", document.cookie);
						localStorage.setItem("information", JSON.stringify(res.data.data));

						if(res.success = true) {
							 window.location.href='./index.html'
						} else {
							alert(res.msg)
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	},
	mounted: {

	}
}).$mount('#app')

$(document).ready(function() {
	var strPhone = localStorage.getItem('strPhone');
	var strPass = localStorage.getItem('strPass');
	if(strPhone) {
		cont.phone = strPhone;
	}
	if(strPass) {
		cont.password = strPass;
	}
});