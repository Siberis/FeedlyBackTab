chrome.runtime.onMessage.addListener(messageObject => {
	chrome.tabs.create({
		url: messageObject.url,
		active: false
	});
});