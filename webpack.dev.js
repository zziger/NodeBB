'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

common.entry['css/no-skin'] = './public/scss/skins/no-skin.scss';

module.exports = merge(common, {
	mode: 'development',
	// devtool: 'inline-source-map',
});
