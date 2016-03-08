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
		{ 'username': req.user.username},
		{ $set:
			{
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

checkForTimes = function(req, res){
	var datex = new Date().getHours();
	console.log("got this far")
	user.find({ time: datex}, function(err, docs){
		console.log("controller")
		res.send(docs);

	})}

// function hello(re, res){
// 	client.messages.create({
// 	to: $scope.number, 
// 	from: "+13038482330", 
// 	body: "Yo",   
// }, function(err, doc) { 
// 	res.send(done);
// })
// }



module.exports = {
	addSettings : addSettings,
	addHabits : addHabits,
	checkForTimes: checkForTimes,
}