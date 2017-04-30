var users = require('../models/model.js')
var mongoose = require('mongoose');
var db = mongoose.connection;
var twilio = require('twilio')
var date = require('datejs')
var moment = require('moment')
var bodyParser = require('body-parser');



var accountSid = 'AC49f665c07dac0c475d23f634e9df43cb'; 
var authToken = '2e9a7be1ba9cd9544c2b7739a92c670d';
const client = require('twilio')(accountSid, authToken);
// var fakedata = [
// {
// 	username:"2039470215",
// 	messages: {
// 	messageDate:"4/24/17",
// 	message:"Testing more!"
// }
// }]

test = function(req, res){

	// Body of SMS
	var originalMessage = req.body.Body
	var from = req.body.from
	// var originalMessage = "Remind me to call mom// saturday at 3:54pm"

	// slice must equal 'remind me to' or it fails format test
	var sliced = originalMessage.toLowerCase().slice(0,12)

	// End of message options
	var endChar;

	// variable for am or pm
	var meridian;


	if(originalMessage.includes("//")){
        endChar = "//"
    } else if(originalMessage.includes("--")) {
        endChar = "--"
    } else if(originalMessage.includes("~~")){
        endChar = "~~"
    } else {
        endChar = false
    }


	var endCharIndex = originalMessage.indexOf(endChar)
	var messageBody = originalMessage.slice(12,endCharIndex)

	// console.log("message body = "+ messageBody)
	var dayTime = originalMessage.toLowerCase().slice(endCharIndex+2)  
	// console.log("daytime = "+dayTime)

	if(dayTime.toLowerCase().includes('am')){
	    meridian = 'am'
	} else if(dayTime.toLowerCase().includes('pm')) {
	    meridian = 'pm'
	} else {
	    meridian = false;
	}



    if ((endChar = false) || (sliced != 'remind me to') || (meridian = false)){
    	var formatCheck = false
    } else {
    	formatCheck = true
    }	

checkFormat = function(){
	if (formatCheck = false){
	client.messages.create({
    body: "please check the correct format.",
    to: '+12039470215',  // Text this number
    from: '+15184810107' // From a valid Twilio number
}, function(err, message) {
    if(err) {
        console.error(err.message);
    }
})
	} else {

	// if the sms passes the format check, send to DB.

	// Index of End of Message
	
	// Body of message cutting 'remind me to' and end of message

	var dayVal;
	var nextWeek;
	var dayName;
	var numDays;
	var today = new Date;
	var todayNum = today.getDay()



	if (dayTime.includes('sunday')){
	    dayName = 'sunday'
	    dayVal = 0
	} else if (dayTime.includes('monday')){
	    dayName = 'monday'
	    dayVal = 1
	} else if (dayTime.includes('tuesday')){
	    dayName = 'tuesday'
	    dayVal = 2
	} else if (dayTime.includes('wednesday')){
	    dayName = 'wednesday'
	    dayVal = 3
	} else if (dayTime.includes('thursday')){
	    dayName = 'thursday'
	    dayVal = 4
	} else if (dayTime.includes('friday')){
	    dayName = 'friday'
	    dayVal = 5
	} else if (dayTime.includes('saturday')){
	    dayName = 'saturday'
	    dayVal = 6
	}
// console.log(dayName)

	if (dayTime.includes("next") && dayTime.indexOf("next") < dayTime.indexOf(dayName)){
	    nextWeek = true
	    numDays = ((dayVal - todayNum) + 7)
	    console.log("send in days1 = " + numDays)
	} else if((dayVal - todayNum) <= -1){
	    nextWeek = true
	    numDays = ((dayVal - todayNum) + 7)
	    // console.log("send in days2 = " + numDays)
	} else {
	    nextWeek = false
	    numDays = (dayVal - todayNum)
	    // console.log("send in days3 = " + numDays)
	}

var messageDate = today.addDays(numDays)

var time = dayTime.slice(dayTime.indexOf(meridian)-6)

if(time.slice(0,1)==' '){
    time = dayTime.slice(dayTime.indexOf(meridian)-5)
} else {
    time = dayTime.slice(dayTime.indexOf(meridian)-6)
}

var newDate = messageDate.at(time)
var formattedDate = moment(newDate).format('llll')


users.update(
			{'username':req.body.From},
			{$push: 
					{messages :{
						messageDate:'4/30/17',
						message:'nlkjnljnkljnlkjn'
					}
				}
			}, 
			function(err, doc){
			console.log("err = "+err)
			console.log(doc)
		res.send("<?xml version='1.0' encoding='UTF-8'?><Response></Response>")
	}
)

	}
	// end of else statement
}
	checkFormat();

}



webentry = function(req, res){
var number = ("+1"+req.body.username)
console.log(req.body)
var userWebEntry = 
			{
				username : req.body.username
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





