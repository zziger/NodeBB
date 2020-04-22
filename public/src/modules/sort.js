define('sort', ['components'], function (components) {
	var module = {};

	module.handleSort = function (field, method, gotoOnSave) {
		var topicSort = components.get('topic/sort');
		topicSort.find('i').removeClass('fa-check');
		var currentSetting = topicSort.find('a[data-sort="' + config[field] + '"]');
		currentSetting.find('i').addClass('fa-check');

		$('.category, .topic').on('click', '[data-component="topic/sort"] a', function () {
			var newSetting = $(this).attr('data-sort');
			socket.emit(method, newSetting, function (err) {
				if (err) {
					return app.alertError(err.message);
				}
				config[field] = newSetting;
				var qs = decodeURIComponent($.param(utils.params()));
				ajaxify.go(gotoOnSave + (qs ? '?' + qs : ''));
			});
		});
	};

	return module;
});
