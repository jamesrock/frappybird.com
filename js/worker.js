self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll([
				'/audio/die.mp3',
				'/audio/hit.mp3',
				'/audio/point.mp3',
				'/audio/swoosh.mp3',
				'/audio/wing.mp3',
				'/index.html',
				'/spritesheet.png',
				'/js/frappybird.js',
				'/css/frappybird.css'
			]);
		})
	);
});
