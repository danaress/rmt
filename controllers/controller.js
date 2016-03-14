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
		console.log(err)
		console.log(dox)
})}


getmodal = function(req, res){
	users.find(
		{'username': req.user.username},
 function(err, docs){
 	var testobj = {
 		0 : '12:00',
    1 : '1:00 ',
    2 : '2:00 ',
    3 : '3:00 ',
    4 : '4:00 ',
    5 : '5:00 ',
    6 : '6:00 ',
    7 : '7:00 ',
    8 : '8:00 ',
    9 : '9:00 ',
    1 : '10:00',
    1 : '11:00',
    1 : '12:00',
    1 : '1:00',>
    1 : '2:00',>
    1 : '3:00',>
    1 : '4:00',>
    1 : '5:00',>
    1 : '6:00',>
    1 : '7:00',>
    2 : '8:00',>
    2 : '9:00',>
    2 : '10:00',
    2 : '11:00',
 	}
 	res.send(docs, testobj)
})}


module.exports = {
	addHabits : addHabits,
	getMetrics : getMetrics,
	getmodal : getmodal
}