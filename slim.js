var path = require('path'),
	childProcess = require('child_process'),
	fs      = require('fs'),
	express = require('express'),
	app     = express(),
	cheerio = require('cheerio'),
	config  = require("./config.js"),
	child;

app.get('/ajaxlisted', function(req, res){
	var answer = fs.readFileSync("./test.html");
	res.end(answer);
});

app.listen('8081');

exports = module.exports = app;

	
	
	
	
	
	
	
var childArgs = function(script, un, pw) {
	script = script + ".js";//Append extension
	un = '--un="' + un + '"';//Format arguments
	pw = '--pw="' + pw + '"';
	
	return ["--engine=slimerjs", path.join(__dirname, script), un, pw];//Feed arguments
}

var runScript = function(res, script, un, pw){
	child = childProcess.spawn("casperjs", childArgs(script, un, pw));//Spawn the process
	child.stdout.on('data', reception);
}


var noScript = function(script, un, pw){
	var data = fs.readFileSync("./test.html");
	var $ = cheerio.load(data);
	
	var prices = [];
	$(".item-enabled").filter(function(){
		prices.push(666);
	});
	formatGetListing($, prices);
}

var result = [];

var tmpResult = {};

var reception = function(content) {//What to do on output
	var prices, data, $;
	content = String(content);//Normalize type
	
	if(content.indexOf("HTML : ") === 0){ //Output or error
		data = content.slice(7);//Format output
		fs.writeFileSync("./test.html", data);
		tmpResult.dom = cheerio.load(data);
	}else if(content.indexOf("PRICES : ") === 0){
		tmpResult.prices = content.slice(9).split(",");
	} else console.log("casperjs error : " + data);
	if(Object.keys(tmpResult).length === 2) {
		formatGetListing(tmpResult.dom, tmpResult.prices);
		tmpResult = {};
	}	
}

var formatGetListing = function($, prices){
	var i = 0;
	$(".item-enabled").filter(function(){
		var ad = {};
		
		ad["name"] = $(this).find(".title-text").text().replace(/\s+/g,' ').trim();
		ad["category"] = $(this).find("dd[id^=CategoryLink]").text().replace(/\s+/g,' ').trim().split(" > ").map(uppercaseFirstLetter);
		ad["posted"] = formatDate($(this).find(".posted-column").text().replace(/\s+/g,' ').trim());
		ad["visits"] = parseInt($(this).find(".ad-views-column").text().replace(/\s+/g,' ').trim());
		ad["onpage"] = parseInt($(this).find(".ad-page-column").text().replace(/\s+/g,' ').trim());
		ad["price"] = parseInt(prices[i]);
		
		result.push(ad);
		i++;
	});
	console.log(result);
	fs.writeFileSync("./listing.json", JSON.stringify(result));
}

var uppercaseFirstLetter = function(entry) {
	return entry.charAt(0).toUpperCase() + entry.slice(1);
}
var detectMonth = function(month) {
	var firstChar = month.charAt(0);
	
	if(month === "Jan"){ //Janvier
		month = "Janvier";
	}
	if(month === "Feb"){ //Février
		month = "Février";
	}
	if(month === "Mar"){ //Mars
		month = "Mars";
	}
	if(month === "Apr"){ //Avril
		month = "Avril";
	}
	if(month === "May"){ //Mai
		month = "Mai";
	}
	if(month === "Jun"){ //Juin
		month = "Juin";
	}
	if(month === "Jul"){ //Juillet
		month = "Juillet";
	}
	if(month === "Aug"){ //Août
		month = "Août";
	}
	if(month === "Sep"){ //Septembre
		month = "Septembre";
	}
	if(month === "Oct"){ //Octobre
		month = "Octobre";
	}
	if(month === "Nov"){ //Novembre
		month = "Novembre";
	}
	if(month === "Dec"){ //Décembre
		month = "Décembre";
	}

	return month;
}

var formatDate = function(date) {
	var result = {};
	date = date.split("-");
	result.day = parseInt(date[0]);
	result.month = detectMonth(date[1]);
	result.year = parseInt("20" + date[2]);
	
	return result;
}
runScript("getListing", config.username, config.password);