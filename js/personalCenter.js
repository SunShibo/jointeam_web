var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '6',
			imageUrl: 'images/my.png',
			isLogin: false,
			tempLists:[],
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
			industryTableData: [],
			//员工列表
			currentPage: 1,
			// 消息列表
			industryCurrentPage: 1,
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

			alltime: 60,

			nowtime: "发送验证码",

			isNo: true,
			totalCount: 0,
			industryTotal: 0,



			region: 'oss-cn-beijing',
			bucket: 'zjtc-bucket-01',
			headers: {
				'Content-Type': 'application/x-zip-compressed'
			},
			uploadIndex: 0,

			pageSize: 10,
			industryPageSize: 3,
			dataObj: {},
			expiration: ''

		}
	},
	created() {
		var cookie = localStorage.getItem("cookie");
		if (cookie != null && cookie.length) {
			this.isLogin = true;
		} else {
			this.isLogin = false;
		}

		var vm = this;
		axios({
			url: url + '/sequence/getStsOss',
			method: 'POST',
			headers: {
				'Token': localStorage.getItem('cookie')
			}
		}).then(function(res) {
			if (res.data.success) {
				console.log("response------", res.data)
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
	},
	methods: {
		bindTap(key, keyPath) {
			
			if (key === "signOut" && this.isLogin) {
				var token = localStorage.getItem("cookie");
				
				axios({
					url: url + "/user/backLogin",
					method:"POST",
					headers: {
						'Token': token
					}
				}).then((res)=>{
					if (res.data.success) {
						localStorage.removeItem('cookie');
						localStorage.removeItem('information');
						localStorage.removeItem('strPhone');
						alert(res.data.msg);
						 window.location.href = "login.html";
					}
				});

			}else{
				 window.location.href = keyPath;
			}
			
		},
		upLoadSuccess(res){
			var image = res.data;
			this.form.head = image;
		}
		,
		//上传oss方法
		handleHttpRequest(option) {
			//console.log(option.file);
			
			 var form = new FormData();
			 form.append("file",option.file)
			axios({
				url:url+"/user/uploadHead",
				method:"POST",
				data:{
					form
				},
				headers:{
					"Token": localStorage.getItem("cookie"),
					 //"Content-Type":"multipart/form-data"
					//"Content-Type":"application/x-www-form-urlencoded"
				}	
			}).then((res)=>{
				console.log("oss:"+res.data.msg);
			});
/* 
			let vm = this;
			try {
				console.log("try-------", vm.dataObj)
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
				}).then(({
					res
				}) => {
					if (res.statusCode === 200) {
						//根据?截取前半部分地址
						vm.form.head = res.requestUrls[0].split('?')[0];

						vm.$refs.upload.clearFiles();
					} else {
						console.error('上传失败')
						console.log("上传后失败 statusCode不等于200", res)
					}
				}).catch(error => {
					console.error('上传失败')
					console.log("上传后失败 直接失败", error)
				});

			} catch (error) {
				console.error('上传失败')
				console.log("上传后失败 try方法走到了catch中", error)
			} */

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

		submitInfo() {
			var that = this;
			axios.post('https://hny.jointeam6.com/', {
					"phone": that.form.phone
				}).then(function(res) {
					console.log(res);
					if (res.data.success) {
						that.nowtime = that.alltime;
						var int = setInterval(() => {
							that.nowtime--;
							if (that.nowtime <= 0) {
								that.nowtime = "发送验证码";
								int = window.clearInterval(int);
								that.isNo = true;
							} else {
								that.isNo = false;
							}
						}, 1000);
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
					"phone": that.form.phone
				}).then(function(res) {
					console.log(res);
					if (res.data.success) {
						that.nowtime = that.alltime;
						var int = setInterval(() => {
							that.nowtime--;
							if (that.nowtime <= 0) {
								that.nowtime = "发送验证码";
								int = window.clearInterval(int);
								that.isNo = true;
							} else {
								that.isNo = false;
							}
						}, 1000);
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

		formatDate(date) {
			return formatTime(date)
		},

		//消息列表
		getIndustryData() {
			var that = this;
			var userId = JSON.parse(localStorage.getItem("information")).id
			axios({
				url: url + '/inform/queryAll',
				method: 'POST',
				data: {
					userId: userId,
					pageSize: that.industryPageSize,
					pageNo: that.industryCurrentPage
				},
				headers: {
					'Token': localStorage.getItem('cookie')
				}
			}).then(function(res) {
				if (res.data.success) {
					let tempList = [];
					for (var i = 0; i < res.data.data.records.length; i++) {
						let message = res.data.data.records[i];
						tempList.push({
							id: message.id,
							userId: message.userId,
							createTime: message.createTime,
							content: message.content,
							title: message.title,
							isRead: message.isRead,
							image: message.image

						});
					}
					that.industryTableData = tempList;
					that.industryTotal = res.data.data.total;
				}

			})
		},

		getData() {
			var that = this;
			
			axios.post('https://hny.jointeam6.com/staffs/queryStaffs', {
					pageSize: that.pageSize,
					pageNo: that.currentPage
				})
				.then(function(res) {
					// console.log(res);
					if (res.data.success) {
						that.tableData = res.data.data.records;
						that.totalCount = res.data.data.total;
					} else {

					}
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
		onSubmit(form) {
			var cookie = localStorage.getItem("cookie");
			var image = "";
			if(this.form.head!="" && this.form.head.length>0){
				image = this.form.head;
			}else{
				image = this.imageUrl;
			}
			axios({
				url: url + "/user/update",
				method: "POST",
				data: {
					name: this.form.name,
					mailbox: this.form.mailbox,
					head: image,
					phone: this.form.phone,
					vCode: this.form.vCode
				},
				headers: {
					'Token': cookie,
					'Content-Type': 'application/json'
				}
			}).then((res) => {
				var tempUserInfo = JSON.parse(localStorage.getItem("information"));
				tempUserInfo.head = image;
				localStorage.setItem("information",JSON.stringify(tempUserInfo));
				
				 this.$message({
				            message: res.data.msg
				          });
			});
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
						}).then(function(res) {
							// console.log(res);
							if (res.data.success) {
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
			// 注意：在改变每页显示的条数时，要将页码显示到第一页
			this.currentPage = 1;
			// 点击每页显示的条数时，显示第一页
			this.getData();
		},
		// 显示第几页
		handleCurrentChange(val) {
			// 改变默认的页数
			this.industryCurrentPage = val;
			// 切换页码时，要获取每页显示的条数
			this.getData();
		},
		handleIndustrySizeChange(val) {
			// 改变每页显示的条数
			this.industryPageSize = val;
			// 注意：在改变每页显示的条数时，要将页码显示到第一页
			this.industryCurrentPage = 1;
			// 点击每页显示的条数时，显示第一页
			this.getIndustryData();
		},
		handleIndustryCurrentChange(val) {
			// 改变默认的页数
			this.industryCurrentPage = val;
			// 切换页码时，要获取每页显示的条数
			this.getIndustryData();
		}
	},

	mounted() {
		this.setData();
	}

}).$mount('#app')



var height = $('.cards_t').height();
$('.card_temp').css('height', height)

$('.card_list_left:first').addClass('light_greycolor');
$('.card_img:first').attr('src', 'images/right_2.png');
$('.cards_t:first').addClass('temps').siblings('div').removeClass('temps');

$('.card_list_left').click(function() {
	var index = $(this).index();
	switch (index) {
		case 1:
			cont.getData();
			break;
		case 2:
			cont.getIndustryData()
			break;
	}
	$(this).siblings('div').removeClass('light_greycolor'); // 删除其他兄弟元素的样式
	$(this).addClass('light_greycolor');

	$(this).find('img').attr('src', 'images/right_2.png');
	$(this).siblings().find('img').attr('src', 'images/right_1.png');

	$('.cards_t').eq(index).addClass('temps').siblings('div').removeClass('temps');

	var height = $('.cards_t').eq(index).height();
	$('.card_temp').css('height', height)
	if(height < 200){
		$('.card_temp').css('height', height+400)
	}
})
