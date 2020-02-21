'use strict';


var async = require('async');
var fork = require('child_process').fork;
const webpack = require('webpack');
let compiler;
var env = process.env;
var worker;
var updateWorker;
var incomplete = [];
var running = 0;

env.NODE_ENV = env.NODE_ENV || 'development';


var nconf = require('nconf');
nconf.file({
	file: 'config.json',
});

nconf.defaults({
	base_dir: __dirname,
	views_dir: './build/public/templates',
	isCluster: 'false',
});
var winston = require('winston');
winston.configure({
	transports: [
		new winston.transports.Console({
			handleExceptions: true,
		}),
	],
});
var db = require('./src/database');

module.exports = function (grunt) {
	var args = [];
	var initArgs = ['--build'];
	if (!grunt.option('verbose')) {
		args.push('--log-level=info');
		initArgs.push('--log-level=info');
	}

	function update(action, filepath, target) {
		var updateArgs = args.slice();
		var compiling;
		var time = Date.now();

		if (target === 'lessUpdated_Client') {
			compiling = 'clientCSS';
		} else if (target === 'lessUpdated_Admin') {
			compiling = 'acpCSS';
		} else if (target === 'clientUpdated') {
			compiling = 'js';
		} else if (target === 'templatesUpdated') {
			compiling = 'tpl';
		} else if (target === 'langUpdated') {
			compiling = 'lang';
		} else if (target === 'serverUpdated') {
			// Do nothing, just restart
		}

		if (compiling && !incomplete.includes(compiling)) {
			incomplete.push(compiling);
		}

		updateArgs.push('--build');
		updateArgs.push(incomplete.join(','));

		worker.kill();
		if (updateWorker) {
			updateWorker.kill('SIGKILL');
		}
		updateWorker = fork('app.js', updateArgs, { env: env });
		running += 1;
		updateWorker.on('exit', function () {
			running -= 1;
			if (running === 0) {
				worker = fork('app.js', args, {
					env: env,
				});
				worker.on('message', function () {
					if (incomplete.length) {
						incomplete = [];

						if (grunt.option('verbose')) {
							grunt.log.writeln('NodeBB restarted in ' + (Date.now() - time) + ' ms');
						}
					}
				});
			}
		});
	}

	grunt.initConfig({
		watch: {},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);

	grunt.registerTask('init', function () {
		var done = this.async();
		async.waterfall([
			function (next) {
				db.init(next);
			},
			function (next) {
				db.getSortedSetRange('plugins:active', 0, -1, next);
			},
			function (plugins, next) {
				addBaseThemes(plugins, next);
			},
			function (plugins, next) {
				if (!plugins.includes('nodebb-plugin-composer-default')) {
					plugins.push('nodebb-plugin-composer-default');
				}

				if (process.argv.includes('--core')) {
					plugins = [];
				}

				// const lessUpdated_Client = plugins.map(p => 'node_modules/' + p + '/**/*.less');
				// const lessUpdated_Admin = plugins.map(p => 'node_modules/' + p + '/**/*.less');
				const clientUpdated = plugins.map(p => 'node_modules/' + p + '/**/*.js');
				const templatesUpdated = plugins.map(p => 'node_modules/' + p + '/**/*.tpl');
				const langUpdated = plugins.map(p => 'node_modules/' + p + '/**/*.json');

				grunt.config(['watch'], {
					// lessUpdated_Client: {
					// 	files: [
					// 		'public/less/*.less',
					// 		'!public/less/admin/**/*.less',
					// 		...lessUpdated_Client,
					// 		'!node_modules/nodebb-*/node_modules/**',
					// 		'!node_modules/nodebb-*/.git/**',
					// 	],
					// 	options: {
					// 		interval: 1000,
					// 	},
					// },
					// lessUpdated_Admin: {
					// 	files: [
					// 		'public/less/admin/**/*.less',
					// 		...lessUpdated_Admin,
					// 		'!node_modules/nodebb-*/node_modules/**',
					// 		'!node_modules/nodebb-*/.git/**',
					// 	],
					// 	options: {
					// 		interval: 1000,
					// 	},
					// },
					clientUpdated: {
						files: [
							// 'public/src/**/*.js',
							...clientUpdated,
							'!node_modules/nodebb-*/node_modules/**',
							'node_modules/benchpressjs/build/benchpress.js',
							'!node_modules/nodebb-*/.git/**',
						],
						options: {
							interval: 1000,
						},
					},
					serverUpdated: {
						files: ['*.js', 'install/*.js', 'src/**/*.js', '!src/upgrades/**'],
						options: {
							interval: 1000,
						},
					},
					templatesUpdated: {
						files: [
							'src/views/**/*.tpl',
							...templatesUpdated,
							'!node_modules/nodebb-*/node_modules/**',
							'!node_modules/nodebb-*/.git/**',
						],
						options: {
							interval: 1000,
						},
					},
					langUpdated: {
						files: [
							'public/language/en-GB/*.json',
							'public/language/en-GB/**/*.json',
							...langUpdated,
							'!node_modules/nodebb-*/node_modules/**',
							'!node_modules/nodebb-*/.git/**',
							'!node_modules/nodebb-*/plugin.json',
							'!node_modules/nodebb-*/package.json',
							'!node_modules/nodebb-*/theme.json',
						],
						options: {
							interval: 1000,
						},
					},
				});

				if (grunt.option('skip')) {
					next();
				} else {
					const initWorker = fork('app.js', initArgs, {
						env: env,
					});

					initWorker.on('exit', function () {
						next();
					});
				}
			},
		], done);
	});

	function getWebpackConfig() {
		// return require(process.env.NODE_ENV !== 'development' ? './webpack.prod' : './webpack.dev');
		return require('./webpack.dev');
	}

	async function bundle(callback) {
		winston.info('[build] Bundling with Webpack.');

		const webpackCfg = getWebpackConfig();
		const pluginPaths = await db.getSortedSetRange('plugins:active', 0, -1);
		if (!pluginPaths.includes('nodebb-plugin-composer-default')) {
			pluginPaths.push('nodebb-plugin-composer-default');
		}

		pluginPaths.map(p => 'node_modules/' + p + '/node_modules');
		webpackCfg.resolve.modules = webpackCfg.resolve.modules.concat(pluginPaths);
		const util = require('util');
		compiler = webpack(webpackCfg);

		try {
			const watchAsync = util.promisify(function (opts, cb) {
				compiler.watch(opts, cb);
			});
			const stats = await watchAsync({
				poll: 1000,
				info: 'verbose',
				'info-verbosity': 'verbose',
			});

			if (stats.hasErrors() || stats.hasWarnings()) {
				const info = stats.toString('minimal');
				console.log(info);
			}
		} catch (err) {
			console.error(err.stack || err);
			if (err.details) {
				console.error(err.details);
			}
			return callback(err);
		}
		callback();
	}
	grunt.registerTask('webpack', function () {
		var done = this.async();
		bundle(done);
	});

	grunt.registerTask('run', function () {
		worker = fork('app.js', args, {
			env: env,
		});
	});

	grunt.task.run(['init', 'webpack', 'run', 'watch']);

	env.NODE_ENV = 'development';

	grunt.event.on('watch', update);
};

function addBaseThemes(plugins, callback) {
	const themeId = plugins.find(p => p.startsWith('nodebb-theme-'));
	if (!themeId) {
		return setImmediate(callback, null, plugins);
	}
	function getBaseRecursive(themeId) {
		try {
			const baseTheme = require(themeId + '/theme').baseTheme;

			if (baseTheme) {
				plugins.push(baseTheme);
				getBaseRecursive(baseTheme);
			}
		} catch (err) {
			console.log(err);
		}
	}

	getBaseRecursive(themeId);
	callback(null, plugins);
}
