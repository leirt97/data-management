var Jobs=require('./lh_jobsRouter');
var Companys=require('./lh_companysRouter');
var Admin=require('./lh_Admin.js');
var router=function(req,res){
	console.log('进入router');
	var reg=/^\/(\w+)\/(\w+)/;
	var result=req.url.match(reg);
	console.log(result[2]);
	switch(result[1]){
		case 'job':
			Jobs[result[2]](req,res);
			break;
		case 'company':
			Companys[result[2]](req,res);
			break;
		case 'admin':
			Admin[result[2]](req,res);
			break;
		default :
			break;
	}
};
module.exports=router;
