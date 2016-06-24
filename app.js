//node modules
var express = require('express');
var fs = require('fs');
var pug = require('pug');
var app = express();
app.set('view engine', 'pug');

//includes
var common = require('./common');

// variable instantiation
var port = 8080;
var requestLogFile = "./log/requests.txt"

//instantiate and listen to requests
var instance = app.listen(port, function() {
		var host = instance.address().address;
		var port = instance.address().port;
		console.log('Server listening at http://%s:%s', host, port);
	});
	
//server going down
instance.on('close', function() {
	console.log('SERVER GOING DOWN');
});

//tcp socket connected
instance.on('connect', function(socket) {
	console.log('Client connnected %s',socket.address());
});

//log request activity
instance.on('request', function(message) {
	  //console.log('Client [%s] request for %s', message.socket.address().address, message.url);
		fs.appendFile(requestLogFile, new Date() + '\tClient [' + message.socket.address().address +'] request for [' + message.url+ ']\n', function(err) {
		if(err) {
			console.log("Error writing to log file: %",err);
		}
	}); 
});
	
//default get request
app.get(['/','/index'], function(req,res) {
	res.render( 'index',{'request': req, 'datetime' : (new Date()).toString()} );
});

//help
app.get('/help', function(req,res) {
	res.send('You need some help');
});

//handle all undefined gets to redirect to default
//this needs to be the last get method defined
app.get('/*', function(req, res) {
	res.redirect('/index');
});
