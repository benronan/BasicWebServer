//node modules
var express = require('express');
var app = express();

//global vars
var port = 8080;

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
	console.log('Client [%s] request for %s', message.socket.address().address, message.url);
});
	
//default get request
app.get(['/','/index'], function(req,res) {
	res.send('index');
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
