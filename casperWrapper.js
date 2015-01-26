var casperWrapper = {},
	path = require('path'),
	childProcess = require('child_process'),
	formatListing = require('./formatListing');

casperWrapper.arguments = function(script, un, pw) {
	var scriptPath = path.join(__dirname, (script + ".js")),
		username = '-u=' + un,
		password = '-p=' + pw;

	return ["--engine=slimerjs", scriptPath, username, password];//Feed arguments
}

casperWrapper.run = function(res, script, un, pw){
	var data,
		args = casperWrapper.arguments(script, un, pw);

	var child = childProcess.spawn("casperjs", args);//Spawn the process
	
	child.stdout.on('data', function(fragment){
		data = data + fragment;
	});

	child.on('close', function() {
		if(!data){
			formatListing(res);
		} else {
			console.log(data);
		}
	});
}

exports = module.exports = casperWrapper;