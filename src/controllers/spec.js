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
		'x-logo': {},
	},
};

const filterPaths = ({ json, include, exclude }) => {
	json.paths = Object.keys(json.paths)
		.filter((path) => {
			return /\/api/.test(path);
		})
		.filter((path) => {
			return include ? include.test(path) : exclude ? exclude.test(path) : true;
		})
		.reduce((paths, k) => {
			paths[k] = json.paths[k];
			return paths;
		}, {});
};

const getSpecJson = ({ version, include, exclude }) => {
	let filepath, v3 = false, v2 = false;
	if (version === '3') {
		v3 = true;
		filepath = path.join(dirname, 'openapi/spec.v3.json');
	} else if (!version || version === '2') {
		v2 = true;
		filepath = path.join(dirname, 'openapi/spec.v2.json');
	}
	return new Promise((resolve, reject) => {
		fs.readFile(filepath, 'utf-8', (err, content) => {
			if (err) {
				return reject(err);
			}
			const baseUrl = nconf.get('url');
			const swaggerSpec = JSON.parse(content);
			const json = _.merge(
				fromPackage,
				{
					info: { description: `[Specification JSON](${baseUrl || ''}/api/spec)` },
				},
				swaggerSpec);
			if (baseUrl) {
				json.servers = _.uniqBy([].concat(json.servers || []).concat({ url: nconf.get('url') }), 'url');
			}
			if (v3) {
				delete json.swagger;
				delete json.description;
			} else if (v2) {
				delete json.openapi;
			}

			filterPaths({ json, include, exclude });
			json.$pathsList = Object.keys(json.paths);
			resolve(json);
		});
	});
};

module.exports.json = async (req, res) => {
	try {
		const include = req.query.include ? new RegExp(req.query.include) : null;
		const exclude = req.query.exclude ? new RegExp(req.query.exclude) : null;
		res.json(await getSpecJson({ version: req.query.version, include, exclude }));
	} catch (err) {
		return res.status(500).send('Error reading spec file');
	}
};

module.exports.html = function (req, res) {
	res.sendFile(path.join(dirname, 'openapi/spec.html'));
};
