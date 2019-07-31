'use strict';

const fs = require('fs');
const path = require('path');
const nconf = require('nconf');
const _ = require('lodash');
const pkg = require('../../package.json');
const dirname = require('../cli/paths').baseDir;
const fromPackage = {
	info: {
		title: pkg.title || pkg.name || pkg.description,
		version: pkg.version,
		license: {
			name: pkg.license,
		},
		description: '[Specification JSON](/api/spec)',
		'x-logo': {

		},
	},
};

module.exports.json = function (req, res) {
	fs.readFile(path.join(dirname, 'openapi/spec.json'), 'utf-8', (err, content) => {
		if (err) {
			return res.status(500).send('Error reading spec file');
		}
		const swaggerSpec = JSON.parse(content);
		const json = _.merge(fromPackage, swaggerSpec);
		if (nconf.get('url')) {
			json.servers = [].concat(json.servers || []).concat({ url: nconf.get('url') });
		}
		res.json(json);
	});
};

module.exports.html = function (req, res) {
	res.sendFile(path.join(dirname, 'openapi/spec.html'));
};
