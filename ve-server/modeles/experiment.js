var mongoose = require('mongoose')
var ExperimentSchema = require('../schemas/experiment')
var Experiment = mongoose.model('Experiment', ExperimentSchema)

module.exports = Experiment