'use strict';

const nconf = require('nconf');

module.exports = [
	{
		name: 'postgres:host',
		description: 'Host IP or address of your PostgreSQL instance',
		default: nconf.get('postgres:host') || '127.0.0.1',
	},
	{
		name: 'postgres:port',
		description: 'Host port of your PostgreSQL instance',
		default: nconf.get('postgres:port') || 5432,
	},
	{
		name: 'postgres:username',
		description: 'PostgreSQL username',
		default: nconf.get('postgres:username') || '',
	},
	{
		name: 'postgres:password',
		description: 'Password of your PostgreSQL database',
		hidden: true,
		default: nconf.get('postgres:password') || '',
		before: function (value) { value = value || nconf.get('postgres:password') || ''; return value; },
	},
	{
		name: 'postgres:database',
		description: 'PostgreSQL database name',
		default: nconf.get('postgres:database') || 'nodebb',
	},
	{
		name: 'postgres:ssl',
		description: 'Enable SSL for PostgreSQL database access',
		default: nconf.get('postgres:ssl') || false,
	},
];
