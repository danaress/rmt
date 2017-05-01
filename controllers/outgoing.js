var users = require('../models/model.js')
var mongoose = require('mongoose');
var db = mongoose.connection;
var twilio = require('twilio')
var date = require('datejs')
var moment = require('moment')


var accountSid = 'AC49f665c07dac0c475d23f634e9df43cb'; 
var authToken = '2e9a7be1ba9cd9544c2b7739a92c670d';
const client = require('twilio')(accountSid, authToken);

var timeNow = moment().format('llll')


checkTime = function(req, res){

	users.find({}, function(err, doc){
		for (i=0; i<doc.length; i++){
			for(j=0; j<doc[i].messages.length; j++){
				var number = ("+"+(doc[i].username))
				// console.log("scheduled time = "+doc[i].messages[j].messageDate)
				if(doc[i].messages[j].messageDate == 'Sun, May 7, 2017 6:15 PM'){

						client.messages.create({
					    body: doc[i].messages[j].message,
					    to: number,  // Text this number
					    from: '+15184810107' // From a valid Twilio number
					})

				}else{
					
				}
			}
		}
				res.send(doc)
	}
)



}


setInterval(function() { checkTime(); }, 60000);

module.exports = {
	checkTime : checkTime
}