'use strict';

const helpers = require('./helpers');

const setupPageRoute = helpers.setupPageRoute;

module.exports = function (app, middleware) {
	setupPageRoute(app, '/debug/test', middleware, [], async function (req, res) {
		// res.redirect(404);
		res.render('test', {});
	});
};
