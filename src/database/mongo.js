
'use strict';


const winston = require('winston');
const nconf = require('nconf');
const session = require('express-session');
const semver = require('semver');
const utils = require('../utils');

let client;

const connection = require('./mongo/connection');

const mongoModule = module.exports;

mongoModule.questions = require('./mongo/questions');

mongoModule.init = async function () {
	client = await connection.connect(nconf.get('mongo'));
	mongoModule.client = client.db();
};

mongoModule.createSessionStore = async function (options) {
	const client = await connection.connect(options);
	const meta = require('../meta');
	const sessionStore = require('connect-mongo')(session);
	const store = new sessionStore({
		client: client,
		ttl: meta.getSessionTTLSeconds(),
	});

	return store;
};

mongoModule.createIndices = async function () {
	if (!mongoModule.client) {
		winston.warn('[database/createIndices] database not initialized');
		return;
	}

	winston.info('[database] Checking database indices.');
	const collection = mongoModule.client.collection('objects');
	await collection.createIndex({ _key: 1, score: -1 }, { background: true });
	await collection.createIndex({ _key: 1, value: -1 }, { background: true, unique: true, sparse: true });
	await collection.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0, background: true });
	winston.info('[database] Checking database indices done!');
};

mongoModule.checkCompatibility = function (callback) {
	const mongoPkg = require('mongodb/package.json');
	mongoModule.checkCompatibilityVersion(mongoPkg.version, callback);
};

mongoModule.checkCompatibilityVersion = function (version, callback) {
	if (semver.lt(version, '2.0.0')) {
		return callback(new Error('The `mongodb` package is out-of-date, please run `./nodebb setup` again.'));
	}

	callback();
};

mongoModule.info = async function (db) {
	if (!db) {
		const client = await connection.connect(nconf.get('mongo'));
		db = client.db();
	}
	mongoModule.client = mongoModule.client || db;

	let [serverStatus, stats, listCollections] = await Promise.all([
		db.command({ serverStatus: 1 }),
		db.command({ dbStats: 1 }),
		getCollectionStats(db),
	]);
	stats = stats || {};
	serverStatus = serverStatus || {};
	const scale = 1024 * 1024 * 1024;

	listCollections = listCollections.map(function (collectionInfo) {
		return {
			name: collectionInfo.ns,
			count: collectionInfo.count,
			size: collectionInfo.size,
			avgObjSize: collectionInfo.avgObjSize,
			storageSize: collectionInfo.storageSize,
			totalIndexSize: collectionInfo.totalIndexSize,
			indexSizes: collectionInfo.indexSizes,
		};
	});

	stats.mem = serverStatus.mem || {};
	stats.mem.resident = (stats.mem.resident / 1024).toFixed(3);
	stats.mem.virtual = (stats.mem.virtual / 1024).toFixed(3);
	stats.mem.mapped = (stats.mem.mapped / 1024).toFixed(3);
	stats.collectionData = listCollections;
	stats.network = serverStatus.network || {};
	stats.network.bytesIn = (stats.network.bytesIn / scale).toFixed(3);
	stats.network.bytesOut = (stats.network.bytesOut / scale).toFixed(3);
	stats.network.numRequests = utils.addCommas(stats.network.numRequests);
	stats.raw = JSON.stringify(stats, null, 4);

	stats.avgObjSize = stats.avgObjSize.toFixed(2);
	stats.dataSize = (stats.dataSize / scale).toFixed(3);
	stats.storageSize = (stats.storageSize / scale).toFixed(3);
	stats.fileSize = stats.fileSize ? (stats.fileSize / scale).toFixed(3) : 0;
	stats.indexSize = (stats.indexSize / scale).toFixed(3);
	stats.storageEngine = serverStatus.storageEngine ? serverStatus.storageEngine.name : 'mmapv1';
	stats.host = serverStatus.host;
	stats.version = serverStatus.version;
	stats.uptime = serverStatus.uptime;
	stats.mongo = true;
	return stats;
};

async function getCollectionStats(db) {
	const items = await db.listCollections().toArray();
	return await Promise.all(items.map(collection => db.collection(collection.name).stats()));
}

mongoModule.close = function (callback) {
	callback = callback || function () {};
	client.close(err => callback(err));
};

mongoModule.socketAdapter = function () {
	const mongoAdapter = require('socket.io-adapter-mongo');
	return mongoAdapter(connection.getConnectionString());
};

require('./mongo/main')(mongoModule);
require('./mongo/hash')(mongoModule);
require('./mongo/sets')(mongoModule);
require('./mongo/sorted')(mongoModule);
require('./mongo/list')(mongoModule);
require('./mongo/transaction')(mongoModule);

require('../promisify')(mongoModule, ['client', 'sessionStore']);
