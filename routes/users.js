var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
/* GET users listing. */
router.post('/upload', function(req, res, next) {

	mkdir('d:/luck_images');
	var name = req.body.name;　　　　
	var base64 = req.body.image_base64;
	var path = 'd:/luck_images/' + name + '.png'; //从app.js级开始找--在我的项目工程里是这样的
	var dataBuffer = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64'); //把base64码转成buffer对象，
	// console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer));
	// console.log( dataBuffer );
	fs.writeFile(path, dataBuffer, function(err) { //用fs写入文件
		if (err) {
			console.log(err);
		} else {
			var json = {"url": path}
			res.send(json);
		}
	});

});

module.exports = router;


//使用时第二个参数可以忽略
function mkdir(dirpath,dirname){
	//判断是否是第一次调用
	if(typeof dirname === "undefined"){
		if(fs.existsSync(dirpath)){
			return;
		}else{
			mkdir(dirpath,path.dirname(dirpath));
		}
	}else{
		//判断第二个参数是否正常，避免调用时传入错误参数
		if(dirname !== path.dirname(dirpath)){
			mkdir(dirpath);
			return;
		}
		if(fs.existsSync(dirname)){
			fs.mkdirSync(dirpath)
		}else{
			mkdir(dirname,path.dirname(dirname));
			fs.mkdirSync(dirpath);
		}
	}
}
