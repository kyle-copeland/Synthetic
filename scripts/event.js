function incEXP() {
	chrome.storage.sync.get('exp',function(value) {
		var exp = value["exp"] + 1;
		if(!exp)
			exp = 1;
		chrome.storage.sync.set({'exp':exp});
	});
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.status == "complete") 
	{
		incEXP();
	}
});