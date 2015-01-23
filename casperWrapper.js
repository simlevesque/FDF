var casperWrapper = {},
	path = require('path'),
	childProcess = require('child_process');

casperWrapper.arguments = function(script, un, pw) {
	var scriptPath = path.join(__dirname, (script + ".js")),
		username = '-u=' + un,
		password = '-p=' + pw;

	return ["--engine=slimerjs", scriptPath, username, password];//Feed arguments
}

casperWrapper.run = function(res, script, un, pw, callback){
	var data,
		args = casperWrapper.arguments(script, un, pw);

	var child = childProcess.spawn("casperjs", args);//Spawn the process
	
	child.stdout.on('data', function(fragment){
		data = data + fragment;
	});

	child.on('close', function() {
		if(!data){
			callback(res);
		} else {
			console.log(data);
		}
	});
}

exports = module.exports = casperWrapper;