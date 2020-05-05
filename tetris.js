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




class Tetris {
	constructor(fieldCanvas, statsCanvas, hotKeys) {
		// TODO: СОздавать канвасы динамически
		// this.canvas = document.getElementById('game');
		// this.statsCanvas = document.querySelector('.view');
		this.hotKeys = hotKeys;

		this.gameView = new View(fieldCanvas, 20);
		this.statsView = new View(statsCanvas, 10);

		this.field = new Field(10, 20);
		this.player = new Player(this, this.field);

		this.score = 0;
		this.lines = 0;
		this.level = 0;

		// this.createTetrisElement();
		let lastTime = 0;
		const update = (now) => {
			if(!lastTime || now - lastTime >= 1000 / (this.level + 1)) {
				lastTime = now;
				this.player.move(0);
			}
			requestAnimationFrame(update);
			this.render();
		}

		update();
		this.init();
	}

	init() {
		// this.renderStats();
		
		// this.update();

		window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
		window.addEventListener('keydown', (event) => { 
			Key.onKeydown(event);
			this.actionsHotKeys(event);
		}, false);

		// this.onKey();		// Запускаем цикл для отслеживания клавиш движения
	}
	
	// update(now) {
	// 	if(!lastTime || now - lastTime >= 1000 / (this.level + 1)) {
	// 		lastTime = now;
	// 		this.player.move(0);
	// 	}
	// 	requestAnimationFrame(this.update.bind(this));
	// 	this.render();
	// }

	// Если всё-таки вернусь к этой версии, то чтобы применялось ускорение, надо где-то останавливать таймер и снова запускать
	// update(now) {
	// 	setInterval(() => {
	// 		this.player.move(0);
	// 		this.render();
	// 	}, 1000 / (this.level + 1))
	// }

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
		this.gameView.renderHint(this.player.hint, { x: this.player.pos.x, y: this.player.hintPos.y });
		// this.gameView.renderHint(this.player.hint, { x: this.player.pos.x, y: this.player.calcHintPos() });	// Не вариант, жрёт 
		this.gameView.renderMatrix(this.player.matrix, this.player.pos);

		this.renderStats();
	}


	// Блин из за одного действия такая жопа
	// onKey = () => {
	// 	setInterval(() => {
	// 		// console.log('kkkk')
	// 		this.moveHotKeys()
	// 	}, 50)
	// }


	// moveHotKeys() {
	// 	if (Key.isDown(Key.MOVE_DOWN)) {
	// 		this.player.move(0);
	// 		this.render();
	// 	}
	// }

	actionsHotKeys(event) {
		// const {moveRight, moveLeft, moveDown, change, rotateLeft, rotateRight} = this.hotKeys;

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
		// this.statsView.renderHint(this.player.hint, { x: 2, y: 30 });
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















