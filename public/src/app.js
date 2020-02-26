require('./app.common');

require('../scss/app.scss');

require('./clientScripts');

const notifications = require('./client/header/notifications');
const chat = require('./client/header/chat');

$(window).on('action:app.load', async function () {
	notifications.prepareDOM();
	chat.prepareDOM();

	if (app.user.uid > 0) {
		const unread = await import('./client/unread');
		unread.initUnreadTopics();
	}
});
