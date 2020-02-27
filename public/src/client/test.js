import 'jquery-ui/ui/widgets/datepicker';
import Sortable from 'sortablejs';
import semver from 'semver';
import autocomplete from '../modules/autocomplete';
import { enable as colorpickerEnable } from '../admin/modules/colorpicker';


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
}
