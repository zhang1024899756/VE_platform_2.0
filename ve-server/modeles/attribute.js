var mongoose = require('mongoose')
var AttributeSchema = require('../schemas/attribute')
var Attribute = mongoose.model('Attribute', AttributeSchema)

module.exports = Attribute