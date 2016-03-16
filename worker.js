
var user = require('./models/model.js')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/users', function(err){
	if (err) console.log(err)
})

var accountSid = 'AC49f665c07dac0c475d23f634e9df43cb'; 
var authToken = '2e9a7be1ba9cd9544c2b7739a92c670d';
var client = require('twilio')(accountSid, authToken);



        function tick()
			{
			    //get the mins of the current time
			    var mins = new Date().getMinutes();
			    if(mins == 00){
				var datex = new Date().getHours() - 2;
				console.log(datex)
				console.log("got this far")
				var x = user.find({ time: datex}, function(err, docs){
			    for (i=0; i < docs.length; i++){

			    client.messages.create({ 
				to: +docs[i].number, 
				from: "+13038482330", 
				body: "'Hey " + docs[i].username + ", did you meet your goals for today? " + docs[i].habit1 + ", " + docs[i].habit2 + ", " + docs[i].habit3 + "? (Y N Y)",   
			},  function(err, responseData) { 
			})
				}})}}
		tick();
setInterval(function() { tick(); }, 60000);




module.exports = {
	tick : tick
}