define('forum/header/chat', ['components'], function (components) {
	var chat = {};

	chat.prepareDOM = function () {
		var chatsToggleEl = components.get('chat/dropdown');
		var chatsListEl = components.get('chat/list');

		chatsToggleEl.on('click', function () {
			if (chatsToggleEl.parent().hasClass('open')) {
				return;
			}
			loadChatsDropdown(chatsListEl);
		});

		if (chatsToggleEl.parents('.dropdown').hasClass('open')) {
			loadChatsDropdown(chatsListEl);
		}

		socket.removeListener('event:chats.roomRename', onRoomRename);
		socket.on('event:chats.roomRename', onRoomRename);

		socket.on('event:unread.updateChatCount', function (count) {
			$('[data-component="chat/icon"]')
				.toggleClass('unread-count', count > 0)
				.attr('data-content', count > 99 ? '99+' : count);
		});
	};

	function loadChatsDropdown(chatsListEl) {
		socket.emit('modules.chats.getRecentChats', {
			uid: app.user.uid,
			after: 0,
		}, function (err, data) {
			if (err) {
				return app.alertError(err.message);
			}

			var rooms = data.rooms.filter(function (room) {
				return room.teaser;
			});

			app.parseAndTranslate('partials/chats/dropdown', { rooms: rooms }, function (html) {
				chatsListEl.find('*').not('.navigation-link').remove();
				chatsListEl.prepend(html);
				app.createUserTooltips(chatsListEl, 'right');
				chatsListEl.off('click').on('click', '[data-roomid]', function (ev) {
					if ($(ev.target).parents('.user-link').length) {
						return;
					}
					var roomId = $(this).attr('data-roomid');
					if (!ajaxify.currentPage.match(/^chats\//)) {
						app.openChat(roomId);
					} else {
						ajaxify.go('user/' + app.user.userslug + '/chats/' + roomId);
					}
				});

				$('[data-component="chats/mark-all-read"]').off('click').on('click', function () {
					socket.emit('modules.chats.markAllRead', function (err) {
						if (err) {
							return app.alertError(err);
						}
					});
				});
			});
		});
	}

	function onRoomRename(data) {
		$(window).trigger('action:chat.renamed', data);
	}

	return chat;
});
