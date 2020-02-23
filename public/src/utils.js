var $ = require('jquery');
var utils = require('./utils.common');

utils.getLanguage = function () {
	var lang = 'en-GB';
	if (typeof window === 'object' && window.config && window.utils) {
		lang = utils.params().lang || config.userLang || config.defaultLang || 'en-GB';
	}
	return lang;
};

utils.makeNumbersHumanReadable = function (elements) {
	elements.each(function () {
		$(this).html(utils.makeNumberHumanReadable($(this).attr('title')));
	});
};

utils.addCommasToNumbers = function (elements) {
	elements.each(function (index, element) {
		$(element).html(utils.addCommas($(element).html()));
	});
};

utils.findBootstrapEnvironment = function () {
	// http://stackoverflow.com/questions/14441456/how-to-detect-which-device-view-youre-on-using-twitter-bootstrap-api
	var envs = ['xs', 'sm', 'md', 'lg', 'xl'];

	var el = document.createElement('div');
	document.body.appendChild(el);

	var curEnv = envs.shift();

	for (var env of envs.reverse()) {
		el.classList.add(`d-${env}-none`);

		if (window.getComputedStyle(el).display === 'none') {
			curEnv = env;
			break;
		}
	}

	document.body.removeChild(el);
	return curEnv;
};

utils.isMobile = function () {
	var env = utils.findBootstrapEnvironment();
	return ['xs', 'sm'].some(function (targetEnv) {
		return targetEnv === env;
	});
};

module.exports = utils;
