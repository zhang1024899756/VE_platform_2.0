/*
 * @Author: zhangxinyu
 * @Date:   2018-04-07 00:17:17
 * @Last Modified by:   zhangxinyu
 * @Last Modified time: 2018-04-07 22:35:38
 */
//组件属性数据模式
var mongoose = require('mongoose')
var Schema = mongoose.Schema
//var ObjectId = Schema.Types.ObjectId

var AttributeSchema = new Schema({
	//属性字段......
	name: String,
	callname: String,
	values: [],
	//时间戳
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

AttributeSchema.pre('save', function(next) {
	var user = this

	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	next()
})

AttributeSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb)
	}
}

module.exports = AttributeSchema