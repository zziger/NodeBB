import 'bootstrap-colorpicker';
import 'bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css';

function enable(inputEl, callback) {
	(inputEl instanceof jQuery ? inputEl : $(inputEl)).each(function () {
		var $this = $(this);

		var picker = $this.colorpicker({
			color: $this.val() || '#000',
			format: 'hex',
		});
		picker.on('change', function (ev) {
			var hex = ev.value;
			$this.val(hex);
			if (typeof callback === 'function') {
				callback(hex);
			}
		});
		picker.on('colorpickerShow', function () {
			$(picker).css('z-index', 1051);
		});

		$(window).one('action:ajaxify.start', function () {
			$this.colorpicker('destroy');
		});
	});
}

export default {
	enable: enable,
};

export { enable };
