
var MongoClient=require('mongodb').MongoClient;
var address="mongodb://localhost:27017/login";

var Admin={
	login:function(req,res){
		var qstr="";
		req.addListener("data",function(dataPart){
			qstr+=dataPart;
		});
		req.addListener("end",function(){
			MongoClient.connect(address,function(err,db){
				if(err) return;
				var collection=db.collection('admin');
				var obj=JSON.parse(qstr);
				console.log(obj);
				collection.find(obj).toArray(function(err,result){
					console.log(result);
					if(err) return;
					if(result==""){
						res.write("0");
						db.close();
						res.end();
					}else{
						res.write("1");
						db.close();
						res.end();
					}
				})
			})
		})
	},
	regist:function(req,res){
		console.log('regist');
		var qstr="";
		req.addListener("data",function(dataPart){
			qstr+=dataPart;
		});
		req.addListener("end",function(){
			MongoClient.connect(address,function(err,db){
				if(err) return;
				var collection=db.collection('admin');
				var obj=JSON.parse(qstr);
				collection.find({adminname:obj.adminname}).toArray(function(err,result){
						console.log(result);
					if(result!=""){
						res.write('0');
						db.close();
						res.end();
					}else{
						collection.insert(obj);
						res.write('1');
						db.close();
						res.end();
					}
				})
				
			})
		})
	}
}
module.exports=Admin;