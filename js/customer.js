var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '1',
			card: [{
					name: '咨询服务'
				},
				{
					name: '解决方案'
				},
				{
					name: '运营服务'
				},
				{
					name: '产品服务'
				}
			],
			template: [{
				name:'节能',
				itemTemp:[
					{name:'多好速度'},
					{name:'是滴是滴'},
					{name:'认为'},
					{name:'二位'},
					{name:'二位'},
					{name:'二位'}
				]
			},{
				name:'环境',
				itemTemp:[
					{name:'多好速度'},
					{name:'是滴是滴'},
					{name:'认为'},
					{name:'二位'}
				]
			},{
				name:'新能源',
				itemTemp:[
					{name:'多好速度'},
					{name:'是滴是滴'},
					{name:'认为'},
					{name:'二位'}
				]
			},{
				name:'卫生健康',
				itemTemp:[
					{name:'多好速度'},
					{name:'是滴是滴'},
					{name:'认为'},
					{name:'二位'}
				]
			}]
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		customer(){
			window.location.href = 'customerDetails.html'
		}
	}
}).$mount('#app')
//var temps = '';
var temp = cont.template;
var arr = [];
temp.forEach(function(item,index){
	let temps = item.itemTemp.length;
	arr.push(temps);
})
var ma4 = Math.max.apply(null,arr);
console.log(ma4);
var height = 280 * ma4;

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