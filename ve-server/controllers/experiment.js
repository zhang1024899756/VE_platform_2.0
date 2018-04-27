var Experiment = require('../modeles/experiment');
var Component = require('../modeles/component');
var mongoose = require('mongoose');


exports.list = function(req, res) {
	Experiment.fetch(function(err, experiment) {
		res.send(experiment)
	})
}

exports.detail = function(req, res) {
	console.log(req.query)
	var id = req.query.id
	Experiment.findById(id, function(err, experiment) {
		var compoArr = experiment.components
		console.log(compoArr)

		Component
			.find({
				'_id': {
					'$in': compoArr
				}
			}, function(err, components) {
				res.send({
					experiment: experiment,
					components: components
				})
			})

	})
}


exports.savenew = function(req, res) {
	var id = req.body.id
	var experimentObj = req.body
	var _experiment

	if (id) {
		console.log(id)
	} else {
		_experiment = new Experiment(experimentObj)
		_experiment.save(function(err, experiment) {
			if (err) {
				console.log(err)
			}
			res.send(200)
		})
	}
}