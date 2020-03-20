'use strict';

const nconf = require('nconf');
const prompt = require('prompt');

function isUriNotSpecified() {
	return !prompt.history('mongo:uri').value;
}

module.exports = [
	{
		name: 'mongo:uri',
		description: 'MongoDB connection URI: (leave blank if you wish to specify host, port, username/password and database individually)\nFormat: mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]',
		default: nconf.get('mongo:uri') || '',
		hideOnWebInstall: true,
	},
	{
		name: 'mongo:host',
		description: 'Host IP or address of your MongoDB instance',
		default: nconf.get('mongo:host') || '127.0.0.1',
		ask: isUriNotSpecified,
	},
	{
		name: 'mongo:port',
		description: 'Host port of your MongoDB instance',
		default: nconf.get('mongo:port') || 27017,
		ask: isUriNotSpecified,
	},
	{
		name: 'mongo:username',
		description: 'MongoDB username',
		default: nconf.get('mongo:username') || '',
		ask: isUriNotSpecified,
	},
	{
		name: 'mongo:password',
		description: 'Password of your MongoDB database',
		default: nconf.get('mongo:password') || '',
		hidden: true,
		ask: isUriNotSpecified,
		before: function (value) { value = value || nconf.get('mongo:password') || ''; return value; },
	},
	{
		name: 'mongo:database',
		description: 'MongoDB database name',
		default: nconf.get('mongo:database') || 'nodebb',
		ask: isUriNotSpecified,
	},
];
