var users = require('../models/model.js')
var mongoose = require('mongoose');

// addSettings = function(req, res){

// 	console.log("req user" + req.user);
// 	users.update(
// 		{ username: req.user.username},
// 		{ $set:
// 			{
// 				time: req.body.time
// 		}
// 	}, function(err, doc){
// 		console.log(err)
// 		console.log(doc)
// 	})
// }

addHabits = function(req, res){

	users.update(
		{ 'username': req.user.username},
		{ $set:
			{
				time: req.body.time,
				number: req.body.number,
				habit1: req.body.habit1,
				habit2: req.body.habit2,
				habit3: req.body.habit3,
		}
	}, function(err, doc){
	})
}

textSetting = function(req, res){
	console.log("made it to controller")
	users.update(
		{ 'username': req.user.username},
		{ $set:
			{
				time: req.body.time
		}
	}, function(err, doc){
	})
}

numberSetting = function(req, res){
	console.log("made it to controller")
	users.update(
		{ 'username': req.user.username},
		{ $set:
			{
				number: req.body.number
		}
	}, function(err, doc){
	})
}

Habit1Update = function(req, res){
	console.log("made it to controller")
	users.update(
		{ 'username': req.user.username},
		{ $set:
			{
				habit1: req.body.habit1
		}
	}, function(err, doc){
	})
}

Habit2Update = function(req, res){
	console.log("made it to controller")
	users.update(
		{ 'username': req.user.username},
		{ $set:
			{
				habit2: req.body.habit2
		}
	}, function(err, doc){
	})
}

Habit3Update = function(req, res){
	users.update(
		{ 'username': req.user.username},
		{ $set:
			{
				habit3: req.body.habit3
		}
	}, function(err, doc){
	})
}

getMetrics = function(req, res){
	users.find(
		{'username': req.user.username},
 function(err, dox){
 	res.send(dox)
})}

checksettings = function(req, res){
	users.find(
		{'username': req.user.username},
 function(err, Docs){
 	res.send(Docs)
})}


welcomeCheck = function(req, res){
	console.log("username = " +req.user.username)
	users.find(
		{'username': req.user.username},
 function(err, docs){
 	res.send(docs)
})}


module.exports = {
	addHabits : addHabits,
	getMetrics : getMetrics,
	welcomeCheck : welcomeCheck,
	textSetting : textSetting,
	numberSetting : numberSetting,
	Habit1Update : Habit1Update,
	Habit2Update : Habit2Update,
	Habit3Update : Habit3Update,
	checksettings : checksettings
}