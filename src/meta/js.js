'use strict';

const path = require('path');
const async = require('async');
const fs = require('fs');
const util = require('util');
let mkdirp = require('mkdirp');
let mkdirpCallback;
if (mkdirp.hasOwnProperty('native')) {
	mkdirpCallback = util.callbackify(mkdirp);
} else {
	mkdirpCallback = mkdirp;
	mkdirp = util.promisify(mkdirp);
}

const rimraf = require('rimraf');

const file = require('../file');
const plugins = require('../plugins');
const minifier = require('./minifier');

const JS = module.exports;

JS.scripts = {
	base: [
		'node_modules/promise-polyfill/dist/polyfill.js',
		'public/vendor/jquery/bootstrap-tagsinput/bootstrap-tagsinput.min.js',
	],

	// plugins add entries into this object,
	// they get linked into /build/public/src/modules
	modules: { },
};

async function linkIfLinux(srcPath, destPath) {
	if (process.platform === 'win32') {
		await fs.promises.copyFile(srcPath, destPath);
	} else {
		await file.link(srcPath, destPath, true);
	}
}

const basePath = path.resolve(__dirname, '../..');

async function linkModules() {
	const modules = JS.scripts.modules;

	await Promise.all([
		mkdirp(path.join(__dirname, '../../build/public/src/modules/admin/plugins')),
		mkdirp(path.join(__dirname, '../../build/public/src/modules/forum/plugins')),
	]);
	await Promise.all(Object.keys(modules).map(async function (relPath) {
		const srcPath = path.join(__dirname, '../../', modules[relPath]);
		const destPath = path.join(__dirname, '../../build/public/src/modules', relPath);

		const [stats] = await Promise.all([
			fs.promises.stat(srcPath),
			mkdirp(path.dirname(destPath)),
		]);

		if (stats.isDirectory()) {
			await file.linkDirs(srcPath, destPath, true);
		} else {
			await linkIfLinux(srcPath, destPath);
		}
	}));
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
		async function () {
			await linkModules();
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
