var fs = require("fs"),
	cheerio = require("cheerio");

var formatListing = function(res){
	fs.readFile('./cache/listing/dom.html', "utf-8", function(err, dom){
		$ = cheerio.load(dom);
		fs.readFile('./cache/listing/prices.json', "utf-8", function(err, prices){
			var rightFormat = formatGetListing($, prices)
			res.end(rightFormat);
		});
	});
}

exports = module.exports = formatListing

var formatGetListing = function($, prices){
	var i = 0, result = [];
	$(".item-enabled").filter(function(){
		var ad = {};
		
		ad["name"] = $(this).find(".title-text").text().replace(/\s+/g,' ').trim();

		ad["category"] = $(this).find("dd[id^=CategoryLink]").text().replace(/\s+/g,' ').trim().split(" > ").map(uppercaseFirstLetter);
		
		ad["posted"] = formatDate($(this).find(".posted-column").text().replace(/\s+/g,' ').trim());

		ad["visits"] = parseInt($(this).find(".ad-views-column").text().replace(/\s+/g,' ').trim());

		var tmpOnpage = $(this).find(".ad-page-column").text().replace(/\s+/g,' ').trim();

		if(tmpOnpage.charAt(0) === ">") ad["onpage"] = tmpOnpage
		else ad["onpage"] = parseInt(tmpOnpage)

		ad["price"] = parseInt(prices[i]);
		
		result.push(ad);
		i++;
	});

	return JSON.stringify(result);
}

var formatDate = function(date) {
	var result = {};
	date = date.split("-");
	result.day = parseInt(date[0]);
	result.month = detectMonth(date[1]);
	result.year = parseInt("20" + date[2]);

	return date;
}

var uppercaseFirstLetter = function(entry) {
	return entry.charAt(0).toUpperCase() + entry.slice(1);
}

var detectMonth = function(month) {
	if(month === "Jan"){ //Janvier
		month = "Janvier";
	} else if(month === "Feb"){ //Février
		month = "Février";
	} else if(month === "Mar"){ //Mars
		month = "Mars";
	} else if(month === "Apr"){ //Avril
		month = "Avril";
	} else if(month === "May"){ //Mai
		month = "Mai";
	} else if(month === "Jun"){ //Juin
		month = "Juin";
	} else if(month === "Jul"){ //Juillet
		month = "Juillet";
	} else if(month === "Aug"){ //Août
		month = "Août";
	} else if(month === "Sep"){ //Septembre
		month = "Septembre";
	} else if(month === "Oct"){ //Octobre
		month = "Octobre";
	} else if(month === "Nov"){ //Novembre
		month = "Novembre";
	} else if(month === "Dec"){ //Décembre
		month = "Décembre";
	}

	return month;
};