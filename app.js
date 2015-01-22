var phantom = require("phantom"),
	express = require('express'),
	fs      = require('fs'),
	cheerio = require('cheerio'),
	app     = express(),
	config  = require("./config.js"),
	baseUrlA = "https://www.ki",
	baseUrlB = "jiji.ca",
	baseUrl = baseUrlA + baseUrlB;
var request = request.defaults({jar: true});

app.get('/ajaxListed', function(req, res){
    EZConnect(req, res, url, activeAds);
});

var url = baseUrl + '/m-my-ads.html';

EZConnect('', '', url, activeAds);
	
app.listen('8081');

exports = module.exports = app;


function EZConnect(req, res, url, callback){
	var postConnection = {};
    request(url, function(error, response, html){
        if(!error){
			//console.log(response.headers["set-cookie"]);
			console.log(response.request.req["_header"]);
			console.log(response.headers);
            var $ = cheerio.load(html);
			if (!!$("#login-form").html()){
				var next;
				$("#login-form").filter(function(){
					next = baseUrl + $(this).attr("action");
				});
				$("#login-form input").filter(function(){
					postConnection[$(this).attr("name")] = $(this).attr("value");
				});
				$("#SearchLocationId").filter(function(){
					$(this).attr("value")
				});
				
				postConnection["emailOrNickname"] = config.username;
				postConnection["password"] = config.password;
				postConnection["externalEmail"] = "";
				postConnection["externalIdentifier"] = "";
				request({
					uri: next,
					method: "POST",
					form: postConnection
				}, function(error, response, body) {
					console.log(response.request.req["_header"]);
				});
			} else callback($, res);
        } else console.log("error");
    });
}


phantom.create(function(ph){
		ph.createPage(function (page) {
			function handleOpen(item){
				page.open(item[0], function (status) {
					page.evaluate(item[1], function (result) {
						if (!!result) indie.emit("update",  result);
						else indie.emit("error",  item[2]);
						setTimeout(nextOpen,1000);
					});
				});
			}
			
			function nextOpen(){
				var item = shifting.shift();
				
				if(typeof item === "undefined") {}
				else handleOpen(item)
			}
			nextOpen();
		});
	});

function EZConnect(req, res, url, callback){
	var postConnection = {};
    request(url, function(error, response, html){
        if(!error){
			//console.log(response.headers["set-cookie"]);
			console.log(response.request.req["_header"]);
			console.log(response.headers);
            var $ = cheerio.load(html);
			if (!!$("#login-form").html()){
				var next;
				$("#login-form").filter(function(){
					next = baseUrl + $(this).attr("action");
				});
				$("#login-form input").filter(function(){
					postConnection[$(this).attr("name")] = $(this).attr("value");
				});
				$("#SearchLocationId").filter(function(){
					$(this).attr("value")
				});
				
				postConnection["emailOrNickname"] = config.username;
				postConnection["password"] = config.password;
				postConnection["externalEmail"] = "";
				postConnection["externalIdentifier"] = "";
				request({
					uri: next,
					method: "POST",
					form: postConnection
				}, function(error, response, body) {
					console.log(response.request.req["_header"]);
				});
			} else callback($, res);
        } else console.log("error");
    });
}

function activeAds($, res){
	
}