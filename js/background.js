browser.runtime.onMessage.addListener(messageObject => {
	browser.tabs.create({
		url: messageObject.url,
		active: false
	});
});