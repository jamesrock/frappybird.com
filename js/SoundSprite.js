export class SoundSprite {
	constructor(name, sounds) {

		this.audio = new Audio(`/audio/${name}.mp3`);
		this.sounds = sounds;
		this.playHandler = this.bind(this._playHandler);

	};
	play(sound) {

		console.log(`SoundSprite.play(${sound})`);

		// this.stop();

		this.sound = this.sounds[sound];

		this.audio.currentTime = this.sound[0];
		this.audio.play();

		this.audio.addEventListener('timeupdate', this.playHandler);

	};
	stop() {

		// console.log(`SoundSprite.stop()`);

		this.sound = [0, 0];
		this.audio.currentTime = 0;
		this.audio.pause();
		this.audio.removeEventListener('timeupdate', this.playHandler);

	};
	bind(handler) {

		var context = this;

		return function(event) {
			return handler.call(context, event);
		};

	};
	_playHandler() {

		// console.log('this.audio.currentTime', this.audio.currentTime);

		if(this.audio.currentTime>=this.sound[1]) {
			this.stop();
		};

	};
	sound = [0, 0];
	muted = true;
};