define('components', function () {
	var components = {};

	components.core = {
		'topic/teaser': function (tid) {
			if (tid) {
				return $('[data-component="category/topic"][data-tid="' + tid + '"] [data-component="topic/teaser"]');
			}
			return $('[data-component="topic/teaser"]');
		},
		topic: function (name, value) {
			return $('[data-component="topic"][data-' + name + '="' + value + '"]');
		},
		post: function (name, value) {
			return $('[data-component="post"][data-' + name + '="' + value + '"]');
		},
		'post/content': function (pid) {
			return $('[data-component="post"][data-pid="' + pid + '"] [data-component="post/content"]');
		},
		'post/header': function (pid) {
			return $('[data-component="post"][data-pid="' + pid + '"] [data-component="post/header"]');
		},
		'post/anchor': function (index) {
			return $('[data-component="post"][data-index="' + index + '"] [data-component="post/anchor"]');
		},
		'post/vote-count': function (pid) {
			return $('[data-component="post"][data-pid="' + pid + '"] [data-component="post/vote-count"]');
		},
		'post/bookmark-count': function (pid) {
			return $('[data-component="post"][data-pid="' + pid + '"] [data-component="post/bookmark-count"]');
		},

		'user/postcount': function (uid) {
			return $('[data-component="user/postcount"][data-uid="' + uid + '"]');
		},
		'user/reputation': function (uid) {
			return $('[data-component="user/reputation"][data-uid="' + uid + '"]');
		},

		'category/topic': function (name, value) {
			return $('[data-component="category/topic"][data-' + name + '="' + value + '"]');
		},

		'categories/category': function (name, value) {
			return $('[data-component="categories/category"][data-' + name + '="' + value + '"]');
		},

		'chat/message': function (messageId) {
			return $('[data-component="chat/message"][data-mid="' + messageId + '"]');
		},

		'chat/message/body': function (messageId) {
			return $('[data-component="chat/message"][data-mid="' + messageId + '"] [data-component="chat/message/body"]');
		},

		'chat/recent/room': function (roomid) {
			return $('[data-component="chat/recent/room"][data-roomid="' + roomid + '"]');
		},
	};

	components.get = function () {
		var args = Array.prototype.slice.call(arguments, 1);

		if (components.core[arguments[0]] && args.length) {
			return components.core[arguments[0]].apply(this, args);
		}
		return $('[data-component="' + arguments[0] + '"]');
	};

	return components;
});
