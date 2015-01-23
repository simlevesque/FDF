//Get Ads Listing
var casper = require('casper').create(),
	username = casper.cli.args[0],
	password = casper.cli.args[1],
	urlA = "https://www.kiji",
	urlB = "ji.ca/m-m",
	urlC = "y-ads.html",
	url = urlA + urlB + urlC,
	baseSelectorA = "#MyKij",
	baseSelectorB = "ijiNavBar",
	baseSelector = baseSelectorA + baseSelectorB,
	nameSelectorA = "emailO",
	nameSelectorB = "rNickname",
	nameSelector = nameSelectorA + nameSelectorB,
	content,
	prices,
	dom,
	aynRand = function(){return Math.floor(Math.random()*750)},
	fs = require('fs');


//fix arguments
if(username.charAt(1) === "u"){
	username = username.slice(3);
	password = password.slice(3);
} else if (username.charAt(1) === "p"){
	username = password.slice(3);
	password = username.slice(3);
}

casper.options.waitTimeout = 10000;

//Log in
casper.start(url, function() {
	this.wait(aynRand(), function() {
		var data = {};
		data[nameSelector] = username;
		data['password'] = password;
		this.fill('form#login-form', data, true);
	});
});

//Once you are logged in
casper.waitForSelector(baseSelector, function() {
	this.wait(aynRand());

	prices = this.evaluate(function() {
		var array = [];
		for(var i = 0; i<$(".price-change-input").length; i++){
			array.push($(".price-change-input")[i].value.split(".")[0]);
		}
		return array.join(",");
	});

	this.wait(aynRand());

	var html = this.getHTML('.my-ads-active', true);
	fs.write("./cache/listing/dom.html", html, "w");
	fs.write("./cache/listing/prices.json", JSON.stringify(prices), "w");
});

//print the html
casper.run(function() {
	this.exit();
});