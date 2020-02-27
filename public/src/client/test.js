import 'jquery-ui/ui/widgets/datepicker';
import Sortable from 'sortablejs';
import autocomplete from '../modules/autocomplete';

export function init() {
	$('#inputBirthday').datepicker({
		changeMonth: true,
		changeYear: true,
		yearRange: '1900:-5y',
		defaultDate: '-13y',
	});

	autocomplete.user($('#autocomplete'));

	Sortable.create($('#sortable-list')[0], {});
}
