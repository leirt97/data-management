var MongoClient=require('mongodb').MongoClient;
var DB_STR='mongodb://localhost:27017/login';
var querystring=require('querystring');
var Jobs={
	add:function(req,res){
		console.log('job.add');
		var data='';
		req.addListener('data',function(dataPart){
			data+=dataPart;
		});
		req.addListener('end',function(){
			var temp=JSON.parse(data);
			temp.form='button';
			temp.btn1='删 除';
			temp.btn2='修 改';
			MongoClient.connect(DB_STR,function(err,db){
				if(err){console.log(err); res.end(); db.close(); return;}
				var collection=db.collection('job');
				console.log(temp);
				collection.count({id:temp.id},function(err,num){
					if(num!=0){
						res.write('0');
						res.end();
						db.close();
					}else{
						collection.insert(temp,function(err,result){
							if(err){console.log(err); res.end(); db.close(); return;}
							res.write(result.result.n.toString());
							res.end();
							db.close();
						});
					}
				})
			});
		});
	},
	save:function(req,res){
		console.log('job.save');
		var data='';
		req.addListener('data',function(dataPart){
			data+=dataPart;
		});
		req.addListener('end',function(){
			var temp=JSON.parse(data);
			console.log(temp);
			temp.form='button';
			temp.btn1='删 除';
			temp.btn2='修 改';
			MongoClient.connect(DB_STR,function(err,db){
				if(err){console.log(err); res.end(); db.close(); return;}
				var collection=db.collection('job');
				collection.update({id:temp.id},temp,function(err,result){
					res.write('1');
					res.end();
					db.close();
				});
			});
		});
	},
	del:function(req,res){
		console.log('job.del');
		var key='';
		var keyObj=querystring.parse(req.url.match(/[^\/]+$/)[0]);
		for(p in keyObj){
			key=p;
		}
		console.log(key);
		MongoClient.connect(DB_STR,function(err,db){
			if(err){console.log(err); res.end(); db.close(); return;}
			var collection=db.collection('job');
			collection.remove({id:key},function(err,result){
//				if(err){console.log(err); res.end(); db.close(); return;}
				res.write(result.result.n.toString());
				console.log('删除了'+result.result.n+'个');
				res.end();
				db.close();
			});
		});
	},
	getAll:function(req,res){
		console.log('running getAll');
		var qStr='';
		//从请求体中获取请求数据会不断触发data事件
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		//从请求体中获取完请求数据会触发end事件
		req.addListener('end',function(){
			var temp=JSON.parse(qStr);
			var pageInfo=temp.pageInfo;
			var findInfo=temp.findInfo;
			console.log(pageInfo);
			console.log(findInfo);
			var skip=parseInt((pageInfo.curPage-1)*pageInfo.pageSize);
			var pageSize=parseInt(pageInfo.pageSize);
			var total=0;
			var condition={};
			Object.keys(findInfo).forEach(function(v){
				condition[v]=RegExp(findInfo[v]);
			});
			MongoClient.connect(DB_STR,function(err,db){
				if(err){console.log(err); res.end(); db.close(); return;}
				var collection=db.collection('job');
				collection.count(condition,function(err,num){
					var total=num;
					console.log('count_total:'+total);
					collection.find(condition,{_id:0}).skip(skip).limit(pageSize).toArray(function(err,result){
						res.write(JSON.stringify({
							data:result,
							total:num
						}));
						res.end();
						db.close();
					});
				});
				
			});
		});
	},
};

module.exports=Jobs;