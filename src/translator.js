'use strict';

const winston = require('winston');
const languages = require('./languages');

const warn = function (msg) {
	winston.warn(msg);
};

// async function loadServer(language, namespace) {
// 	return await languages.get(language, namespace);
// }

// function loadServer(language, namespace) {
// 	return new Promise(function (resolve, reject) {
// 		languages.get(language, namespace, function (err, data) {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(data);
// 			}
// 		});
// 	});
// }

module.exports = require('../public/src/modules/translator')(require('./utils'), languages.get, warn);
