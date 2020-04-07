import 'jquery-ui/ui/widgets/datepicker';
import Sortable from 'sortablejs';
import semver from 'semver';
import * as autocomplete from 'autocomplete';
import { enable as colorpickerEnable } from '../admin/modules/colorpicker';
import 'jquery-deserialize';

export function init() {
	console.log('should be true', semver.gt('1.1.1', '1.0.0'));

	$('#change-skin').val(config.bootswatchSkin);

	$('#inputTags').tagsinput({
		confirmKeys: [13, 44],
		trimValue: true,
	});

	$('#inputBirthday').datepicker({
		changeMonth: true,
		changeYear: true,
		yearRange: '1900:-5y',
		defaultDate: '-13y',
	});

	$('#change-language').on('click', function () {
		config.userLang = 'tr';
		var languageCode = utils.userLangToTimeagoCode(config.userLang);
		import(/* webpackChunkName: "timeago/[request]" */ 'timeago/locales/jquery.timeago.' + languageCode).then(function () {
			overrides.overrideTimeago();
			ajaxify.refresh();
		});
	});

	colorpickerEnable($('#colorpicker'));

	autocomplete.user($('#autocomplete'));

	Sortable.create($('#sortable-list')[0], {});

	var data = $('#form-serialize').serializeObject();
	$('#json-form-data').text(JSON.stringify(data, null, 2));

	$('#form-deserialize').deserialize({
		foo: [1, 2],
		moo: 'it works',
	});

	$('#change-skin').change(async function () {
		var newSkin = $(this).val();
		socket.emit('user.saveSettings', {
			uid: app.user.uid,
			settings: {
				postsPerPage: 20,
				topicsPerPage: 20,
				bootswatchSkin: newSkin,
			},
		}, function (err) {
			if (err) {
				return console.log(err);
			}
			config.bootswatchSkin = newSkin;
			reskin(newSkin);
		});
	});

	async function reskin(skinName) {
		var currentSkinClassName = $('body').attr('class').split(/\s+/).filter(function (className) {
			return className.startsWith('skin-');
		});
		if (!currentSkinClassName[0]) {
			return;
		}
		var currentSkin = currentSkinClassName[0].slice(5);
		currentSkin = currentSkin !== 'noskin' ? currentSkin : '';
		if (skinName === currentSkin) {
			return;
		}
		$('link[rel="stylesheet"][href*="' + currentSkin + '.css"]')
			.attr('href', config.relative_path + '/assets/client' + (skinName ? '-' + skinName : '') + '.css');

		// Update body class with proper skin name
		$('body').removeClass(currentSkinClassName.join(' '))
			.addClass('skin-' + (skinName || 'noskin'));
	}
}
