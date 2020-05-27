import './app';
import '../../build/public/client-scripts.min';

import notifications from './client/header/notifications';
import chat from './client/header/chat';

$(window).on('action:app.load', async function () {
	notifications.prepareDOM();
	chat.prepareDOM();

	if (app.user.uid > 0) {
		const unread = await import('./client/unread');
		unread.initUnreadTopics();
	}
});
