var onticketAvailable = function() {
	chrome.extension.sendRequest({what:"ticketNotify"}, function(resp){
		if (! resp.ok) {
			alert ("You've got tickets");
		}
	});
}
function wastes()
{
			chrome.extension.sendRequest({what: "saveStations", stations:stationsToSave}, function(resp){});
chrome.extension.sendRequest ({what: "stations"}, function (stations) {
	$("#fromStationText").attr("value", defval(stations.from.name, "哈尔滨"));
	$("#fromStation").attr("value", defval(stations.from.code, "HBB"));
	$("#toStationText").attr("value", defval(stations.to.name, "北京"));
	$("#toStation").attr("value", defval(stations.to.code, "BJP"));
});

}

function pagehack()
{
	var randimg = $("#img_rand_code2");
	randimg.css("margin-bottom", "30px");
	randimg.css("height", "80px");
	randimg.css("width", "300px");

	injectJs('inject/autoquery_pagehack.js');
}

pagehack();

