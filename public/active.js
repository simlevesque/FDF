var request = new XMLHttpRequest();
request.open('GET', "http://dev.amkroma.com/ajaxListed", true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);
	console.log(data);
	var currHtml = document.querySelector("tr").innerHTML, fullNewHtml = "";
	document.querySelector(".nbAds").innerHTML = data.length; 
	for(i = 0;i<data.length;i++){
		var cur = data[i],
			newHtml,
			jour = cur.posted.j,
			mois = cur.posted.m,
			annee = cur.posted.a,
			htmlDate = "<span class='jour'>" + jour + "</span><span class='mois'>" + mois + "</span><span class='annee'>" + annee + "</span>";
			titre = cur.name,
			prix = cur.prix,
			visites = cur.visits,
			page = cur.onpage;
		
		newHtml = "<tr><th>" + htmlDate + "</th><th>" + titre + "</th><th>" + prix + "</th><th>" + visites + "</th><th>" + page + "</th><th>xxx</th></tr>";
		
		fullNewHtml = fullNewHtml + newHtml;
	}
	document.querySelector("tbody").innerHTML = currHtml + fullNewHtml;
  } else {
    // We reached our target server, but it returned an error
	console.log("fail !")
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

