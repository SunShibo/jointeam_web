var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '6',
			imageUrl: 'images/my.png',
			form: {
				nickname: '',
				phoneNum: '',
				vcode: '',
				email: '',
			},
			ruleForm:{
				title:'',
				textarea:''
			},
			currentPage: 1,
			card: [{
					name: '基本信息'
				},
				{
					name: '员工列表'
				},
				{
					name: '系统推送'
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
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			}],
			
		}
	},
	methods: {
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
		submitForm(ruleForm){
			console.log(ruleForm);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		}
	}
}).$mount('#app')
var height = 138 * cont.card.length;
$('.card_temp').css('height', height)

$('.card_list_left:first').addClass('light_greycolor');
$('.card_img:first').attr('src', 'images/right_2.png');
$('.cards_t:first').addClass('temps').siblings('div').removeClass('temps');

$('.card_list_left').click(function() {
	var index = $(this).index();
	$(this).siblings('div').removeClass('light_greycolor'); // 删除其他兄弟元素的样式
	$(this).addClass('light_greycolor');

	$(this).find('img').attr('src', 'images/right_2.png');
	$(this).siblings().find('img').attr('src', 'images/right_1.png');

	$('.cards_t').eq(index).addClass('temps').siblings('div').removeClass('temps');
})
