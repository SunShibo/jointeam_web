new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '4',
			card:[
				{name:'质检报告'},
				{name:'质检报告1'},
				{name:'质检报告2'},
				{name:'质检报告3'}
			],
			template:[
				{temp:'质量验收模板'},
				{temp:'质量验收模板1'},
				{temp:'质量验收模板2'},
				{temp:'质量验收模板3'}
			]
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}).$mount('#app')

$('.card_list_left:first').addClass('light_greycolor');
$('.cont_card_right:first').addClass('temps').siblings('div').removeClass('temps');

$('.card_list_left').click(function(){
	var index = $(this).index();
	$(this).siblings('div').removeClass('light_greycolor');  // 删除其他兄弟元素的样式
    $(this).addClass('light_greycolor');
	$('.cont_card_right').eq(index).addClass('temps').siblings('div').removeClass('temps');
})


