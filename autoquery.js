var isTicketAvailable = false;

//The table for displaying tickets
var tbl = $(".obj")[0];

tbl.addEventListener("DOMNodeInserted", function() {
	if(checkTickets(event.target))
	{
		if (! isTicketAvailable) {
			onticketAvailable(); //report
		}
		isTicketAvailable = true;
		highLightRow(event.target);
	}
	tbl.firstAppend=false;
}, true);

var propCheckInterval = 1000;
var waitHandle = null;
var queryAvailable = false;
var availCheckCount = 0;
function waitQueryAvailable()
{
	queryAvailable = false;
	if (isStudentTicket) {
		if ($("#stu_submitQuery").attr("disabled") == false){
			queryAvailable = true;
		}
	} else {
		var $qbCls = $("#submitQuery").attr("class");
		if ($qbCls.substr(-2) == "_u") {
			queryAvailable = true;
		}
	}
	if (queryAvailable) {
		cancelQueryWait();
		doQuery();
	} else if(isAutoQueryEnabled) {
		++ availCheckCount;
		$("#availCheckTimes").text("Checking ... " + availCheckCount );
		waitHandle = window.setTimeout (waitQueryAvailable, propCheckInterval);
	}
}

function cancelQueryWait() 
{
	availCheckCount = 0;
	$("#availCheckTimes").text("");
	window.clearTimeout(waitHandle);
	waitHandle = null;
}

//not used yet.
function expandObjectBox(){
	$("#gridbox").attr("style", "background-color:white; overflow-x:hidden; overflow-y:visible; width:100%; height: 913px; cursor:default;");
	var objBox = $("div.objbox");
	if (objBox && objBox != undefined) {
		objBox.attr("style", "width:100%; position: relative; top: -137px; height: 850px; overflow-y:visible; overflow-x:auto;");
		console.log (objBox.attr("style"));
	} else {
		console.log ("Can not aquire object box div object");
	}
}

//Trigger the button
var doQuery = function() {
	displayQueryTimes(queryTimes++);
	isTicketAvailable = false;
	tbl.firstAppend = true;
	g.firstRemove = true;
	document.getElementById(isStudentTicket ? "stu_submitQuery" : "submitQuery").click();
}

var checkTickets = function(row) {
	var hasTicket = false;
	var canBook = true;
	$("td input[type=button]", row).each(function(i, e) {
		if(e.classList.contains("yuding_x")) {
			canBook = false;
		}
	});
	if(!canBook) return false;
	
	$("td", row).each(function(i, e) {
		if(ticketType[i-1]) {
			var info = e.innerText.trim();
			if(info != "--" && info != "无") {
				hasTicket = true;
				highLightCell(e);
			}
		}
	});

	return hasTicket;
}

//The box into which the message is inserted.
var g = document.getElementById("gridbox");
//When the message is removed, the query should be completed.
g.addEventListener("DOMNodeRemoved", function() {
	if(g.firstRemove) {
		g.firstRemove = false;
		if (isTicketAvailable) {
			expandObjectBox();
			if (isAutoQueryEnabled) {//switch auto query off when got tickets
				$("#refreshButton").click();
			}
		} else {
			 //wait for the button to become valid
			if (isAutoQueryEnabled) {
				//may be the query button would be availed soon after query finished
				waitHandle = window.setTimeout(waitQueryAvailable, propCheckInterval / 2);
			}
		}
	}
}, true);
//Disabled because content-script can not access page script
//hack into the validQueryButton function to detect query
//	var _validQueryButton = validQueryButton;

//	validQueryButton = function() {
//		_validQueryButton();
//		if(isAutoQueryEnabled) doQuery();
//	}

var queryTimes = 0; //counter
var isAutoQueryEnabled = false; //enable flag

//please DIY:
var onticketAvailable = function() {
	chrome.extension.sendRequest({what:"ticketNotify"}, function(resp){
		if (! resp.ok) {
			alert ("You've got tickets");
		}
	});
}
var highLightRow = function(row) {
	$(row).css("background-color", "#AAFFDD");
}
var highLightCell = function(cell) {
	$(cell).css("background-color", "#AADDFF");
}
var displayQueryTimes = function(n) {
	document.getElementById("refreshTimes").innerText = n;
};

var isStudentTicket = false;

//Control panel UI
$("<div/>").attr("style", "position:fixed;top:0;left:0; width:700px; height: 50px; background-color:#FFFFDD; font-size:18px;").append(
	$("<input/>").attr("type", "checkBox").change(function(){
		isStudentTicket = this.checked;
	})
).append(
	$("<span/>").text("Students Ticket   ")
).append(
	$("<button/>").attr("id", "refreshButton").attr("class", "search_u").attr("style", "color:#FA0;").text("Start Auto Refresh").click(function() {
		if(!isAutoQueryEnabled) {

			isAutoQueryEnabled = true;
			doQuery();
			this.innerText="Stop Auto Query";
			//enable it
			var stationsToSave = {from: {name:($("#fromStationText").attr("value")), code:($("#fromStation").attr("value"))},
				to: {name: ($("#toStationText").attr("value")), code: ($("#toStation").attr("value"))}
			};
			console.log ("CS: prepare to save:" + stationsToSave.from.code + " --> " + stationsToSave.to.code);
			chrome.extension.sendRequest({what: "saveStations", stations:stationsToSave}, function(resp){});
		}
		else {
			//disable it
			cancelQueryWait();
			isAutoQueryEnabled = false;
			this.innerText="Start Auto Query";
		}
	})
).append(
	$("<span/>").text("   Query Count: ").append(
		$("<span/>").attr("id", "refreshTimes").text("0")
	)
).append(
	$("<span/>").attr("id", "availCheckTimes").text("0")
).appendTo(document.body);

//Ticket type selector & UI
var ticketType = new Array();
$(".hdr tr:eq(2) td").each(function(i,e) {
	ticketType.push(false);
	if(i<3) return;
	ticketType[i] = true;
	
	var c = $("<input/>").attr("type", "checkBox").attr("checked", "true");
	c[0].ticketTypeId = i;
	c.change(function() {
		ticketType[this.ticketTypeId] = this.checked;
	}).appendTo(e);
});


Date.prototype.format = function(format) //author: meizz 
{ 
  var o = { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(),    //day 
    "h+" : this.getHours(),   //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter 
    "S" : this.getMilliseconds() //millisecond 
  } 
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1, 
    (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o)if(new RegExp("("+ k +")").test(format)) 
    format = format.replace(RegExp.$1, 
      RegExp.$1.length==1 ? o[k] : 
        ("00"+ o[k]).substr((""+ o[k]).length)); 
  return format; 
} 

var preSaleDays = 12;
var lastPreSaleDate = new Date( (new Date()).getTime() + 1000 * (preSaleDays - 1) * 24 * 3600);
$("#startdatepicker").attr("value", lastPreSaleDate.format("yyyy-MM-dd"));

function defval(val1, defvalue)
{
	console.log ("Val1 = " + val1);
	return val1 ? val1 : defvalue;
}

chrome.extension.sendRequest ({what: "stations"}, function (stations) {
	$("#fromStationText").attr("value", defval(stations.from.name, "哈尔滨"));
	$("#fromStation").attr("value", defval(stations.from.code, "HBB"));
	$("#toStationText").attr("value", defval(stations.to.name, "北京"));
	$("#toStation").attr("value", defval(stations.to.code, "BJP"));
});



