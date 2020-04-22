define('forum/topic/move-post', ['components', 'postSelect'], function (components, postSelect) {
	var MovePost = {};

	var moveModal;
	var moveCommit;
	var fromTid;

	MovePost.init = function (postEl) {
		if (moveModal) {
			return;
		}
		fromTid = ajaxify.data.tid;
		app.parseAndTranslate('modals/move-post', {}, function (html) {
			moveModal = html;

			moveCommit = moveModal.find('#move-posts-confirm');

			$('body').append(moveModal);

			moveModal.find('#move-posts-cancel').on('click', closeMoveModal);
			postSelect.init(onPostToggled);
			showPostsSelected();

			if (postEl) {
				postSelect.togglePostSelection(postEl, postEl.attr('data-pid'));
			}

			$(window).off('action:axajify.end', checkMoveButtonEnable).on('action:ajaxify.end', checkMoveButtonEnable);

			moveCommit.on('click', function () {
				movePosts();
			});
		});
	};

	function showPostsSelected() {
		if (postSelect.pids.length) {
			moveModal.find('#pids').translateHtml('[[topic:fork_pid_count, ' + postSelect.pids.length + ']]');
		} else {
			moveModal.find('#pids').translateHtml('[[topic:fork_no_pids]]');
		}
	}

	function checkMoveButtonEnable() {
		if (postSelect.pids.length && ajaxify.data.tid &&
			ajaxify.data.template.topic && ajaxify.data.tid !== fromTid
		) {
			moveCommit.removeAttr('disabled');
		} else {
			moveCommit.attr('disabled', true);
		}
	}

	function onPostToggled() {
		checkMoveButtonEnable();
		showPostsSelected();
	}

	function movePosts() {
		if (!ajaxify.data.template.topic || !ajaxify.data.tid) {
			return;
		}
		socket.emit('posts.movePosts', { pids: postSelect.pids, tid: ajaxify.data.tid }, function (err) {
			if (err) {
				return app.alertError(err.message);
			}
			postSelect.pids.forEach(function (pid) {
				components.get('post', 'pid', pid).fadeOut(500, function () {
					$(this).remove();
				});
			});

			closeMoveModal();
		});
	}

	function closeMoveModal() {
		if (moveModal) {
			moveModal.remove();
			moveModal = null;
			postSelect.disable();
		}
	}


	return MovePost;
});
