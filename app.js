// Requires \\
var express = require('express');
var app = express();
var worker = require('./worker.js')
var twilio = require('twilio');
var Twilio = require('twilio-js');



app.use(express.static(__dirname + '/public'));

// Body Parser Setup
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var controller = require("./controllers/controller.js")



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
const client = require('twilio')(accountSid, authToken);


// Routes

app.post('/signup1', controller.webentry);
// app.post("/incomingsms", function (req, res) {
//   console.log(req.body); 
//   res.send("<?xml version='1.0' encoding='UTF-8'?><Response><Message>Hello</Message></Response>")
// });

app.post('/incomingsms', function(req, res) {
					client.messages.create({ 
	                body: "Hey",
	                to: "+12039470215", 
	                from: "+15184810107"
	            },  function(err, responseData) { 
	            })	
});





// Testing Twilio
// app.post('/signup1', function(req, res){
//     var number = ("+1"+req.body.username)
// client.messages.create({ 

//                 body: "Hello :)",
//                 to: number, 
//                 from: "+15184810107"
//             },  function(err, responseData) { 
//             })
// console.log(number)
//     })


app.get('/', function(req, res) {
	res.sendFile('/index.html', {root : './public'});
});

// Creating Server and Listening for Connections \\
var port = 80
app.listen(port, function(){
  console.log('*** Server running on port ' + port + " ***");

})