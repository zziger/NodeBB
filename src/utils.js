'use strict';

process.profile = function (operation, start) {
	console.log('%s took %d milliseconds', operation, process.elapsedTimeSince(start));
};

process.elapsedTimeSince = function (start) {
	const diff = process.hrtime(start);
	return (diff[0] * 1e3) + (diff[1] / 1e6);
};

module.exports = require('../public/src/utils')(require('xregexp'));
