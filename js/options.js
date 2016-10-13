class FeedlyBackTabOptions {
	constructor() {
		this._messages = {
			success: 'Options saved.',
			validateFailure: 'Please choose a shortcut.'
		};
		this._messageTypes = {
			success: 'success',
			failure: 'failure'
		};
		this._defaultBackKey = 'h';
		this._backKey = document.querySelector('#bt_backKey');
	}
	init() {
		document.addEventListener('DOMContentLoaded',
			() => browser.storage.local.get('FeedlyBackTab', settings => {
				console.log(settings)
				if (!settings.backKey) {
					settings.backKey = this._defaultBackKey;
				}
				this._backKey.value = settings.backKey;
			}));
		document.querySelector('#bt_submitbutton').addEventListener('click', () => { if (this.validate()) this.save() });
	}
	validate() {
		if (this._backKey.value == '') {
			this.updateStatus(this._messages.validateFailure, this._messageTypes.failure);
			return false;
		}
		return true;
	}
	save() {
		let backKey = this._backKey.value;
		browser.storage.local.set({ 'FeedlyBackTab': { backKey: backKey } }, () => {
			this.updateStatus(this._messages.success, this._messageTypes.success);
		});
	}
	updateStatus(message, type) {
		let status = document.querySelector('#bt_status');
		status.innerText = message;
		status.className = 'showstatus ' + type;
	}
}
(() => {
	var options = new FeedlyBackTabOptions();
	options.init();
})();
