(function() {

	var
	deflate = function(n) {

		return ROCK.MATH.roundTo(n/scale, 1);

	},
	getRandom = function() {

		return ROCK.MATH.random(80, 180);

	},
	moveScore = function() {

		scoreTens.x = (scoreHundreds.x + scoreHundreds.width + 1);
		scoreUnits.x = (scoreTens.x + scoreTens.width + 1);

		scoreTens.y = scoreHundreds.y;
		scoreUnits.y = scoreHundreds.y;

	},
	moveBest = function() {

		bestTens.x = (bestHundreds.x + bestHundreds.width + 1);
		bestUnits.x = (bestTens.x + bestTens.width + 1);

		bestTens.y = bestHundreds.y;
		bestUnits.y = bestHundreds.y;

	},
	updateScore = function() {

		var
		split = score.toString().split(""),
		hundreds = 0,
		tens = 0,
		units = 0;

		scoreHundreds.x = ROCK.MATH.truncate(deflateWidth/2);

		if(score>99) {
			hundreds = Number(split[0]);
			tens = Number(split[1]);
			units = Number(split[2]);
			scoreHundreds.visible = true;
			scoreTens.visible = true;
			scoreUnits.visible = true;
			scoreHundreds.x -= 12;
		}
		else if(score>9) {
			tens = Number(split[0]);
			units = Number(split[1]);
			scoreHundreds.visible = false;
			scoreTens.visible = true;
			scoreUnits.visible = true;
			scoreHundreds.x -= 15;
		}
		else {
			units = Number(split[0]);
			scoreHundreds.visible = false;
			scoreTens.visible = false;
			scoreUnits.visible = true;
			scoreHundreds.x -= 18;
		};

		if(STATE===STATES.GAME_OVER||STATE===STATES.SCORE) {
			scoreHundreds.x = ((scoreBoard.x+scoreBoard.width) - 34);
			scoreHundreds.y = 87;
		};

		scoreHundreds.frame = hundreds;
		scoreTens.frame = tens;
		scoreUnits.frame = units;

		moveScore();

	},
	updateBest = function() {

		var
		split = best.toString().split(""),
		hundreds = 0,
		tens = 0,
		units = 0;

		if(best>99) {
			hundreds = Number(split[0]);
			tens = Number(split[1]);
			units = Number(split[2]);
			bestHundreds.visible = true;
			bestTens.visible = true;
			bestUnits.visible = true;
		}
		else if(best>9) {
			tens = Number(split[0]);
			units = Number(split[1]);
			bestHundreds.visible = false;
			bestTens.visible = true;
			bestUnits.visible = true;
		}
		else {
			units = Number(split[0]);
			bestHundreds.visible = false;
			bestTens.visible = false;
			bestUnits.visible = true;
		};

		bestHundreds.frame = hundreds;
		bestTens.frame = tens;
		bestUnits.frame = units;

		moveBest();

	},
	updateState = function(state) {

		// console.log("updateState");

		STATE = state;

		switch(STATE) {
			case STATES.SPLASH:

				bird.reset();
				pipes.reset();
				score = 0;
				scoreHundreds.y = 15;
				updateScore();

				gameOver.visible = false;
				scoreBoard.visible = false;
				okButton.visible = false;
				shareButton.visible = false;

				scoreHundreds.visible = false;
				scoreTens.visible = false;
				scoreUnits.visible = false;

				bestHundreds.visible = false;
				bestTens.visible = false;
				bestUnits.visible = false;

				newBest.visible = false;

				playPauseButton.visible = false;
				getReady.visible = false;
				tap.visible = false;
				medal.visible = false;
				hit.visible = false;

				startButton.visible = true;
				scoreButton.visible = true;
				title.visible = true;

				bird.bird.x = ((title.x+title.width)+15);
				bird.bird.y = 80;

				bird.hit.x = ((title.x+title.width)+16);
				bird.hit.y = 80;

			break;
			case STATES.GET_READY:

				startButton.visible = false;
				scoreButton.visible = false;
				title.visible = false;

				getReady.visible = true;
				tap.visible = true;
				hit.visible = true;

				bird.bird.x = 45;
				bird.bird.y = 100;

				bird.hit.x = 46;
				bird.hit.y = 100;

			break;
			case STATES.PLAY:

				updateScore();

				getReady.visible = false;
				tap.visible = false;

				playPauseButton.visible = true;

			break;
			case STATES.GAME_OVER:

				hit.visible = false;
				playPauseButton.visible = false;

				gameOver.visible = true;
				okButton.visible = true;
				shareButton.visible = true;

				showScoreBoard();

			break;
			case STATES.SCORE:

				hit.visible = false;
				playPauseButton.visible = false;
				startButton.visible = false;
				scoreButton.visible = false;

				okButton.visible = true;
				shareButton.visible = true;

				showScoreBoard();

			break;
		};

	},
	updateMedal = function() {

		var
		target = score;

		if(STATE===STATES.SCORE) {
			target = best;
		};

		if(target>=10) {

			medal.visible = true;

		};

		if(target>=40) {

			medal.frame = 3;

		}
		else if(target>=30) {

			medal.frame = 2;

		}
		else if(target>=20) {

			medal.frame = 1;

		}
		else if(target>=10) {

			medal.frame = 0;

		};

	},
	showScoreBoard = function() {

		scoreBoard.visible = true;

		updateMedal();

		updateScore();

		if(score>best) {

			best = score;
			storage.set("best", best);
			newBest.visible = true;

		};

		updateBest();

	},
	createNumberSprite = function() {

		return new Sprite(texture, [[157, 245], [165, 245], [173, 245], [181, 245], [189, 245], [197, 245], [205, 245], [213, 245], [221, 245], [229, 245]], 7, 10, 10, 15);

	},
	createAudio = function(name) {

		return new Audio("/audio/" + name + ".mp3");

	},
	getScale = function() {

		var
		val = 2;

		if(height>=1000) {

			val = 4;

		};

		return val;

	},
	version = "1.0",
	isTouch = ("ontouchstart" in window),
	touchStartEvent = "touchstart",
	touchEndEvent = "touchend",
	touchMoveEvent = "touchmove",
	shareURL = "https://twitter.com/intent/tweet?text=",
	ratio = 3/2,
	width = innerWidth,
	height = innerHeight,
	maxWidth = ROCK.MATH.truncate(height/ratio),
	width = width>maxWidth?maxWidth:width,
	scale = getScale(),
	deflateWidth = deflate(width),
	deflateHeight = deflate(height),
	score = 0,
	best = 0,
	clickDelay = 30,
	storage = new ROCK.LocalStorage("frappybird"),
	STATES = {
		SPLASH: 1,
		GET_READY: 2,
		PLAY: 3,
		GAME_OVER: 4,
		SCORE: 5
	},
	STATE,
	DisplayObject = ROCK.Object.extend({
		x: 0,
		y: 0,
		z: 0,
		width: 0,
		height: 0,
		rotation: 0,
		visible: true,
		xOffset: 0,
		yOffset: 0,
		opacity: 1,
		bind: function(event, handler) {

			var
			sprite = this;

			if(this.scene.renderer) {

				this.scene.renderer.node.addEventListener(event, function(e) {

					if(!sprite.visible) {
						return;
					};

					var
					touch,
					touchX,
					touchY;

					if(isTouch) {

						touch = e.changedTouches[0];
						touchX = touch.clientX-touch.target.offsetLeft;
						touchY = touch.clientY-touch.target.offsetTop;
					}
					else {

						touch = e;
						touchX = touch.offsetX;
						touchY = touch.offsetY;

					};

					// console.log(sprite, touchX, touchY);

					if(new Circle("blue", 6, deflate(touchX), deflate(touchY)).hitTest(sprite)) {

						handler.call(sprite, e, touchX, touchY);

					};

					e.preventDefault();

				});

			};

			return this;

		},
		unbind: function() {

			// stub

		},
		move: function(prop, value) {

			this[prop] += value;
			return this[prop];

		}
	}),
	Sprite = DisplayObject.extend({
		constructor: function Sprite(texture, frames, width, height, x, y) {

			this.texture = texture;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.frames = frames;

		},
		render: function(renderer) {

			if(!this.visible) {
				return;
			};

			renderer.context.imageSmoothingEnabled = false;
			renderer.context.save();
			renderer.context.scale(renderer.scale, renderer.scale);
			renderer.context.translate(this.x, this.y);
			if(this.rotation) {
				renderer.context.rotate(this.rotation*Math.PI/180);
			};
			renderer.context.globalAlpha = this.opacity;
			renderer.context.drawImage(this.texture.img, this.frames[this.frame][0], this.frames[this.frame][1], this.width, this.height, this.xOffset, this.yOffset, this.width, this.height);
			renderer.context.restore();

			this.renderer = renderer;

		},
		nextFrame: function() {

			if(this.frame<(this.frames.length-1)) {
				this.frame ++;
			}
			else {
				this.frame = 0;
			};

		},
		frame: 0
	}),
	Fill = DisplayObject.extend({
		constructor: function Sprite(fill, width, height, x, y) {

			this.fill = fill;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;

		},
		render: function(renderer) {

			if(!this.visible) {
				return;
			};

			renderer.context.save();
			renderer.context.scale(renderer.scale, renderer.scale);
			renderer.context.translate(this.x, this.y);
			renderer.context.globalAlpha = this.opacity;
			renderer.context.fillStyle = this.fill;
			renderer.context.fillRect(0, 0, this.width, this.height);
			renderer.context.restore();

			this.renderer = renderer;

		}
	}),
	Circle = DisplayObject.extend({
		constructor: function Sprite(fill, radius, x, y) {

			this.fill = fill;
			this.x = x;
			this.y = y;
			this.radius = radius;

		},
		render: function(renderer) {

			if(!this.visible) {
				return;
			};

			renderer.context.save();
			renderer.context.scale(renderer.scale, renderer.scale);
			renderer.context.translate(this.x, this.y);
			renderer.context.globalAlpha = this.opacity;
			renderer.context.fillStyle = this.fill;
			renderer.context.beginPath();
			renderer.context.arc(0, 0, this.radius, 0, 2*Math.PI);
			renderer.context.closePath();
			renderer.context.fill();
			renderer.context.restore();

			this.renderer = renderer;

		},
		hitTest: function(rect) {

			var
			deltax = (this.x - Math.max(rect.x, Math.min(this.x, (rect.x + rect.width)))),
			deltay = (this.y - Math.max(rect.y, Math.min(this.y, (rect.y + rect.height))));

			return ((deltax * deltax) + (deltay * deltay)) < (this.radius * this.radius);

		}
	}),
	Scene = ROCK.Object.extend({
		constructor: function Scene() {

			this.children = [];

		},
		add: function(child) {

			this.children.push(child);
			child.scene = this;
			child.z = this.children.length;

		}
	}),
	Renderer = ROCK.Object.extend({
		constructor: function Renderer(width, height, scale) {

			this.width = width;
			this.height = height;
			this.scale = scale*2;

			this.node = document.createElement("canvas");
			this.context = this.node.getContext(this.type);

			this.node.width = this.width*2;
			this.node.height = this.height*2;

			this.node.style.width = (this.width + "px");
			this.node.style.height = (this.height + "px");

		},
		render: function() {

			var
			childrenCount = this.scene.children.length,
			_this = this;

			this.scene.renderer = this;

			// clear
			this.node.width = this.width*2;

			for(var i=0;i<childrenCount;i++) {

				this.scene.children[i].render(_this);

			};

			return this;

		},
		appendTo: function(child) {

			child.appendChild(this.node);
			return this;

		},
		start: function() {

			var
			_this = this;

			this.frame = requestAnimationFrame(function() {

				_this.start();

			});

			this.render();

			if(this.paused) {
				return this;
			};

			this.onFrameChange.call(this);

			return this;

		},
		stop: function() {

			cancelAnimationFrame(this.frame);
			return this;

		},
		setScene: function(scene) {

			this.scene = scene;
			return this;

		},
		pause: function() {

			this.paused = !this.paused;
			return this;

		},
		type: "2d",
		width: 500,
		height: 500,
		scene: null,
		scale: 1,
		frame: 0,
		paused: false
	}),
	Texture = ROCK.Object.extend({
		constructor: function Texture(url) {

			this.img = new Image();

			this.img.src = url;

		}
	}),
	Bird = ROCK.Object.extend({
		constructor: function() {

			var
			frame0 = [258, 57],
			frame1 = [258, 70],
			frame2 = [258, 83];

			this.bird = new Sprite(texture, [frame0, frame0, frame0, frame1, frame1, frame1, frame2, frame2, frame2, frame1, frame1, frame1], 17, 12, 10, 100);
			this.hit = new Circle("blue", 6, 0, 0);

			this.hit.opacity = 0;

			this.bird.xOffset = (this.bird.width/-2);
			this.bird.yOffset = (this.bird.height/-2);

		},
		update: function() {

			this.updateVelocity();
			this.updateRotation();
			this.checkCollision();

		},
		flap: function() {

			if(this.dead) {
				return;
			};

			this.velocity = this.FLAPIMPULSE;

			// sounds.wing.play();

		},
		updateVelocity: function() {

			if(this.floored) {
				return;
			};

			this.velocity += this.GRAVITY;

			if(this.velocity > this.MAX_VELOCITY) {
				this.velocity = this.MAX_VELOCITY;
			};

			this.bird.y += this.velocity;
			this.hit.y += this.velocity;

		},
		updateRotation: function() {

			if(this.velocity>0) {

				this.bird.rotation += this.velocity;

			}
			else {

				this.bird.rotation = this.MAX_UP_ANGLE;

			};

			if(this.bird.rotation > this.MAX_DOWN_ANGLE) {

				this.bird.rotation = this.MAX_DOWN_ANGLE;

			};

		},
		checkCollision: function() {

			if(this.floored) {
				return;
			};

			var
			pipe = pipes.pipes[0],
			pipeTop = pipe[0],
			pipeBottom = pipe[1];

			if(!this.dead&&(this.hit.hitTest(pipeTop)||this.hit.hitTest(pipeBottom))) {

				this.dead = true;

			};

			if(!this.floored&&this.hit.hitTest(floorHit)) {

				this.dead = true;
				this.floored = true;
				this.bird.y = (floorHit.y + this.bird.yOffset);

			};

			if(this.dead) {

				// sounds.hit.play();

				if(STATE!==STATES.GAME_OVER) {

					updateState(STATES.GAME_OVER);

				};

				return;

			};

			if(this.bird.x===(pipeTop.x+pipeTop.width)) {

				score ++;
				// sounds.point.play();
				updateScore();

			};

		},
		reset: function() {

			this.velocity = 0;
			this.dead = false;
			this.floored = false;
			this.bird.rotation = 0;

		},
		FLAPIMPULSE: -4,
		GRAVITY: 0.25,
		MAX_VELOCITY: 15,
		MAX_UP_ANGLE: -20,
		MAX_DOWN_ANGLE: 90,
		velocity: 0,
		dead: false,
		floored: false
	}),
	Pipes = ROCK.Object.extend({
		constructor: function Pipes() {

			this.pipes = [];

			var
			pipeTop,
			pipeBottom;

			for(var i=0;i<this.COUNT;i++) {

				pipeTop = new Sprite(texture, [[293, 0]], 26, 182, 0, 0);
				pipeBottom = new Sprite(texture, [[319, 0]], 26, 182, 0, 0);

				this.pipes.push([pipeTop, pipeBottom]);

			};

		},
		update: function() {

			var
			pipe,
			pipex,
			pipey,
			pipeTop,
			pipeBottom,
			firstPipe = this.pipes[0],
			lastPipe = this.pipes[this.pipes.length-1],
			firstPipeTop = firstPipe[0],
			firstPipeBottom = firstPipe[1],
			lastPipeTop = lastPipe[0];

			for(var i=0;i<this.COUNT;i++) {

				pipe = this.pipes[i];
				pipeTop = pipe[0];
				pipeBottom = pipe[1];

				pipeTop.x -= 1;
				pipeBottom.x -= 1;

			};

			if((firstPipeTop.x+firstPipeTop.width)<0) {

				pipex = ((lastPipeTop.x + lastPipeTop.width) + this.PIPE_SPACE);
				pipey = getRandom();

				firstPipeTop.x = pipex;
				firstPipeBottom.x = pipex;

				firstPipeTop.y = pipey;
				firstPipeBottom.y = pipey;

				firstPipeTop.y -= (firstPipeTop.height + this.PIPE_GAP);

				this.pipes.push(this.pipes.shift());

			};

		},
		reset: function() {

			var
			pipex = deflateWidth,
			pipey = getRandom(),
			pipe,
			pipeTop,
			pipeBottom;

			for(var i=0;i<this.COUNT;i++) {

				pipe = this.pipes[i];
				pipeTop = pipe[0];
				pipeBottom = pipe[1];

				pipeTop.x = pipex;
				pipeTop.y = pipey;
				pipeTop.y -= (pipeTop.height + this.PIPE_GAP);

				pipeBottom.x = pipex;
				pipeBottom.y = pipey;

				pipex = ((pipeTop.x + pipeTop.width) + this.PIPE_SPACE);
				pipey = getRandom();

			};

		},
		addTo: function(scene) {

			var
			pipe,
			pipeTop,
			pipeBottom;

			for(var i=0;i<this.COUNT;i++) {

				pipe = this.pipes[i];
				pipeTop = pipe[0];
				pipeBottom = pipe[1];

				scene.add(pipeTop);
				scene.add(pipeBottom);

			};

		},
		COUNT: 4,
		PIPE_SPACE: 60,
		PIPE_GAP: 50
	}),
	Floors = ROCK.Object.extend({
		constructor: function Floors() {

			this.floors = [];

			var
			floorx = 0,
			floor;

			for(var i=0;i<this.COUNT;i++) {

				floor = new Sprite(texture, [[139, 0]], 154, 56, floorx, 200);

				this.floors.push(floor);

				floorx += floor.width;

			};

		},
		addTo: function(scene) {

			for(var i=0;i<this.COUNT;i++) {

				scene.add(this.floors[i]);

			};

		},
		update: function() {

			var
			firstFloor = this.floors[0],
			lastFloor = this.floors[this.floors.length-1];

			for(var i=0;i<this.COUNT;i++) {

				this.floors[i].x -= 1;

			};

			if((firstFloor.x+firstFloor.width)<0) {

				firstFloor.x = (lastFloor.x + lastFloor.width);
				this.floors.push(this.floors.shift());

			};

		},
		COUNT: 5
	}),
	Backgrounds = ROCK.Object.extend({
		constructor: function Floors() {

			this.backgrounds = [];

			var
			backgroundx = 0,
			background;

			for(var i=0;i<this.COUNT;i++) {

				background = new Sprite(texture, [[0, 0]], 138, 256, backgroundx, 0);

				this.backgrounds.push(background);

				backgroundx += background.width;

			};

		},
		addTo: function(scene) {

			for(var i=0;i<this.COUNT;i++) {

				scene.add(this.backgrounds[i]);

			};

		},
		COUNT: 3
	}),
	texture = new Texture("spritesheet.png?v=" + version),
	renderer = new Renderer(width, height, scale),
	splash = new Scene(),
	medal = new Sprite(texture, [[189, 120], [212, 120], [189, 143], [212, 143]], 22, 22, 70, 10),
	scoreHundreds = createNumberSprite(),
	scoreTens = createNumberSprite(),
	scoreUnits = createNumberSprite(),
	bestHundreds = createNumberSprite(),
	bestTens = createNumberSprite(),
	bestUnits = createNumberSprite(),
	title = new Sprite(texture, [[139, 173]], 96, 22, 30, 20),
	gameOver = new Sprite(texture, [[139, 199]], 94, 19, 30, 40),
	getReady = new Sprite(texture, [[139, 221]], 87, 22, 30, 50),
	playPauseButton = new Sprite(texture, [[280, 57], [280, 72]], 13, 14, 10, 15),
	startButton = new Sprite(texture, [[246, 199]], 40, 14, 30, 170),
	scoreButton = new Sprite(texture, [[246, 169]], 40, 14, 90, 170),
	newBest = new Sprite(texture, [[139, 245]], 16, 7, 90, 170),
	okButton = new Sprite(texture, [[246, 139]], 40, 14, 30, 170),
	shareButton = new Sprite(texture, [[246, 184]], 40, 14, 90, 170),
	scoreBoard = new Sprite(texture, [[139, 57]], 113, 58, 24, 70),
	tap = new Sprite(texture, [[139, 120]], 40, 50, 65, 110),
	hit = new Fill("red", deflateWidth, deflateHeight-50, 0, 50),
	floorFill = new Fill("#DBDA96", deflateWidth, deflateHeight, 0, 250),
	floorHit = new Fill("red", deflateWidth, 50, 0, 200),
	backgrounds = new Backgrounds(),
	bird = new Bird(),
	pipes = new Pipes(),
	floors = new Floors(),
	sounds = {
		point: createAudio("point"),
		swoosh: createAudio("swoosh"),
		wing: createAudio("wing"),
		die: createAudio("die"),
		hit: createAudio("hit")
	};

	if(!isTouch) {

		touchStartEvent = "mousedown";
		touchEndEvent = "mouseup";
		touchMoveEvent = "mousemove";

	};

	hit.opacity = 0;

	floorHit.opacity = 0;

	getReady.x = ROCK.MATH.truncate((deflateWidth/2)-(getReady.width/2));

	gameOver.x = ROCK.MATH.truncate((deflateWidth/2)-(gameOver.width/2));

	tap.x = ROCK.MATH.truncate((deflateWidth/2)-(tap.width/2));
	tap.x += 10;

	scoreBoard.x = ROCK.MATH.truncate((deflateWidth/2)-(scoreBoard.width/2));

	medal.x = (scoreBoard.x + 13);
	medal.y = (scoreBoard.y + 21);

	title.x = ROCK.MATH.truncate((deflateWidth/2)-(title.width/2));
	title.x -= 10;
	title.y = 70;

	bestHundreds.x = ((scoreBoard.x+scoreBoard.width)-34);
	bestHundreds.y = 108;

	newBest.x = ((bestHundreds.x-newBest.width)-2);
	newBest.y = 108;

	startButton.x = ROCK.MATH.truncate((deflateWidth/2)-(startButton.width)-10);
	scoreButton.x = ROCK.MATH.truncate((deflateWidth/2)+10);

	okButton.x = ROCK.MATH.truncate((deflateWidth/2)-(okButton.width)-10);
	shareButton.x = ROCK.MATH.truncate((deflateWidth/2)+10);

	backgrounds.addTo(splash);

	splash.add(title);

	splash.add(getReady);
	splash.add(tap);

	pipes.addTo(splash);

	splash.add(bird.bird);
	splash.add(bird.hit);

	splash.add(gameOver);
	splash.add(scoreBoard);
	splash.add(newBest);

	splash.add(scoreHundreds);
	splash.add(scoreTens);
	splash.add(scoreUnits);

	splash.add(bestHundreds);
	splash.add(bestTens);
	splash.add(bestUnits);

	splash.add(medal);

	splash.add(okButton);
	splash.add(shareButton);
	splash.add(scoreButton);
	splash.add(startButton);

	floors.addTo(splash);
	splash.add(floorFill);
	splash.add(floorHit);

	splash.add(hit);

	splash.add(playPauseButton);

	updateState(STATES.SPLASH);

	renderer.setScene(splash);

	renderer.onFrameChange = function() {

		switch(STATE) {
			case STATES.SPLASH:
			case STATES.GET_READY:
				floors.update();
				bird.bird.nextFrame();
			break;
			case STATES.PLAY:
				floors.update();
				bird.update();
				bird.bird.nextFrame();
				pipes.update();
			break;
			case STATES.GAME_OVER:
				bird.update();
			break;
		};

	};

	renderer.start();

	hit.bind(touchStartEvent, function(e, x, y) {

		// console.log("hit:down");

		if(STATE!==STATES.PLAY) {
			updateState(STATES.PLAY);
		};

		bird.flap();

	}).bind(touchEndEvent, function() {

		// console.log("hit:up");

	});

	okButton.bind(touchStartEvent, function() {

		// console.log("okButton:down");

		okButton.y += 1;

	}).bind(touchEndEvent, function() {

		// console.log("okButton:up");

		this.y -= 1;
		setTimeout(function() {
			updateState(STATES.SPLASH);
		}, clickDelay);

	});

	shareButton.bind(touchStartEvent, function() {

		// console.log("shareButton:down");

		this.y += 1;

	}).bind(touchEndEvent, function() {

		// console.log("shareButton:up");

		this.y -= 1;

		var
		url = shareURL;

		url += encodeURIComponent("I scored " + score + " on Frappy Bird! frappybird.com");

		setTimeout(function() {
			location = url;
		}, clickDelay);

	});

	startButton.bind(touchStartEvent, function() {

		// console.log("startButton:down");

		this.y += 1;

	}).bind(touchEndEvent, function() {

		// console.log("startButton:up");

		this.y -= 1;
		setTimeout(function() {
			updateState(STATES.GET_READY);
		}, clickDelay);

	});

	scoreButton.bind(touchStartEvent, function() {

		// console.log("scoreButton:down");

		this.y += 1;

	}).bind(touchEndEvent, function() {

		// console.log("scoreButton:up");

		this.y -= 1;

		setTimeout(function() {
			updateState(STATES.SCORE);
		}, clickDelay);

	});

	playPauseButton.bind(touchStartEvent, function() {

		// console.log("playPauseButton:down");

		this.y += 1;

	}).bind(touchEndEvent, function() {

		// console.log("playPauseButton:up");

		this.y -= 1;

		if(this.frame===0) {
			this.frame = 1;
		}
		else {
			this.frame = 0;
		};

		renderer.pause();

	});

	best = (storage.get("best")||0);
	// best = 47;

	renderer.appendTo(document.body);

})();
