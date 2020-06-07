
var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '6',
			imageUrl: 'images/my.png',

			form: {
				name: '',
				phone: '',
				vCode: '',
				mailbox: '',
				head: ''
			},
			ruleForm: {
				title: '',
				content: ''
			},
			tableData: [],
			currentPage: 1,
			card: [{
					name: '基本信息'
				},
				{
					name: '员工列表'
				},
				{
					name: '消息管理'
				},
				{
					name: '反馈与建议'
				}
			],
			template: [{
					temp: '质量验收模板'
				},
				{
					temp: '质量验收模板3'
				}
			],
			itemTemp: [{
					name: '时间设计点击俺就'
				},
				{
					name: '分手的'
				},
				{
					name: '的热无若'
				}
			],

			alltime:60,

			nowtime:"发送验证码",

			isNo:true,
			totalCount:0,


			region: 'oss-cn-beijing',
			bucket: 'zjtc-bucket-01',
			headers: { 'Content-Type': 'application/x-zip-compressed' },
			uploadIndex: 0,

			pageSize: 10,
			dataObj: {},
			expiration: ''

		}
	},
	created() {
		var vm = this;
		axios({
			url: url + '/sequence/getStsOss',
			method: 'POST',
			headers: {'Token': localStorage.getItem('cookie')}
		}).then(function (res) {
			if (res.data.success) {
				console.log("response------",res.data)
				vm.expiration = res.data.data.expiration;
				vm.dataObj = {
					region: vm.region,
					bucket: vm.bucket,
					accessKeyId: res.data.data.tempAk,
					accessKeySecret: res.data.data.tempSk,
					stsToken: res.data.data.token
				};

			}
		})
		// $.ajax({
		// 	url: url + '/sequence/getStsOss',
		// 	contentType: "application/json",
		// 	dataType: "JSON",
		// 	headers: {'Set-Cookie': localStorage.getItem('cookie')},
		// 	type: "POST",
		// 	success: function(res) {
		// 		if (res.data.success) {
		// 			debugger
		// 			console.log(res.data)
		// 			const { expiration, tempAk, tempSk, token } = res.data;
		// 			vm.expiration = expiration;
		// 			vm.dataObj = {
		// 				region: vm.region,
		// 				bucket: vm.bucket,
		// 				accessKeyId: tempAk,
		// 				accessKeySecret: tempSk,
		// 				stsToken: token
		// 			};
		//
		// 		}
		// 	}
		// })
	},
	methods: {


		//上传oss方法
		handleHttpRequest(option) {

			let vm = this;
			try {
				console.log("try-------",vm.dataObj)
				const client = Client(vm.dataObj),
					file = option.file;

				console.log(file)
				//随机命名
				const random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop();
				// 分片上传文件
				client.multipartUpload(random_name, file, {
					headers: vm.headers,
					progress: async function(p) {
						option.file.percent = p * 100;
					}
				}).then(({ res }) => {
					if (res.statusCode === 200) {
						//根据?截取前半部分地址
						vm.form.head = res.requestUrls[0].split('?')[0];

						vm.$refs.upload.clearFiles();
					} else {
						console.error('上传失败')
						console.log("上传后失败 statusCode不等于200",res)
					}
				}).catch(error => {
					console.error('上传失败')
					console.log("上传后失败 直接失败",error)
				});

			} catch (error) {
				console.error('上传失败')
				console.log("上传后失败 try方法走到了catch中",error)
			}

		},

		// 随机生成文件名
		random_string(len) {
			len = len || 32;
			let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz12345678',
				maxPos = chars.length,
				pwd = '';
			for (let i = 0; i < len; i++) {
				pwd += chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return pwd;
		},

		submitInfo(){
			var that = this;
			axios.post('https://hny.jointeam6.com/', {
				"phone":that.form.phone
			}).then(function(res) {
					console.log(res);
					if (res.data.success) {
						that.nowtime = that.alltime;
						var int = setInterval(()=>{
							that.nowtime--;
							if(that.nowtime <= 0){
								that.nowtime = "发送验证码";
								int = window.clearInterval(int);
								that.isNo = true;
							}else{
								that.isNo = false;
							}
						},1000);
					} else {
						that.$message.error("短信发送失败,请稍后重试");
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		sendvCode() {
			var that = this;
			axios.post('https://hny.jointeam6.com/user/send', {
				"phone":that.form.phone
			}).then(function(res) {
					console.log(res);
					if (res.data.success) {
						that.nowtime = that.alltime;
						var int = setInterval(()=>{
							that.nowtime--;
							if(that.nowtime <= 0){
								that.nowtime = "发送验证码";
								int = window.clearInterval(int);
								that.isNo = true;
							}else{
								that.isNo = false;
							}
						},1000);
					} else {
						that.$message.error("短信发送失败,请稍后重试");
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		setData() {
			var that = this;
			that.form = JSON.parse(localStorage.getItem("information"));
		},

		getData() {
			var that = this;
			axios.post('https://hny.jointeam6.com/staffs/queryStaffs', {})
				.then(function(res) {
					console.log(res);
					if (res.success = true) {} else {}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const fileTypes = [".jpg", ".png", ".jpeg"];
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!fileTypes) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return fileTypes && isLt2M;
		},
		onSubmit(form) {
			console.log(form);
		},
		submitForm(ruleForm) {
			var id = JSON.parse(localStorage.getItem("information")).id;
			var that = this;
			that.$refs.fbForm.validate(valid => {
				if (valid) {
					axios.post('https://hny.jointeam6.com/feedback/insert', {
							"title": ruleForm.title,
							"userId": id,
							"content": ruleForm.content
						})
						.then(function(res) {
							console.log(res);
							if (res.success = true) {
								that.$message.success("反馈成功");
								that.ruleForm = {};
							} else {
								that.$message.error("失败");
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				} else {
					console.error("错误的提交方式");
				}
			});

		},


		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		search() {
			this.getData();
		},

		showInput() {
			this.inputVisible = true;
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus();
			});
		},

		handleInputConfirm() {
			let inputValue = this.inputValue;
			if (inputValue) {
				this.dynamicTags.push(inputValue);
			}
			this.inputVisible = false;
			this.inputValue = '';
		},

		// 每页显示的条数
		handleSizeChange(val) {
			// 改变每页显示的条数
			this.PageSize = val;
			// 点击每页显示的条数时，显示第一页
			this.getData(val, 1);
			// 注意：在改变每页显示的条数时，要将页码显示到第一页
			this.currentPage = 1;
		},
		// 显示第几页
		handleCurrentChange(val) {
			// 改变默认的页数
			this.currentPage = val;
			// 切换页码时，要获取每页显示的条数
			this.getData(this.PageSize, val * this.pageSize);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		}
	},

	mounted() {
		this.getData();
		this.setData();
	}

}).$mount('#app')
var height = 138 * cont.card.length;
$('.card_temp').css('height', height)

$('.card_list_left:first').addClass('light_greycolor');
$('.card_img:first').attr('src', 'images/right_2.png');
$(
	'.cards_t:first').addClass('temps').siblings('div').removeClass('temps');

$('.card_list_left').click(function() {
	var index = $(this).index();
	$(this).siblings('div').removeClass('light_greycolor'); // 删除其他兄弟元素的样式
	$(this).addClass('light_greycolor');

	$(this).find('img').attr('src', 'images/right_2.png');
	$(this).siblings().find('img').attr('src', 'images/right_1.png');

	$('.cards_t').eq(index).addClass('temps').siblings('div').removeClass('temps');
})
