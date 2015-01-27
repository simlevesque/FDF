var cur = 0,
	adress = ["ji", "ki"],
	adr = "http://www." + adress[1] + adress[0] + adress[0] + ".ca";

var loading = setInterval(function(){
	console.log(cur);
	if(cur === 0){
		document.querySelector(".nbAds").innerHTML = " chargement ..&nbsp; ";
		cur++;
	} else if (cur === 1){
		document.querySelector(".nbAds").innerHTML = " chargement ... ";
		cur++;
	} else if (cur === 2){
		document.querySelector(".nbAds").innerHTML = " chargement .&nbsp;&nbsp; ";
		cur = 0;
	}
}, 550);

var request = new XMLHttpRequest();
request.open('GET', "http://dev.amkroma.com/ajaxListed.json", true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response),
		fullNewHtml = "";
	clearInterval(loading);
	document.querySelector(".nbAds").innerHTML = data.length;
	for(i = 0;i<data.length;i++){
		var cur = data[i],
			newHtml,
			jour = cur.posted.j,
			mois = cur.posted.m,
			annee = cur.posted.a,
			htmlDate = "<span class='jour'>" + jour + "</span><span class='mois'>" + mois + "</span><span class='annee'>" + annee + "</span>";
			titre = cur.name,
			prix = cur.price + " $",
			visites = cur.visits,
			page = cur.onpage,
			url = adr + cur.url,
			htmlCate = "";
			cur.category.forEach(function(val,index,array){
				if(index !== array.length-1){
					val = val + " > ";
				}
				htmlCate = htmlCate + "<span class='cate'>" + val + "</span>";
			});
		newHtml = "<tr><th>" + htmlDate + "</th><th>" + htmlCate + "</th><th><a href='" + url + "'>" + titre + "</a></th><th>" + prix + "</th><th>" + visites + "</th><th>" + page + "</th><th>xxx</th></tr>";
		
		fullNewHtml = fullNewHtml + newHtml;
	}
	document.querySelector("tbody").innerHTML = fullNewHtml;
  } else {
    // We reached our target server, but it returned an error
	console.log("fail !");
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();