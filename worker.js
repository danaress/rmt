
var user = require('./models/model.js')

var accountSid = 'AC49f665c07dac0c475d23f634e9df43cb'; 
var authToken = '2e9a7be1ba9cd9544c2b7739a92c670d';
var client = require('twilio')(accountSid, authToken);
console.log("worker working!!!!!");



        function tick()
			{
			    //get the mins of the current time
			    var mins = new Date().getMinutes();
			    if(mins == 00){
				var datex = new Date().getHours();
				console.log("got this far")
				var x = user.find({ time: datex}, function(err, docs){
					console.log(docs.length)
				
			    for (i=0; i < docs.length; i++){
			    console.log(docs[i].number)

			    client.messages.create({ 
				to: docs[i].number, 
				from: "+13038482330", 
				body: "Yo",   
			},  function(err, responseData) { 
				console.log('done'); 
			})
				}})}}
		// tick();
setInterval(function() { tick(); }, 100000);



smsTest = function(req, res){
    //Validate that this request really came from Twilio...
    // if (twilio.validateExpressRequest(req, 'authToken')) {
    	var x = req.param('Body')
        console.log(x)
    }




module.exports = {
	tick : tick,
	smsTest : smsTest
}