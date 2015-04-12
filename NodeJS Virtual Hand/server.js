// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

var configDB = require('./config/database.js');

// configuration ===============================================================
mongodb_connection_string = 'mongodb://sgoldman:sgoldman@ds059471.mongolab.com:59471/app_users'; // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
if(process.env.OPENSHIFT_MONGODB_DB_URL){
	  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'virtualhandnode';
}
mongoose.connect(mongodb_connection_string);
//mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port, server_ip_address);
console.log('The magic happens on port ' + port);
