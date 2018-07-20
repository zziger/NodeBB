'use strict';

var CACHE_NAME = 'nodebb';
var urlsToCache = [
	'/assets/stylesheet.css',
	'/assets/nodebb.min.js',
];

var Router = {
	patterns: {
		ignore: ['/socket.io'],
		netFirst: [/^\/api\/?/, /^\/assets\/templates\//, /\/^categories\/?/],
	},
	handle: function (event) {
		if (this.patterns.ignore.some(function (path) {
			return event.request.url.indexOf(self.origin + path) === 0;
		})) {
			return;
		}

		// Out-of-scope resources always cache first
		if (event.request.url.indexOf(self.origin) === -1) {
			return Router.cacheFirst(event);
		}

		var url = event.request.url.slice(self.origin.length);
		if (this.patterns.netFirst.some(function (pattern) {
			return pattern.test(url);
		})) {
			Router.netFirst(event);
		} else {
			Router.cacheFirst(event);
		}
	},
	netFirst: function (event) {
		console.log('netfirst', event.request.url);
		event.respondWith(fetch(event.request).then(function (response) {
			if (!response || response.status !== 200 || response.type !== 'basic') {
				return response;
			}

			var responseToCache = response.clone();

			caches.open(CACHE_NAME).then(function (cache) {
				cache.put(event.request, responseToCache);
			});

			return response;
		}).catch(function () {
			// Offline
			return caches.match(event.request).then(function (response) {
				if (response) {
					return response;
				}

				console.log('cache miss');
			});
		}));
	},
	cacheFirst: function (event) {
		console.log('cachefirst', event.request.url);
		event.respondWith(caches.match(event.request).then(function (response) {
			// Cache hit - return response
			if (response) {
				return response;
			}

			var fetchRequest = event.request.clone();

			return fetch(fetchRequest).then(function (response) {
				if (!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}

				var responseToCache = response.clone();

				caches.open(CACHE_NAME).then(function (cache) {
					cache.put(event.request, responseToCache);
				});

				return response;
			});
		}));
	},
};

self.addEventListener('install', function (event) {
	event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
		console.log('Opened cache');
		return cache.addAll(urlsToCache);
	}));
});

self.addEventListener('fetch', function (event) {
	Router.handle(event);
});
