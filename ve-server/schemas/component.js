/*
 * @Author: zhangxinyu
 * @Date:   2018-04-06 21:25:25
 * @Last Modified by:   zhangxinyu
 * @Last Modified time: 2018-04-08 21:22:44
 */
//组件数据模式
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ComponentSchema = new Schema({
	//属性字段......
	name: String,
	describe: String,
	images: [],
	attribute: [{
		type: ObjectId,
		ref: 'Attribute'
	}],
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

ComponentSchema.pre('save', function(next) {
	var user = this

	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	next()
})

ComponentSchema.statics = {
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

module.exports = ComponentSchema