// Requires \\
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var twilio = require('twilio');
var date = require('datejs')
var moment = require('moment')

// var Twilio = require('twilio-js');



app.use(express.static(__dirname + '/public'));

// Body Parser Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var controller = require("./controllers/controller.js")
var outgoing = require("./controllers/outgoing.js")




// Database
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users', function(err){
	if (err) console.log(err)
		// console.log("connected to mongo")
})
var db = mongoose.connection;
var users = require('./models/model.js')



////////////// Twili0 ///////////
var accountSid = 'AC49f665c07dac0c475d23f634e9df43cb'; 
var authToken = '2e9a7be1ba9cd9544c2b7739a92c670d';
var client = new twilio.RestClient(accountSid, authToken);
// const client = require('twilio')(accountSid, authToken);


// Routes
app.post('/signup1', controller.webentry);

// testing twilio http request in server.
// app.post('/test', function(req, res) {
//  var twilio = require('twilio');
//   var twiml = new twilio.TwimlResponse();
//   twiml.message('The Robots are coming! Head for the hills!');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

app.post('/test', function(req, res){

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
			{'username':from},
			{$push: 
					{messages :{
						messageDate:formattedDate,
						message:messageBody
					}
				}
			}, 
			function(err, doc){
			console.log("err = "+err)
			console.log(doc)

	}
)

	}
	// end of else statement
}
	checkFormat();
	res.send("<?xml version='1.0' encoding='UTF-8'?><Response></Response>")
})
// 
// END OF FUNCTION FROM CONTROLLER
// 










// app.post('/importData', controller.importData);
app.post('/checkTime', outgoing.checkTime);




app.get('/', function(req, res) {
	res.sendFile('/index.html', {root : './public'});
});

// Creating Server and Listening for Connections \\
var port = 80
app.listen(port, function(){
  console.log('*** Server running on port ' + port + " ***");

})