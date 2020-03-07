'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const skins = [
	'no-skin',
	'cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal',
	'litera', 'lumen', 'lux', 'materia', 'minty', 'pulse', 'sandstone',
	'simplex', 'sketchy', 'slate', 'solar', 'spacelab', 'superhero',
	'united', 'yeti',
];

const skinEntries = {};
skins.forEach((skin) => {
	skinEntries['css/' + skin] = './public/scss/skins/' + skin + '.scss';
});
common.entry = {
	...common.entry,
	...skinEntries,
};
module.exports = merge(common, {
	mode: 'production',
});
