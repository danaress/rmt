// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var twilio = require('twilio');
var Twilio = require('twilio-js');



app.use(express.static(__dirname + '/public'));

// Body Parser Setup
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
var client = new twilio.RestClient(accountSid, authToken);
// const client = require('twilio')(accountSid, authToken);


// Routes

app.post('/signup1', controller.webentry);


// app.post("/incomingsms", function (request, response) {
//   console.log(req.body); 
//   response.send("<Response></Response>")
// });

app.post('/incomingsms', function(req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// app.post('/test', controller.test);


// app.post('/incomingsms', controller.incomingsms);



// Testing Twilio
app.post('/test', function(req, res){
	console.log("should be sending text")
client.messages.create({
    body: 'Hello from Node',
    to: '+12039470215',  // Text this number
    from: '+15184810107' // From a valid Twilio number
}, function(err, message) {
    if(err) {
        console.error(err.message);
    }
})
    })


app.get('/', function(req, res) {
	res.sendFile('/index.html', {root : './public'});
});

// Creating Server and Listening for Connections \\
var port = 80
app.listen(port, function(){
  console.log('*** Server running on port ' + port + " ***");

})