var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '5',
			card:[
				{name:'进行中'},
				{name:'已完成'}
			],
			template:[
				{temp:'质量验收模板'},
				{temp:'质量验收模板3'}
			],
			itemTemp:[
				{name:'时间设计点击俺就'},
				{name:'分手的'},
				{name:'的热无若'}
			]
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		template_href(){
			console.log(111)
			window.location.href='./project_list.html';
		}
	}
}).$mount('#app')
var height = 138*cont.itemTemp.length;
$('.card_temp').css('height',height)

$('.card_list_left:first').addClass('light_greycolor');
$('.card_img:first').attr('src','images/right_2.png');
$('.cards_t:first').addClass('temps').siblings('div').removeClass('temps');

$('.card_list_left').click(function(){
	var index = $(this).index();
	$(this).siblings('div').removeClass('light_greycolor');  // 删除其他兄弟元素的样式
    $(this).addClass('light_greycolor');
	
	$(this).find('img').attr('src','images/right_2.png');
	$(this).siblings().find('img').attr('src','images/right_1.png');
	
	$('.cards_t').eq(index).addClass('temps').siblings('div').removeClass('temps');
})

