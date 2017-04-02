var users = require('../models/model.js')
var mongoose = require('mongoose');
var db = mongoose.connection;
var twilio = require('twilio')

var accountSid = 'AC49f665c07dac0c475d23f634e9df43cb'; 
var authToken = '2e9a7be1ba9cd9544c2b7739a92c670d';
const client = require('twilio')(accountSid, authToken);


test = function(req, res){
	var body1 = req.body.Body
	var includesRMT = body1.indexOf("remind me to")

checkFormat = function(){
	if (includesRMT>0){
	client.messages.create({
    body: body1,
    to: '+12039470215',  // Text this number
    from: '+15184810107' // From a valid Twilio number
}, function(err, message) {
    if(err) {
        console.error(err.message);
    }
})
	} else {

	// if the sms doesn't include "Remind Me To" they get this message.
	client.messages.create({
    body: body1,
    to: '+12039470215',  // Text this number
    from: '+15184810107' // From a valid Twilio number
}, function(err, message) {
    if(err) {
        console.error(err.message);
    }
})
	}
}
	checkFormat();


}



webentry = function(req, res){
var number = ("+1"+req.body.username)
console.log(req.body)
var userWebEntry = 
			{
				username : req.body.username,
				messageTime : '4/1/2017',
				message : 'test'
			}
			// console.log(userWebEntry)
	// Seeing if the user already exists in the database form their phone number.
	users.find({username: req.body.username}, function(err, doc){
				console.log("does user exist?")
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

module.exports = {
	webentry : webentry,
	test : test
}





