import 'jquery-ui/ui/widgets/datepicker';
import Sortable from 'sortablejs';
import autocomplete from '../modules/autocomplete';
import colorpicker from '../admin/modules/colorpicker';

export function init() {
	$('#inputBirthday').datepicker({
		changeMonth: true,
		changeYear: true,
		yearRange: '1900:-5y',
		defaultDate: '-13y',
	});

	colorpicker.enable($('#colorpicker'));

	autocomplete.user($('#autocomplete'));

	Sortable.create($('#sortable-list')[0], {});
}
