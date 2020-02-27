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

	colorpickerEnable($('#colorpicker'));

	autocomplete.user($('#autocomplete'));

	Sortable.create($('#sortable-list')[0], {});

	var data = $('#form-serialize').serializeObject();
	$('#json-form-data').text(JSON.stringify(data, null, 2));

	$('#form-deserialize').deserialize({
		foo: [1, 2],
		moo: 'it works',
	});
}
