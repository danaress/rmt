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


// checkTime = function(req, res){

// 	users.find({}, function(err, doc){
// 		for (i=0; i<doc.length; i++){
// 			for(j=0; j<doc[i].messages.length; j++){
// 				var number = ("+"+(doc[i].username))
// 				// console.log("scheduled time = "+doc[i].messages[j].messageDate)
// 				if(moment(doc[i].messages[j].messageDate).format('llll') == timeNow){

// 						client.messages.create({
// 					    body: doc[i].messages[j].message,
// 					    to: number,  // Text this number
// 					    from: '+15184810107' // From a valid Twilio number
// 					})

// 				}else{
					
// 				}
// 			}
// 		}
// 				res.send(doc)
// 	}
// )



// }
// setTimeout(checkTime(),1000)
module.exports = {
	// checkTime : checkTime
}