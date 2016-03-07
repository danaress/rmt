var user = require('../models/model.js')
var mongoose = require('mongoose');

addSettings = function(req, res){

	console.log("req user" + req.user);
	user.update(
		{ username: req.user.username},
		{ $set:
			{
				time: req.body.time
		}
	}, function(err, doc){
		console.log(err)
		console.log(doc)
	})
}

addHabits = function(req, res){

	user.update(
		{ username: req.user.username},
		{ $set:
			{
				habit1: req.body.habit1,
				habit2: req.body.habit2,
				habit3: req.body.habit3,
		}
	}, function(err, doc){
		console.log(err)
		console.log(doc)
	})
}



module.exports = {
	addSettings : addSettings,
	addHabits : addHabits,
}