var cont = new Vue({
	// el:'#app',
	data() {
		return {
			activeIndex: '2',
			card: [{
					name: '节能'
				},
				{
					name: '环境'
				},
				{
					name: '新能源'
				},
				{
					name: '卫生健康'
				}
			],
			template: [{
				name:'节能',
				itemTemp:[
					{name:'多好速度',temp:[
						{name:'打哈哈'},
						{name:'打哈哈'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]},
					{name:'是滴是滴',temp:[
						{name:'发的'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]},
					{name:'认为',temp:[
						{name:'发送'},
						{name:'打哈哈'}
					]},
					{name:'二位',temp:[
						{name:'辅导费'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]}
				]
			},{
				name:'环境',
				itemTemp:[
					{name:'多好速度',temp:[
						{name:'打哈哈'},
						{name:'打哈哈'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]},
					{name:'是滴是滴',temp:[
						{name:'发的'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]},
					{name:'认为',temp:[
						{name:'发送'},
						{name:'打哈哈'}
					]},
					{name:'二位',temp:[
						{name:'辅导费'},
						{name:'df'},
						{name:'打哈哈'}
					]}
				]
			},{
				name:'新能源',
				itemTemp:[
					{name:'多好速度',temp:[
						{name:'打哈哈'},
						{name:'打哈哈'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]},
					{name:'是滴是滴',temp:[
						{name:'发的'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]},
					{name:'认为',temp:[
						{name:'发送'},
						{name:'dsf'}
					]},
					{name:'二位',temp:[
						{name:'辅导费'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]}
				]
			},{
				name:'卫生健康',
				itemTemp:[
				{name:'多好速度',temp:[
						{name:'打哈哈'},
						{name:'打哈哈'},
						{name:'fdf'},
						{name:'打哈哈'}
					]},
					{name:'是滴是滴',temp:[
						{name:'发的'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]},
					{name:'认为',temp:[
						{name:'发送'},
						{name:'打哈哈'}
					]},
					{name:'二位',temp:[
						{name:'辅导费'},
						{name:'打哈哈'},
						{name:'打哈哈'}
					]}
				]
			}]
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		mallDetails(){
			window.location.href = 'mallDetails.html'
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