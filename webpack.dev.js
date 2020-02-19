'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = async function () {
	const commonCfg = await common();
	return merge(commonCfg, {
		mode: 'development',
		// devtool: 'inline-source-map',
	});
};
