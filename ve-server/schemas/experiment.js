/*
 * @Author: zhangxinyu
 * @Date:   2018-04-03 16:45:12
 * @Last Modified by:   zhangxinyu
 * @Last Modified time: 2018-04-11 16:47:13
 */
//实验数据模式
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ExperimentSchema = new Schema({
	//属性字段......
	name: String,
	introduction: String,
	components: [{
		type: ObjectId,
		ref: 'Component'
	}],
	result: {
		type: Number,
		default: 0
	},
	content: String,
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

ExperimentSchema.pre('save', function(next) {
	var user = this

	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	next()
})

ExperimentSchema.statics = {
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

module.exports = ExperimentSchema