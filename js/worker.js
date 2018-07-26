self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll([
				'/audio/',
				'/index.html',
				'/spritesheet.png',
				'/js/frappybird.js',
				'/css/frappybird.css',
			]);
		})
	);
});
