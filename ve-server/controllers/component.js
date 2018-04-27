var mongoose = require('mongoose')
var Component = require('../modeles/component');
var formidable = require('formidable');
var fs = require('fs');
var path = require("path");


var domain = 'http://localhost:8100/'
var upLoad_folder = '/images/'


exports.list = function(req, res) {
	Component.fetch(function(err, component) {
		res.send(component)
	})
}

exports.imgcancel = function(req, res) {
	var uu = "localhost:8100/images/"
	var imgUrl = req.body.url
	if (fs.existsSync(imgUrl)) {
		fs.unlinkSync(imgUrl)
		res.send(200)
	} else {
		console.log(fs.existsSync(uu))
	}
}


exports.savenew = function(req, res) {
	var id = req.body.id
	var componentObj = req.body
	var _component

	if (id) {
		console.log(id)
	} else {
		_component = new Component(componentObj)
		_component.save(function(err, component) {
			if (err) {
				console.log(err)
			}
			console.log(component)
			res.send(200)
		})
	}
}

exports.upload = function(req, res) {
	var form = new formidable.IncomingForm(); //创建上传表单
	form.encoding = 'utf-8'; //设置编辑
	form.uploadDir = 'public' + upLoad_folder; //设置上传目录
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
	form.type = true;

	form.parse(req, function(err, fields, files) {
		if (err) {
			res.send(err);
			console.log("form.parse错误：" + err)
			return;
		}
		var extName = ''; //后缀名
		switch (files.file.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
		}
		if (extName.length === 0) {
			res.send({
				code: 202,
				msg: '只支持png和jpg格式图片'
			});
			return;
		} else {
			var avatarName = Date.now() + '.' + extName;
			var newPath = form.uploadDir + avatarName;
			var showUrl = domain + upLoad_folder + avatarName;
			fs.renameSync(files.file.path, newPath); //重命名
			res.send({
				'data': {
					'image_src': showUrl
				},
				status: 'success'
			});
		}
	})
}