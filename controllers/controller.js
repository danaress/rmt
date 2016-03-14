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
		console.log(err)
		console.log(doc)
	})
}

getMetrics = function(req, res){
	users.find(
		{'username': req.user.username},
 function(err, dox){
 	res.send(dox)
})}


getmodal = function(req, res){
	users.find(
		{'username': req.user.username},
 function(err, docs){
 	res.send(docs)
})}

welcomeCheck = function(req, res){
	users.find(
		{'username': req.user.username},
 function(err, docs){
 	res.send(docs)
})}


module.exports = {
	addHabits : addHabits,
	getMetrics : getMetrics,
	getmodal : getmodal
}