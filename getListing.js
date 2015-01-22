//Get Ads Listing
var casper = require('casper').create(),
	username = casper.cli.options["un"].replace(/"/g, ''),
	password = casper.cli.options["pw"].replace(/"/g, ''),
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
	aynRand = function(){return Math.floor(Math.random()*2000)};
	
casper.options.waitTimeout = 20000;

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
	this.click('.icon-edit');
    content = [this.getHTML('.my-ads-active', true), prices];
	this.wait(aynRand());
});

casper.then(function(){
	this.echo("HTML : " + content[0]);
});

casper.then(function(){
	this.echo("PRICES : " + content[1]);
});

//print the html
casper.run(function() {
	this.exit();
});

