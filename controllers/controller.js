var users = require('../models/model.js')
var mongoose = require('mongoose');
var db = mongoose.connection;
var twilio = require('twilio')

var accountSid = 'APfcbd7ab9a74519320629c60920c3a789'; 
var authToken = '2e9a7be1ba9cd9544c2b7739a92c670d';
const client = require('twilio')(accountSid, authToken);

incomingsms = function(req, res){
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
	twiml.message('Message received.');
	response.writeHead(200, {
		'Content-Type':'text/xml'
	});
	response.end(twiml.toString());
}

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

	                body: "It looks like you've already signed up.'",
	                to: number, 
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

	                body: "Thanks for signing up for Remind Me To :)",
	                to: number, 
	                from: "+15184810107"
	            },  function(err, responseData) { 
	            })
			})
		}
	}
)}

// incomingsms = function(req, res){

// 						if(req.body != "test"){

// 						client.messages.create({ 

// 	                body: "We received your message",
// 	                to: '+12039470215', 
// 	                from: "+15184810107"
// 	            },  function(err, responseData) { 
// 	            })
// 				    }else{
// 				    	console.log("nada")
// 				}
// 				res.send("<Response><Message>Hello from Twilio!</Message></Response>")
// 			}


module.exports = {
	webentry : webentry,
	incomingsms : incomingsms
}





