'use strict';

// webpack can handle these
//  info: [build]         plugin static dirs  build started
//  info: [build]          requirejs modules  build started
//  info: [build]           client js bundle  build started
//  info: [build]            admin js bundle  build started
//  info: [build]         client side styles  build started
//  info: [build] admin control panel styles  build started

// these need webpack loaders ?
//  info: [build]                  templates  build started
//  info: [build]                  languages  build started
//  info: [build]                     sounds  build started


// things to figure out
// ajaxify.js load template via require([]) and load page script via require([])

// what about plugins? >_>
// allJsFilesOfFolder.js:
// require.context("../scripts/", true, /\.js$/);
// This will bundle all scripts inside scripts and all its subfolders
// You need to install @types/webpack-env to have context at your hand.

const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


async function getPluginFolders() {
	const nconf = require('nconf');
	nconf.file({
		file: 'config.json',
	});

	nconf.defaults({
		base_dir: __dirname,
		views_dir: './build/public/templates',
	});
	const winston = require('winston');
	winston.configure({
		transports: [
			new winston.transports.Console({
				handleExceptions: true,
			}),
		],
	});
	const db = require('./src/database');
	await db.init();
	const plugins = await db.getSortedSetRange('plugins:active', 0, -1);
	await db.close();
	if (!plugins.includes('nodebb-plugin-composer-default')) {
		plugins.push('nodebb-plugin-composer-default');
	}
	console.log('plugins', plugins.map(p => 'node_modules/' + p + '/node_modules'));
	return plugins.map(p => 'node_modules/' + p + '/node_modules');
}

module.exports = async function () {
	const plugins = await getPluginFolders();
	return {
		plugins: [
			new CleanWebpackPlugin(), // cleans dist folder
			new MiniCssExtractPlugin(), // extract css to separate file
		],
		entry: {
			app: './public/src/app.js',
			admin: './public/src/admin/admin.js',
		},
		resolve: {
			modules: [
				'build/public/src/modules',
				'public/src',
				'public/src/modules',
				'public/src/client',
				...plugins,
				'node_modules',
			],
			alias: {
				assets: path.resolve(__dirname, 'build/public'),
				forum: path.resolve(__dirname, 'public/src/client'),
				admin: path.resolve(__dirname, 'public/src/admin'),
				vendor: path.resolve(__dirname, 'public/vendor'),
				benchpress: path.resolve(__dirname, 'node_modules/benchpressjs'),
			},
		},
		output: {
			filename: '[name].bundle.js',
			chunkFilename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/dist/',
		},
		node: { fs: 'empty' },
		module: {
			rules: [
				// {
				// 	test: /\.js$/,
				// 	exclude: /(node_modules|bower_components)/,
				// 	use: {
				// 		loader: 'babel-loader',
				// 		options: {
				// 		  presets: ['@babel/preset-env']
				// 		}
				// 	}
				// },
				{
					test: /\.(scss)$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						// {
						// Adds CSS to the DOM by injecting a `<style>` tag
						// loader: 'style-loader'
						// },
						{
							// Interprets `@import` and `url()` like `import/require()` and will resolve them
							loader: 'css-loader',
						},
						{
							// Loader for webpack to process CSS with PostCSS
							loader: 'postcss-loader',
							options: {
								plugins: function () {
									return [
										require('autoprefixer'),
									];
								},
							},
						},
						{
							// Loads a SASS/SCSS file and compiles it to CSS
							loader: 'sass-loader',
						},
					],
				},
			],
		},
	};
};
