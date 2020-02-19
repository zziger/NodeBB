var factory = require('./helpers.common');

define('helpers', ['utils', 'benchpress'], function (utils, Benchpress) {
	return factory(utils, Benchpress, config.relative_path);
});
