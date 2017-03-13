var users = require('../models/model.js')
var mongoose = require('mongoose');
var db = mongoose.connection;




webentry = function(req, res){
var number = ("+1"+req.body.username)
var userWebEntry = 
			{
				username : req.body.username,
				messageTime : '4/1/2017',
				message : 'test'
			}
	// Seeing if the user already exists in the database form their phone number.
	users.find({username: req.body.username}, function(err, doc){
				console.log(err)
				console.log(doc)
				res.send(doc)

				// If they exist in the database
				if(doc[0]){

					// Send this text message
					client.messages.create({ 

	                body: "It looks like you already started an account.",
	                to: '+12039470215', 
	                from: "+15184810107"
	            },  function(err, responseData) { 
	            })			
           		// If they don't exist in the database
				} else {

				// Add them to the database
				users.create(userWebEntry, function(err, doc){
				console.log(err)
				
					// And send them this text message
					client.messages.create({ 

	                body: "Welcome new user :)",
	                to: '+12039470215', 
	                from: "+15184810107"
	            },  function(err, responseData) { 
	            })
			})
		}
	}
)}

module.exports = {
	webentry : webentry
}





