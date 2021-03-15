class FeedlyBackTab {
	constructor() {
		this._backKeyCode = 104;
		this._backKeyCode2 = 102;
		this.selectors = [
			'a.entryTitle'
		];
	}
	init() {
		chrome.storage.local.get('FeedlyBackTab', settings => {
			if (settings.FeedlyBackTab && settings.FeedlyBackTab.backKey) {
				this._backKeyCode = settings.FeedlyBackTab.backKey.charCodeAt(0);
			}
		});
	}
	handler(e) {
		var tag = e.target.tagName.toLowerCase();
		console.log(tag, e.keyCode);
		if (tag != 'input' && tag != 'textarea') {
			if (e.keyCode == this._backKeyCode || e.keyCode == this._backKeyCode2 || e.keyCode == this._frontKeyCode) {
				let url = this.selectors.filter(x => document.querySelector(x)).slice(0, 1).map(x => document.querySelector(x));
				console.log(url);
				if (url.length > 0) {
					chrome.runtime.sendMessage({ url: url[0].href });
				}
				else {
					console.log("Could not find any selectors from: " + this.selectors.join());
				}
			} else if (e.key === 'd') {
				console.log("keyDown")
				document.querySelector('body').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'j' }));
			}
		}
	}
}
(() => {
	if (window == top) {
		let fbt = new FeedlyBackTab();
		fbt.init();
		window.addEventListener('keypress', (e) => fbt.handler(e), false);
	}
})();
