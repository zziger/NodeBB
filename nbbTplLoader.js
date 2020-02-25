'use strict';

const loaderUtils = require('loader-utils');
const benchpress = require('benchpressjs');
const templates = require('./src/meta/templates');

module.exports = async function (content) {
	const callback = this.async();
	const options = loaderUtils.getOptions(this);

	const context = options.context || this.rootContext;
	const url = loaderUtils.interpolateName(
		this,
		options.name || '[path][name].[ext]',
		{
			context,
			content,
			regExp: options.regExp,
		}
	);
	const mapping = require('./build/public/templates/template_map.json');
	const outputPath = url.replace(/^build\/public\/templates\//, '');
	// console.log('gg', outputPath);

	content = await templates.processImports(mapping, outputPath, content);
	const compiled = await benchpress.precompile(content, { minify: false /* global.env !== 'development' */ });
	callback(null, compiled);
};
