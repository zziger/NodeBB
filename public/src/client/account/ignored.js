define('forum/account/ignored', ['forum/account/header', 'forum/account/topics'], function (header, topics) {
	var AccountIgnored = {};

	AccountIgnored.init = function () {
		header.init();

		topics.handleInfiniteScroll('topics.loadMoreFromSet', 'account/ignored', 'uid:' + ajaxify.data.theirid + ':ignored_tids');
	};

	return AccountIgnored;
});
