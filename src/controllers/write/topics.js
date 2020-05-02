'use strict';

const topics = require('../../topics');
const posts = require('../../posts');
const user = require('../../user');
const meta = require('../../meta');

const helpers = require('../helpers');
const socketHelpers = require('../../socket.io/helpers');

const Topics = module.exports;

Topics.create = async (req, res) => {
	const payload = { ...req.body };
	payload.tags = payload.tags || [];

	socketHelpers.setDefaultPostData(payload, { uid: req.uid, request: req, ip: req.ip });

	// Blacklist & Post Queue
	await meta.blacklist.test(req.ip);
	const shouldQueue = await posts.shouldQueue(req.uid, payload);
	if (shouldQueue) {
		const queueObj = await posts.addToQueue(payload);
		return helpers.formatApiResponse(202, res, queueObj);
	}

	const result = await topics.post(payload);
	helpers.formatApiResponse(200, res, result.topicData);
	socketHelpers.notifyNew(req.uid, 'newTopic', { posts: [result.postData], topic: result.topicData });
};

Topics.reply = async (req, res) => {
	const payload = {
		tid: req.params.tid,
		content: req.body.content,
	};

	if (req.body.toPid) { payload.toPid = req.body.toPid; }

	socketHelpers.setDefaultPostData(payload, { uid: req.uid, request: req, ip: req.ip });

	// Blacklist & Post Queue
	await meta.blacklist.test(req.ip);
	const shouldQueue = await posts.shouldQueue(req.uid, payload);
	if (shouldQueue) {
		return await posts.addToQueue(payload);
	}

	const postData = await topics.reply(payload);	// postData seems to be a subset of postObj, refactor?
	const postObj = await posts.getPostSummaryByPids([postData.pid], req.uid, {});
	helpers.formatApiResponse(200, res, postObj[0]);

	const result = {
		posts: [postData],
		'reputation:disabled': meta.config['reputation:disabled'] === 1,
		'downvote:disabled': meta.config['downvote:disabled'] === 1,
	};

	user.updateOnlineUsers(req.uid);
	socketHelpers.notifyNew(req.uid, 'newPost', result);
};
