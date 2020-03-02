import 'jquery-ui/ui/widgets/datepicker';
import Sortable from 'sortablejs';
import semver from 'semver';
import autocomplete from '../modules/autocomplete';
import { enable as colorpickerEnable } from '../admin/modules/colorpicker';
import 'jquery-deserialize';

export function init() {
	console.log('should be true', semver.gt('1.1.1', '1.0.0'));

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
		reskin($(this).val());
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

		console.log('currentSking ' + currentSkin);
		console.log('loading ' + skinName);
		if (skinName === currentSkin) {
			return;
		}
		if (skinName) {
			console.log('import', skinName);
			var a = await import(/* webpackChunkName: "css/[request]" */ 'bootswatch/dist/' + skinName + '/bootstrap.css');

			a.default();
			console.log(a);
		}
		if (currentSkin) {
			console.log('remove', currentSkin);
			$('link[rel="stylesheet"][href*="' + currentSkin + '-bootstrap-css"]').remove();
			// $('script[src*="' + currentSkin + '-bootstrap-css"]').remove();
		}
		// Update body class with proper skin name
		$('body').removeClass(currentSkinClassName.join(' '))
			.addClass('skin-' + (skinName || 'noskin'));
	}
}
