'use strict';

var nconf = require('nconf');
var fs = require('fs');
var path = require('path');
var async = require('async');
var rimraf = require('rimraf');

var plugins = require('../plugins');
var db = require('../database');
var file = require('../file');
var minifier = require('./minifier');

var CSS = module.exports;

CSS.supportedSkins = [
	'cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal',
	'litera', 'lumen', 'lux', 'materia', 'minty', 'pulse', 'sandstone',
	'simplex', 'sketchy', 'slate', 'solar', 'spacelab', 'superhero',
	'united', 'yeti',
];

var buildImports = {
	client: function (source, themeData) {
		return [
			themeData.bootswatchSkin ? '@import "bootswatch/dist/' + themeData.bootswatchSkin + '/variables";' : '',
			'@import "bootstrap/scss/bootstrap";',
			themeData.bootswatchSkin ? '@import "bootswatch/dist/' + themeData.bootswatchSkin + '/bootswatch";' : '',
			'@import "app.scss";',
			'@import "' + themeData['theme:id'] + '/theme.scss";',
			source,
		].join('\n');
	},
	admin: function (source) {
		return source + '\n' + [
			'@import "admin.scss";',
		].join('\n');
	},
};

function getImports(files, prefix, extension, callback) {
	var pluginDirectories = [];
	var source = '';
	function fixPath(file) {
		if (!file) {
			return;
		}
		var parsed = path.parse(file);
		var newFile = path.join(parsed.dir, parsed.name);
		return newFile.replace(/\\/g, '/');
	}

	files.forEach(function (styleFile) {
		if (styleFile.endsWith(extension)) {
			source += prefix + fixPath(styleFile) + '";';
		} else {
			pluginDirectories.push(styleFile);
		}
	});

	async.each(pluginDirectories, function (directory, next) {
		file.walk(directory, function (err, styleFiles) {
			if (err) {
				return next(err);
			}

			styleFiles.forEach(function (styleFile) {
				source += prefix + fixPath(styleFile) + '";';
			});

			next();
		});
	}, function (err) {
		callback(err, source);
	});
}

function getBundleMetadata(target, callback) {
	var paths = [
		path.join(__dirname, '../../node_modules'),
		path.join(__dirname, '../../public/scss'),
	];

	// Skin support
	let skin;
	if (target.startsWith('client-')) {
		skin = target.split('-')[1];

		if (CSS.supportedSkins.includes(skin)) {
			target = 'client';
		}
	}
	let themeData;
	async.waterfall([
		function (next) {
			if (target !== 'client') {
				return next(null, null);
			}

			db.getObjectFields('config', ['theme:type', 'theme:id', 'bootswatchSkin'], next);
		},
		function (_themeData, next) {
			themeData = _themeData;
			if (target === 'client') {
				var themeId = (themeData['theme:id'] || 'nodebb-theme-palette');
				var baseThemePath = path.join(nconf.get('themes_path'), (themeData['theme:type'] && themeData['theme:type'] === 'local' ? themeId : 'nodebb-theme-vanilla'));
				paths.unshift(baseThemePath);

				themeData.bootswatchSkin = skin || themeData.bootswatchSkin;
			}

			async.parallel({
				scss: function (cb) {
					getImports(plugins.scssFiles, '\n@import "', '.scss', cb);
				},
				acpScss: function (cb) {
					if (target === 'client') {
						return cb(null, '');
					}
					getImports(plugins.acpScssFiles, '\n@import "', '.scss', cb);
				},
				less: function (cb) {
					getImports(plugins.lessFiles, '\n@import "', '.less', cb);
				},
				acpLess: function (cb) {
					if (target === 'client') {
						return cb(null, '');
					}

					getImports(plugins.acpLessFiles, '\n@import "', '.less', cb);
				},
				css: function (cb) {
					getImports(plugins.cssFiles, '\n@import "', '.css', cb);
				},
			}, next);
		},
		function (result, next) {
			var imports = result.css + '\n' + result.scss + '\n' + result.acpScss;
			imports = buildImports[target](imports, themeData);

			var lessImports = result.less + '\n' + result.acpLess;
			next(null, { paths: paths, imports: imports, lessImports: lessImports, themeData: themeData });
		},
	], callback);
}

CSS.buildBundle = function (target, fork, callback) {
	async.waterfall([
		function (next) {
			if (target === 'client') {
				rimraf(path.join(__dirname, '../../build/public/client*css'), next);
			} else {
				setImmediate(next);
			}
		},
		function (next) {
			getBundleMetadata(target, next);
		},
		function (data, next) {
			var minify = process.env.NODE_ENV !== 'development';
			async.parallel({
				scss: function (next) {
					minifier.css.bundle(data.imports, data.paths, 'scss', minify, fork, next);
				},
				less: function (next) {
					minifier.css.bundle(data.lessImports, data.paths, 'less', minify, fork, next);
				},
			}, next);
		},
		function (result, next) {
			var filename = target + '.css';
			const code = result.scss.code + result.less.code;
			fs.writeFile(path.join(__dirname, '../../build/public', filename), code, function (err) {
				next(err, code);
			});
		},
	], callback);
};
