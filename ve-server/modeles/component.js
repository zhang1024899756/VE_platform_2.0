var mongoose = require('mongoose')
var ComponentSchema = require('../schemas/component')
var Component = mongoose.model('Component', ComponentSchema)

module.exports = Component