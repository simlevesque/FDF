var express = require('express'),
	app     = express(),
	config  = require("./config"),
	formatListing = require('./formatListing'),
	casperWrapper = require('./casperWrapper'),
	fs      = require('fs');
	

app.get('/ajaxlisted', function(req, res){
	casperWrapper.run(res, "getListing", config.username, config.password, formatListing);
});

app.listen('8081');

casperWrapper.run("", "getListing", config.username, config.password, formatListing);

exports = module.exports = app;