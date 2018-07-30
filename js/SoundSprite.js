(function() {

	var
	SoundSprite = window.SoundSprite = function(audio, sounds) {

		this.audio = audio;
		this.sounds = sounds;
		this.playHandler = this.bind(this._playHandler);

	};
	SoundSprite.prototype.sound = [0, 0];
	SoundSprite.prototype.play = function(sound) {

		console.log(`SoundSprite.play(${sound})`);
		// console.log(this.audio.currentTime);

		this.stop();

		this.sound = this.sounds[sound];

		this.audio.currentTime = this.sound[0];
		this.audio.play();

		this.audio.addEventListener('timeupdate', this.playHandler);

	};
	SoundSprite.prototype.stop = function() {

		console.log(`SoundSprite.stop()`);
		// console.log(this.audio.currentTime);

		this.sound = [0, 0];
		this.audio.currentTime = 0;
		this.audio.pause();
		this.audio.removeEventListener('timeupdate', this.playHandler);

	};
	SoundSprite.prototype.bind = function(handler) {

		var context = this;

		return function(event) {
			return handler.call(context, event);
		};

	};
	SoundSprite.prototype._playHandler = function() {

		console.log('this.audio.currentTime', this.audio.currentTime);
		console.log(this.sound[1]);

		if(this.audio.currentTime>=this.sound[1]) {
			// console.log('stop');
			this.stop();
		};

	};

})();
