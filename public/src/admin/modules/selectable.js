
define('admin/modules/selectable', ['jquery-ui'], function () {
	var selectable = {};

	selectable.enable = function (containerEl, targets) {
		$(containerEl).selectable({
			filter: targets,
		});
	};

	return selectable;
});
