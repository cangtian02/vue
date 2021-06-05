new Vue({
	el: '#app',
	data: {
		"isShowFlag": false,
		"isNoCartFlag": false,
		"checkAllFlag": false,
		"items": [],
		"totalMoney": 0
	},
	mounted: function (){
		this.$nextTick(function(){
			this.getData();
		});
	},
	filters: {
		formtaMoney: function (value,type){
			return '￥' + value.toFixed(2) + type;
		}
	},
	methods: {
		getData: function (){
			this.$http.get('data/shoppingCart.json').then((res)=>{
				this.items = res.body.result.list;
				this.items.length == 0 ? this.isNoCartFlag = true : this.isShowFlag = true;
			});
		},
		numFun: function(item,type){
			if(type < 0){
				item.buyNum--;
				if(item.buyNum < 1){
					item.buyNum = 1;
				}
			}else{
				item.buyNum++;
				if(item.buyNum > item.stork){
					item.buyNum = item.stork;
				}				
			}	
			this.totalMoneyFun();
		},
		selectCheck: function(item){
			if(typeof item.checkFlag == 'undefined'){
				this.$set(item,'checkFlag', true);
			}else{
				item.checkFlag = !item.checkFlag;
			}
			let len = 0;
			this.items.forEach(value => {
				if(value.checkFlag){
					len++;
				}				
			});
			len == this.items.length ? this.checkAllFlag = true : this.checkAllFlag = false;			
			this.totalMoneyFun();
		},
		checkAll: function(){
			this.items.forEach(value => {
				if(typeof value.checkFlag == 'undefined'){
					this.$set(value,'checkFlag', true);
				}else{
					value.checkFlag = !value.checkFlag;
				}					
			});
			this.checkAllFlag = !this.checkAllFlag;
			this.totalMoneyFun();
		},
		deleteItem: function(i){
			let flag = confirm('确认删除此项商品？');
			if(flag){
				this.items.splice(i, 1);
				this.totalMoneyFun();
			}
		},		
		totalMoneyFun: function(){
			this.totalMoney = 0;
			this.items.forEach(value => {
				if(value.checkFlag){
					this.totalMoney += value.buyNum * value.salePrice;
				}					
			});				
		}
	}	
});