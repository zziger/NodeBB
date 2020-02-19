
// AMD. Register as a named module
var factory = require('./translator.common');

define('translator', ['jquery', 'utils'], function (jQuery, utils) {
	function loadClient(language, namespace) {
		return Promise.resolve(jQuery.getJSON(config.relative_path + '/assets/language/' + language + '/' + namespace + '.json?' + config['cache-buster']));
	}
	var warn = function () { console.warn.apply(console, arguments); };
	return factory(utils, loadClient, warn);
});
