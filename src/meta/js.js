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
		'public/vendor/jquery/timeago/jquery.timeago.js',
		'public/vendor/jquery/bootstrap-tagsinput/bootstrap-tagsinput.min.js',
	],

	admin: [
		'node_modules/material-design-lite/material.js',
		'public/vendor/jquery/sortable/Sortable.js',
		'public/vendor/colorpicker/colorpicker.js',
		// 'public/src/admin/admin.js', // done
		'public/vendor/semver/semver.browser.js',
		'public/vendor/jquery/serializeObject/jquery.ba-serializeobject.min.js',
		'public/vendor/jquery/deserialize/jquery.deserialize.min.js',
		// 'public/vendor/slideout/slideout.min.js', // done
		// 'public/vendor/nprogress.min.js', // done
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

function minifyModules(modules, fork, callback) {
	var moduleDirs = modules.reduce(function (prev, mod) {
		var dir = path.resolve(path.dirname(mod.destPath));
		if (!prev.includes(dir)) {
			prev.push(dir);
		}
		return prev;
	}, []);

	async.eachSeries(moduleDirs, mkdirpCallback, function (err) {
		if (err) {
			return callback(err);
		}

		var filtered = modules.reduce(function (prev, mod) {
			if (mod.srcPath.endsWith('.min.js') || path.dirname(mod.srcPath).endsWith('min')) {
				prev.skip.push(mod);
			} else {
				prev.minify.push(mod);
			}

			return prev;
		}, { minify: [], skip: [] });

		async.parallel([
			function (cb) {
				minifier.js.minifyBatch(filtered.minify, fork, cb);
			},
			function (cb) {
				async.each(filtered.skip, function (mod, next) {
					linkIfLinux(mod.srcPath, mod.destPath, next);
				}, cb);
			},
		], callback);
	});
}

function linkModules(callback) {
	var modules = JS.scripts.modules;

	async.each(Object.keys(modules), function (relPath, next) {
		var srcPath = path.join(__dirname, '../../', modules[relPath]);
		var destPath = path.join(__dirname, '../../build/public/src/modules', relPath);

		async.parallel({
			dir: function (cb) {
				mkdirpCallback(path.dirname(destPath), function (err) {
					cb(err);
				});
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

function getModuleList(callback) {
	var modules = Object.keys(JS.scripts.modules).map(function (relPath) {
		return {
			srcPath: path.join(__dirname, '../../', JS.scripts.modules[relPath]),
			destPath: path.join(__dirname, '../../build/public/src/modules', relPath),
		};
	});

	var coreDirs = moduleDirs.map(function (dir) {
		return {
			srcPath: path.join(__dirname, '../../public/src', dir),
			destPath: path.join(__dirname, '../../build/public/src', dir),
		};
	});

	modules = modules.concat(coreDirs);

	var moduleFiles = [];
	async.each(modules, function (module, next) {
		var srcPath = module.srcPath;
		var destPath = module.destPath;

		fs.stat(srcPath, function (err, stats) {
			if (err) {
				return next(err);
			}
			if (!stats.isDirectory()) {
				moduleFiles.push(module);
				return next();
			}

			file.walk(srcPath, function (err, files) {
				if (err) {
					return next(err);
				}

				var mods = files.filter(function (filePath) {
					return path.extname(filePath) === '.js';
				}).map(function (filePath) {
					return {
						srcPath: path.normalize(filePath),
						destPath: path.join(destPath, path.relative(srcPath, filePath)),
					};
				});

				moduleFiles = moduleFiles.concat(mods).map(function (mod) {
					mod.filename = path.relative(basePath, mod.srcPath).replace(/\\/g, '/');
					return mod;
				});

				next();
			});
		});
	}, function (err) {
		callback(err, moduleFiles);
	});
}

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

JS.buildModules = function (fork, callback) {
	async.waterfall([
		clearModules,
		function (next) {
			if (true || global.env === 'development') {
				return linkModules(callback);
			}

			getModuleList(next);
		},
		function (modules, next) {
			minifyModules(modules, fork, next);
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
		client: 'clientScripts.min.js',
		admin: 'acpScripts.min.js',
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
