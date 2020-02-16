'use strict';

const winston = require('winston');
const languages = require('./languages');

const warn = function (msg) {
	winston.warn(msg);
};

module.exports = require('../public/src/modules/translator.core')(require('./utils'), languages.get, warn);
