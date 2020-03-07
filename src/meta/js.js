'use strict';

var path = require('path');
var async = require('async');
var fs = require('fs');
const util = require('util');
var mkdirp = require('mkdirp');
var mkdirpCallback;
if (mkdirp.hasOwnProperty('native')) {
	mkdirpCallback = util.callbackify(mkdirp);
} else {
	mkdirpCallback = mkdirp;
	mkdirp = util.promisify(mkdirp);
}

var rimraf = require('rimraf');

var file = require('../file');
var plugins = require('../plugins');
var minifier = require('./minifier');

var JS = module.exports;

JS.scripts = {
	base: [
		'node_modules/promise-polyfill/dist/polyfill.js',
		'public/vendor/jquery/bootstrap-tagsinput/bootstrap-tagsinput.min.js',
	],

	// plugins add entries into this object,
	// they get linked into /build/public/src/modules
	modules: { },
};

function linkIfLinux(srcPath, destPath, next) {
	if (process.platform === 'win32') {
		fs.copyFile(srcPath, destPath, next);
	} else {
		file.link(srcPath, destPath, true, next);
	}
}

var basePath = path.resolve(__dirname, '../..');

function linkModules(callback) {
	var modules = JS.scripts.modules;

	async.each(Object.keys(modules), function (relPath, next) {
		var srcPath = path.join(__dirname, '../../', modules[relPath]);
		var destPath = path.join(__dirname, '../../build/public/src/modules', relPath);

		async.parallel({
			dir: function (cb) {
				mkdirpCallback(path.dirname(destPath), cb);
			},
			stats: function (cb) {
				fs.stat(srcPath, cb);
			},
		}, function (err, res) {
			if (err) {
				return next(err);
			}
			if (res.stats.isDirectory()) {
				return file.linkDirs(srcPath, destPath, true, next);
			}

			linkIfLinux(srcPath, destPath, next);
		});
	}, callback);
}

var moduleDirs = ['modules', 'admin', 'client'];

function clearModules(callback) {
	var builtPaths = moduleDirs.map(function (p) {
		return path.join(__dirname, '../../build/public/src', p);
	});
	async.each(builtPaths, function (builtPath, next) {
		rimraf(builtPath, next);
	}, function (err) {
		callback(err);
	});
}

JS.buildModules = function (callback) {
	async.waterfall([
		clearModules,
		function (next) {
			linkModules(next);
		},
	], callback);
};

JS.linkStatics = function (callback) {
	rimraf(path.join(__dirname, '../../build/public/plugins'), function (err) {
		if (err) {
			return callback(err);
		}
		async.each(Object.keys(plugins.staticDirs), function (mappedPath, next) {
			var sourceDir = plugins.staticDirs[mappedPath];
			var destDir = path.join(__dirname, '../../build/public/plugins', mappedPath);

			mkdirpCallback(path.dirname(destDir), function (err) {
				if (err) {
					return next(err);
				}

				file.linkDirs(sourceDir, destDir, true, next);
			});
		}, callback);
	});
};

function getBundleScriptList(target, callback) {
	var pluginDirectories = [];

	if (target === 'admin') {
		target = 'acp';
	}
	var pluginScripts = plugins[target + 'Scripts'].filter(function (path) {
		if (path.endsWith('.js')) {
			return true;
		}

		pluginDirectories.push(path);
		return false;
	});

	async.each(pluginDirectories, function (directory, next) {
		file.walk(directory, function (err, scripts) {
			if (err) {
				return next(err);
			}

			pluginScripts = pluginScripts.concat(scripts);
			next();
		});
	}, function (err) {
		if (err) {
			return callback(err);
		}

		pluginScripts = JS.scripts.base.concat(pluginScripts).map(function (script) {
			var srcPath = path.resolve(basePath, script).replace(/\\/g, '/');
			return {
				srcPath: srcPath,
				filename: path.relative(basePath, srcPath).replace(/\\/g, '/'),
			};
		});

		callback(null, pluginScripts);
	});
}

JS.buildBundle = function (target, fork, callback) {
	var fileNames = {
		client: 'client-scripts.min.js',
		admin: 'acp-scripts.min.js',
	};

	async.waterfall([
		function (next) {
			getBundleScriptList(target, next);
		},
		function (files, next) {
			mkdirpCallback(path.join(__dirname, '../../build/public'), function (err) {
				next(err, files);
			});
		},
		function (files, next) {
			var minify = process.env.NODE_ENV !== 'development';
			var filePath = path.join(__dirname, '../../build/public', fileNames[target]);

			minifier.js.bundle({
				files: files,
				filename: fileNames[target],
				destPath: filePath,
			}, minify, fork, next);
		},
	], callback);
};

JS.killMinifier = function () {
	minifier.killAll();
};
