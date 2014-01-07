function defval(val1, defvalue)
{
	return (val1 && val1 != undefined) ? val1 : defvalue;
}

function loadStations() {
	var stations = {from: {code: defval(localStorage.fromStationCode, "HBB"), name: defval(localStorage.fromStationName, "哈尔滨")},
		    to: {code: defval(localStorage.toStationCode, "BJP"), name: defval(localStorage.toStationName, "北京")}
	};
	return stations;
}

function loadLogins() {
	var logins = {username: defval(localStorage.username, ""), password: defval(localStorage.password, "")};
	return logins;
}

function saveStations(stations) {
	console.log ("prepare to save stations " + stations.from.code + " --> " + stations.to.code);
	localStorage.fromStationCode = stations.from.code;
	localStorage.fromStationName = stations.from.name;
	localStorage.toStationCode = stations.to.code;
	localStorage.toStationName = stations.to.name;
	return true;
}

function saveLogins(logins) {
	localStorage.username = logins.username;
	localStorage.password = logins.password;
	return true;
}

function savePassengers(passengerList) {
	localStorage.activePassengers = passengerList;
	return true;
}

function loadPassengers() {
	return {passengers: defval(localStorage.activePassengers, [[]])};
}

chrome.extension.onRequest.addListener( function(request, sender, sendResponse) 
{
	var reqItem = request.what;
	console.log ("recv request: " + reqItem);
	if (reqItem == "stations") {
		var stations = loadStations();
		sendResponse(stations);
	} else if(reqItem == "logins") {
		sendResponse(loadLogins()); // snub them.
	} else if (reqItem == "saveStations") {
		var ret = saveStations(request.stations);
		sendResponse({ok: ret});
	} else if (reqItem == "saveLogins") {
		var ret = saveLogins (request.logins);
		sendResponse({ok: ret});
	} else if (reqItem == "ticketNotify") {
		if (Audio) {
			new Audio("hasticket.ogg").play();
		}
		sendResponse({ok:true});
	} else if (reqItem == "savePassengers") {
		savePassengers(request.passengers);
		sendResponse({ok:true});
	} else if (reqItem == "passengers") {
		var passList = loadPassengers();
		sendResponse(passList);
	}
});

