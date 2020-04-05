'use strict';

const express = require('express');
const nconf = require('nconf');
const fs = require('fs').promises;
const path = require('path');
const helpers = require('./helpers');

const setupPageRoute = helpers.setupPageRoute;

module.exports = function (app, middleware) {
	var router = express.Router();

	setupPageRoute(app, '/debug/test', middleware, [], async function (req, res) {
		// res.redirect(404);
		const meta = require('../meta');
		res.render('test', {
			now: new Date().toISOString(),
			skins: [{ name: 'no-skin', value: '' }].concat(meta.css.supportedSkins.map(s => ({ name: s, value: s }))),
		});
	});

	// Redoc
	router.get('/spec/read', async (req, res) => {
		const handle = await fs.open(path.resolve(__dirname, '../../public/vendor/redoc/index.html'), 'r');
		let html = await handle.readFile({
			encoding: 'utf-8',
		});
		await handle.close();

		html = html.replace('apiUrl', nconf.get('relative_path') + '/assets/openapi/read.yaml');
		res.status(200).type('text/html').send(html);
	});

	app.use(nconf.get('relative_path') + '/debug', router);
};
