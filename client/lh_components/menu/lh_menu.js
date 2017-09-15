var menu=Vue.extend({
	template:'#menu',
	data:function(){
		return {
			menus:[],
		};
	},
	created:function(){
		this.menus=[
				{
					name:'信息管理',
					isShow:false,
					subMenus:[
						{name:'职位信息汇总',gridName:'job'},
						{name:'公司信息汇总',gridName:'company'}
				]}
			];
	},
	methods:{
		toggle:function(i){
			this.menus[i].isShow=!this.menus[i].isShow;
//			this.curIndex=i;
		},
		addTab:function(sub){
			this.$store.commit("tabs/addTab",sub.name);
			this.$store.commit('grid/addGrid',sub.gridName);
		}
	}
});
Vue.component('mymenu',menu);