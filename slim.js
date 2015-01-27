var express = require('express'),
	app     = express(),
	config  = require("./config"),
	casperWrapper = require('./casperWrapper'),
	fs      = require('fs');
	path      = require('path');
	
app.use(express.static(path.join(__dirname, 'public')));
	
app.get('/ajaxlisted', function(req, res){
	casperWrapper.run(res, "getListing", config.username, config.password, {});
});


app.listen('3456');

exports = module.exports = app;