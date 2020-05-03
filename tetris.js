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

		this.gameView = new View(this.canvas, 20);
		this.statsView = new View(this.statsCanvas, 10);

		this.field = new Field(10, 20);
		this.player = new Player(this, this.field);

		this.timer = null;
		this.moveDownKey = false;

		this.score = 0;
		this.lines = 0;
		this.level = 0;

		this.init();
	}

	init() {
		// этот код не работает, все начинает работать только внизу функции render
		// this.gameView.renderMatrix(this.player.matrix, this.player.pos);
		// this.statsView.renderText('Фигуры', { x: 2, y: 15 });
		this.renderStats();
		
		this.update();

		// window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
		window.addEventListener('keydown', (event) => { 
			Key.onKeydown(event);
			this.actionsHotKeys(event);
		}, false);

		// this.onKey();		// Запускаем цикл для отслеживания клавиш движения
	}
	
	// А это надо как-то в reqAnimFrame
	update(now) {
		// console.log(1000 / (this.level + 1))
		if(!lastTime || now - lastTime >= 1000 / (this.level + 1)) {
			lastTime = now;
			this.player.move(0);
		}
		requestAnimationFrame(this.update.bind(this));
		this.render();
	}

	updateScore(score, lines) {
		this.score += score;
		this.lines += lines;

		this.level = Math.floor(this.lines * 0.1);	// Каждые 100 линий новый левел
	}

	clearScore() {
		this.score = 0;
		this.lines = 0;
		this.level = 0;
	}

	
	render() {
		this.gameView.clear();

		this.gameView.renderMatrix(this.field.matrix, { x: 0, y: 0 });
		this.gameView.renderMatrix(this.player.matrix, this.player.pos);

		this.renderStats();
	}


	// Блин из за одного действия такая жопа
	// onKey = () => {
	// 		this.timer = setInterval(() => {
	// 			console.log('kkkk')
	// 			this.moveHotKeys()
	// 		}, 50)
	// }


	// moveHotKeys() {
	// 	if (Key.isDown(Key.MOVE_DOWN)) {
	// 		this.player.move(0);
	// 		this.render();
	// 	}
	// }

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
			case 83: 	// S
			this.moveDownKey = true;
				this.player.move(0);
				break;
			default: return;	
		}
		this.render();
	}


	renderStats() {
		this.statsView.clear('#0b0b0f');
		this.statsView.renderText('Фигуры:', { x: 2, y: 1 });
		this.statsView.renderMatrix(this.player.matrix, { x: 2, y: 2 });
		this.renderPendingPieces();

		this.statsView.renderText('Очки:', { x: 2, y: 18 });
		this.statsView.renderText(this.score, { x: 2, y: 20 });
		this.statsView.renderText('Линий:', { x: 2, y: 23 });
		this.statsView.renderText(this.lines, { x: 2, y: 25 });
		this.statsView.renderText('Уровень:', { x: 2, y: 28 });
		this.statsView.renderText(this.level, { x: 2, y: 30 });
	}

	renderPendingPieces() {
		this.player.pieces.forEach((matrix, i) => {
			if (i !== 0) this.statsView.renderMatrix(matrix, { x: 2, y: 2 + (5* i) });
		});
	}
}















