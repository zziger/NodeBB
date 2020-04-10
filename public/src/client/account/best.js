define('forum/account/best', ['forum/account/header', 'forum/account/posts'], function (header, posts) {
	var Best = {};

	Best.init = function () {
		header.init();

		$('[data-component="post/content"] img:not(.not-responsive)').addClass('img-responsive');

		posts.handleInfiniteScroll('posts.loadMoreBestPosts', 'account/best');
	};

	return Best;
});
