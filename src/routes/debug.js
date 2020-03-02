'use strict';

const helpers = require('./helpers');

const setupPageRoute = helpers.setupPageRoute;

module.exports = function (app, middleware) {
	setupPageRoute(app, '/debug/test', middleware, [], async function (req, res) {
		// res.redirect(404);
		const meta = require('../meta');
		res.render('test', {
			now: new Date().toISOString(),
			skins: [{ name: 'no-skin', value: '' }].concat(meta.css.supportedSkins.map(s => ({ name: s, value: s }))),
		});
	});
};
