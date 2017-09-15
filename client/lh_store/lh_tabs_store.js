var tabsModule={
	namespaced:true,
	state:{
		titles:[],
		curIndex:-1
	},
	getters:{},
	mutations:{
		addTab:function(state,title){
			for(var i=0;i<state.titles.length;i++){
				if(state.titles[i]==title){
					state.curIndex=i;
					return;
				}
			}
			state.titles.push(title);
			state.curIndex=state.titles.length-1;
		},
		delTab:function(state,index){
			state.titles.splice(index,1);
			state.curIndex=state.titles.length>0?state.titles.length-1:-1;
		},
		toggleTab:function(state,index){
			state.curIndex=index;
		}
	},
	actions:{}
};