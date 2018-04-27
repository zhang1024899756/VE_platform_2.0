/*
 * @Author: zhangxinyu
 * @Date:   2018-03-15 13:11:13
 * @Last Modified by:   zhangxinyu
 * @Last Modified time: 2018-04-09 01:53:44
 */

var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');


//设置端口
var port = process.env.PORT || 8100;
//设置数据库地址
var dbUrl = 'mongodb://localhost:27017/ve_platform'
var app = express();
//app.set('views', './views/page');
//app.set('view engine', 'pug');


//连接数mongodb据库
mongoose.connect(dbUrl, function(err) {
	if (err) {
		console.warn('数据库连接失败：' + err);
	} else {
		console.log('数据库成功连接到：' + dbUrl);
	}
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

//跨域
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.use(express.static(path.join(__dirname, 'public'))) // 设置静态目录

app.use(require('./routes/routes.js'));

app.listen(port, function() {
	console.log('服务在以下端口运行.....' + port);
});