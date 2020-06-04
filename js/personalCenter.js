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
			totalCount:""
		}
	},
	methods: {
		submitInfo(){
			var that = this;
			axios.post('https://hny.jointeam6.com/', {
				"phone":that.form.phone
			}).then(function(res) {
					console.log(res);
					if (res.success = true) {
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
					if (res.success = true) {
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
