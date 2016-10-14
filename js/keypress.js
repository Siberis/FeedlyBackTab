class FeedlyBackTab {
	constructor() {
		this._backKeyCode = 104;
		this.selectors = [
			'div.selectedEntry a.title',
			'.selectedEntry a.visitWebsiteButton',
			'a.visitWebsiteButton'
		];
	}
	init() {
		browser.storage.local.get('FeedlyBackTab', settings => {
			if (settings.FeedlyBackTab && settings.FeedlyBackTab.backKey) {
				this._backKeyCode = settings.FeedlyBackTab.backKey.charCodeAt(0);
			}
		});
	}
	handler(e) {
		var tag = e.target.tagName.toLowerCase();
		if (tag != 'input' && tag != 'textarea') {
			if (e.keyCode == this._backKeyCode || e.keyCode == this._frontKeyCode) {
				let url = this.selectors.filter(x => document.querySelector(x)).slice(0, 1).map(x => document.querySelector(x));
				if (url.length > 0) {
					browser.runtime.sendMessage({ url: url[0].href });
				}
				else {
					console.log("Could not find any selectors from: " + this.selectors.join());
				}
			}
		}
	}
}
(() => {
	if (window == top) {
		let fbt = new FeedlyBackTab();
		fbt.init();
		window.addEventListener('keypress', (e) => fbt.handler(e), false);

		// let link = document.createElement('link');
		// link.type = 'text/css';
		// link.rel = "stylesheet";
		// link.href = "darkMode.css";

		// document.querySelector("head").appendChild(link);




	}
})();
