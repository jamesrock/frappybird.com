export class SoundHandler {
	constructor(sounds) {

		this.sounds = sounds;

	};
	play(sound) {

		console.log(`SoundHandler.play(${sound})`);

    const audio = new Audio(this.sounds[sound]);
		audio.play();

	};
	sound = [0, 0];
	muted = true;
};