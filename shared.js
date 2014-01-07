
//you could add some shared functions here

function disabledEventPropagation(event)
{
	if (event.stopPropagation){
		event.stopPropagation();
	}
	else if(window.event){
		window.event.cancelBubble=true;
	}
}

function injectJs(link) {
	var scr = document.createElement('script');
	scr.type="text/javascript";
	fulllink = chrome.extension.getURL(link);
	scr.src=fulllink;
	(document.body || document.head || document.documentElement).appendChild(scr);
}


