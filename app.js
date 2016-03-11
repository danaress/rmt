// Requires \\
var express = require('express');
var app = express();
var worker = require('./worker.js')

app.use(express.static(__dirname + '/public'));


// Express Session //
var session = require('express-session')

app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
})
app.use(app.sessionMiddleware)

// Body Parser Setup
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var controller = require("./controllers/controller.js")



// Database
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/users', function(err){
	if (err) console.log(err)
		console.log("connected to mongo")
})
var User = require('./models/model.js')



////////////// Twili0 ///////////

var accountSid = 'AC49f665c07dac0c475d23f634e9df43cb'; 
var authToken = '2e9a7be1ba9cd9544c2b7739a92c670d';
var client = require('twilio')(accountSid, authToken);




// Passport
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var bcrypt = require('bcryptjs')
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            // If we got this far, then we know that the user exists. But did they put in the right password?
            bcrypt.compare(password, user.password, function(error, response){
                if (response === true){
                    return done(null,user)
                }
                else {
                    return done(null, false)
                }
            })
        });
    }
));

app.isAuthenticated = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    console.log('get outta here!')
    res.redirect('/');
}


app.isAuthenticatedAjax = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    res.send({error:'not logged in'});
}

app.isSteveAuthenticated = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated() && req.user.permissions.admin === true){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    res.redirect('/');
}
/** End Passport Config **/


app.get('/', function(req, res){
    if (!req.session.count ) { req.session.count = 0}
    console.log(req.session.count++)
    console.log(req.user)
    res.sendFile('/html/login.html', {root: './public'})
})

// app.post('/test', worker.smsTest)

app.post('/test', function (req, res) {
	var x = req.body.Body.split(' ')
    console.log(Date.parse(req.body.Date))
    var y = Date.parse('req.body.Date')
    console.log("This is the date: " + y)
		var num = req.body.From
		console.log(y)
		console.log(num.slice(1))
	User.update(
		{ 'number': num},
		{ $push:
			{
                
				array1: [x[0], y],
				array2: [x[1], y],
				array3: [x[2], y],
		}
	}, function(err, doc){
		console.log(err)
		console.log(doc)
	})
console.log(x)
 res.sendStatus(200);
});

// app.post('/settings', controller.addSettings);

app.post('/habits', controller.addHabits);

app.post('/modal', controller.getmodal);

app.post('/metrics', controller.getMetrics);

app.post('/signup', function(req, res){
	console.log("111");
    bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
                number: req.body.number,
            });
            newUser.save(function(saveErr, user){
                if ( saveErr ) { res.send({ err:saveErr }) }
                else {
                    req.login(user, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }) }
                        else { res.send({success: 'success'}) }
                    })
                }
            })

        })
    })
})

app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            console.log("Logged in")
            return res.send({success:'success'});
        });
    })(req, res, next);
})


// 2 kinds of middleware
// app.use is like 'vertical middleware'. They get evaluated from top to bottom.
// there is also inline, or 'horizontal' middleware.
app.get('/dashboard', app.isAuthenticated, function(req, res){
	console.log(req.user)
    res.sendFile('/dashboard.html', {root: './public'})
})

app.get('/api/me', app.isAuthenticatedAjax, function(req, res){
    res.send({user:req.user})
})




app.get('/', function(req, res) {
	res.sendFile('/index.html', {root : './public'});
});

// Creating Server and Listening for Connections \\
var port = 80
app.listen(port, function(){
  console.log('*** Server running on port ' + port + " ***");

})