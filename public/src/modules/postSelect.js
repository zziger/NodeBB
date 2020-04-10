define('postSelect', ['components'], function (components) {
	var PostSelect = {};
	var onSelect;

	PostSelect.pids = [];

	var allowMainPostSelect = false;

	PostSelect.init = function (_onSelect, options) {
		PostSelect.pids.length = 0;
		onSelect = _onSelect;
		options = options || {};
		allowMainPostSelect = options.allowMainPostSelect || false;
		$('#content').on('click', '[data-component="topic"] [data-component="post"]', onPostClicked);
		disableClicksOnPosts();
	};

	function onPostClicked(ev) {
		ev.stopPropagation();
		var pidClicked = $(this).attr('data-pid');
		var postEls = $('[data-component="topic"] [data-pid="' + pidClicked + '"]');
		if (!allowMainPostSelect && parseInt($(this).attr('data-index'), 10) === 0) {
			return;
		}
		PostSelect.togglePostSelection(postEls, pidClicked);
	}

	PostSelect.disable = function () {
		PostSelect.pids.forEach(function (pid) {
			components.get('post', 'pid', pid).toggleClass('bg-success', false);
		});

		$('#content').off('click', '[data-component="topic"] [data-component="post"]', onPostClicked);
		enableClicksOnPosts();
	};

	PostSelect.togglePostSelection = function (postEls, pid) {
		if (pid) {
			var index = PostSelect.pids.indexOf(pid);
			if (index === -1) {
				PostSelect.pids.push(pid);
				postEls.toggleClass('bg-success', true);
			} else {
				PostSelect.pids.splice(index, 1);
				postEls.toggleClass('bg-success', false);
			}

			if (PostSelect.pids.length) {
				PostSelect.pids.sort(function (a, b) { return a - b; });
			}
			if (typeof onSelect === 'function') {
				onSelect();
			}
		}
	};

	function disableClicks() {
		return false;
	}

	function disableClicksOnPosts() {
		$('#content').on('click', '[data-component="post"] button, [data-component="post"] a', disableClicks);
	}

	function enableClicksOnPosts() {
		$('#content').off('click', '[data-component="post"] button, [data-component="post"] a', disableClicks);
	}

	return PostSelect;
});
