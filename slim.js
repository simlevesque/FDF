var express = require('express'),
	app     = express(),
	config  = require("./config"),
	formatListing = require('./formatListing'),
	casperWrapper = require('./casperWrapper'),
	fs      = require('fs');
	

app.get('/ajaxlisted', function(req, res){
	casperWrapper.run(res, "getListing", config.username, config.password, formatListing);
});

app.get('/', function(req, res){
	console.log("yo");
});

app.listen('3456');

exports = module.exports = app;