
/* globals ace */
define('admin/appearance/customise', ['admin/settings', 'ace-builds', 'ace-builds/webpack-resolver'], function (Settings) {
	var Customise = {};

	Customise.init = function () {
		Settings.prepare(function () {
			$('#customCSS').text($('#customCSS-holder').val());
			$('#customJS').text($('#customJS-holder').val());
			$('#customHTML').text($('#customHTML-holder').val());

			initACE('customCSS', 'less', '#customCSS-holder');
			initACE('customJS', 'javascript', '#customJS-holder');
			initACE('customHTML', 'html', '#customHTML-holder');

			$('#save').on('click', function () {
				if ($('#enableLiveReload').is(':checked')) {
					socket.emit('admin.reloadAllSessions');
				}
			});
		});

		function initACE(aceElementId, mode, holder) {
			var editorEl = ace.edit(aceElementId, {
				mode: 'ace/mode/' + mode,
				theme: 'ace/theme/dracula',
				maxLines: 30,
				minLines: 10,
				fontSize: 16,
			});
			editorEl.on('change', function () {
				app.flags = app.flags || {};
				app.flags._unsaved = true;
				$(holder).val(editorEl.getValue());
			});
		}
	};

	return Customise;
});
