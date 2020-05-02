
var Key = {
	_pressed: {},
      
	MOVE_RIGHT: 68,	// D
	MOVE_LEFT: 65,	// A
	MOVE_DOWN: 83,	// S
	CHANGE: 87,	// W
	ROTATE_LEFT: 81,	// Q
	ROTATE_RIGHT: 69,	// E
	
	isDown: function(keyCode) {
		return this._pressed[keyCode];
	},
	
	onKeydown: function(event) {
		this._pressed[event.keyCode] = true;
	},
	
	onKeyup: function(event) {
		delete this._pressed[event.keyCode];
	}
};


let lastTime = 0;

class Tetris {
	constructor() {
		// TODO: СОздавать канвасы динамически
		this.canvas = document.getElementById('game');
		this.statsCanvas = document.querySelector('.view');
		// this.ctx = this.canvas.getContext('2d');
		// this.viewCtx = this.viewCanvas.getContext('2d');
		this.gameView = new View(this.canvas);
		this.statsView = new View(this.statsCanvas);

		this.field = new Field(10, 20);
		this.player = new Player(this, this.field);

		this.gameTimer = null;
		this.colors = [
			null,
			'#e7072d',
			'#014cd6',
			'#d6c101',
			'#01d541',
			'#ae07d8',
			'#f17917',
			'#17f1cd',
		];

		this.score = 0;
		this.level = 0;
		this.lines = 0;

		
		this.init();
	}

	init() {
		this.ctx.scale(20, 20);
		this.viewCtx.scale(10, 10);

		this.renderMatrix(this.ctx, this.player.matrix, this.player.pos);
		this.setTimer();

		window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
		window.addEventListener('keydown', (event) => { 
			Key.onKeydown(event);
			this.actionsHotKeys(event);
		 }, false);

		this.onKey();		// Запускаем цикл для отслеживания клавиш движения

	}
	
	// А это надо как-то в reqAnimFrame
	setTimer(now) {
		// each 2 seconds call the createNewObject() function
		if(!lastTime || now - lastTime >= 1000) {
			lastTime = now;
			this.player.move(0);
		}
		requestAnimationFrame(this.setTimer.bind(this));
		this.update();
	}


	
	update() {
		this.clearField(this.ctx, 'black');
		this.clearField(this.viewCtx, '#0b0b0f');
		this.renderMatrix(this.ctx, this.field.matrix, { x: 0, y: 0 });
		this.renderMatrix(this.ctx, this.player.matrix, this.player.pos);

		this.renderMatrix(this.viewCtx, this.player.matrix, { x: 2, y: 0 });
		this.renderPendingPieces();
	}


	// Блин из за одного действия такая жопа
	onKey = () => {
		setInterval(() => {
			console.log('kkkk')
			this.moveHotKeys()
			// requestAnimationFrame(this.onKey);
		}, 50)
	}


	moveHotKeys() {
		if (Key.isDown(Key.MOVE_DOWN)) {
			this.player.move(0);
			this.update()
		}
	}

	actionsHotKeys(event) {
		switch (event.keyCode) {
			case 87: 	// W
				this.player.change();
				break;
			case 81: 	// Q
				this.player.rotate(-1);
				break;
			case 69: 	// E
				this.player.rotate(1);
				break;
			case 68: 	// D
				this.player.move(1);
				break;
			case 65: 	// A
				this.player.move(-1);
				break;
			default: return;	
		}
		this.update();
	}

	renderPendingPieces() {
		this.player.pieces.forEach((matrix, i) => {
			if (i !== 0) this.renderMatrix(this.viewCtx, matrix, { x: 2, y: (4 + 1) * i });
		});
	}

	clearField(ctx, color) {
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 240, 400);
	}
	
	renderMatrix(ctx, matrix, offset) {
		matrix.forEach((row, y) => {
			row.forEach((block, x) => {
				if (block > 0) {
					ctx.fillStyle = this.colors[block];
					ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
				}
			});
		});
	}
}