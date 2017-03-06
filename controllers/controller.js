var users = require('../models/model.js')
var mongoose = require('mongoose');
var db = mongoose.connection;


signup = function(req, res){
console.log(req.body.username)
var number = ("+1"+req.body.username)
	users.insert(
				{	
				username: req.body.username,
				messageTime: '4/1/2017',
				message: 'hello'
				},
			function(err, doc){
				res.send(doc)
	})
}

module.exports = {
	signup : signup
}





