(function() {

	var
	SoundSprite = window.SoundSprite = function(audio, sounds) {

		this.audio = audio;
		this.sounds = sounds;

	};
	SoundSprite.prototype.play = function(sound) {

		console.log(`SoundSprite.play(${sound})`);

	};

})();
