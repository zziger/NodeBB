
define('alerts', ['translator', 'components', 'benchpress'], function (translator, components, Benchpress) {
	var module = {};

	module.alert = function (params) {
		params.alert_id = 'alert_button_' + (params.alert_id ? params.alert_id : new Date().getTime());
		params.title = params.title ? params.title.trim() || '' : '';
		params.message = params.message ? params.message.trim() : '';
		params.type = params.type || 'light';

		var alert = $('#' + params.alert_id);
		if (alert.length) {
			updateAlert(alert, params);
		} else {
			createNew(params);
		}
	};

	function createNew(params) {
		Benchpress.parse('alert', params, function (alertTpl) {
			translator.translate(alertTpl, function (translatedHTML) {
				var alert = $('#' + params.alert_id);
				if (alert.length) {
					return updateAlert(alert, params);
				}
				alert = $(translatedHTML);

				components.get('toaster/tray').prepend(alert);

				if (typeof params.closefn === 'function') {
					alert.find('button').on('click', function () {
						params.closefn();
						return false;
					});
				}

				if (typeof params.clickfn === 'function') {
					alert
						.addClass('pointer')
						.on('click', function (e) {
							if (!$(e.target).is('.close')) {
								params.clickfn();
							}
						});
				}

				alert.toast('show');

				$(window).trigger('action:alert.new', { alert: alert, params: params });
			});
		});
	}

	module.remove = function (id) {
		$('#alert_button_' + id).remove();
	};

	function updateAlert(alert, params) {
		alert.find('strong').html(params.title);
		alert.find('p').html(params.message);

		// Update class
		let classes = alert.attr('class');
		classes = classes.match(/bg-\w+/);
		alert.removeClass(classes);
		alert.addClass('bg-' + params.type);

		translator.translate(alert.html(), function (translatedHTML) {
			alert.html(translatedHTML);
			$(window).trigger('action:alert.update', { alert: alert, params: params });
		});

		// Handle changes in the clickfn
		alert.off('click').removeClass('pointer');
		if (typeof params.clickfn === 'function') {
			alert
				.addClass('pointer')
				.on('click', function (e) {
					if (!$(e.target).is('.close')) {
						params.clickfn();
					}
				});
		}
	}

	return module;
});
