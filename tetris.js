
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
	constructor() {
		this.canvas = document.getElementById('game');
		this.ctx = this.canvas.getContext('2d');

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

		this.ctx.scale(20, 20);
		this.init();

		window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
		window.addEventListener('keydown', (event) => { 
			Key.onKeydown(event);
			this.actionsHotKeys(event);
		 }, false);

		this.onKey();		// Запускаем цикл для отслеживания клавиш движения
	}

	init() {
		this.renderMatrix(this.player.matrix, this.player.pos);
		this.setTimer();
	}
	
	setTimer() {
		this.gameTimer = setInterval(() => { 
			this.player.move(0);
			this.update();
		}, 1000)
	}
	
	stopTimer() {
		clearInterval(this.gameTimer);
	}
	
	update() {
		this.clearField();
		this.renderMatrix(this.field.matrix, { x: 0, y: 0 });
		this.renderMatrix(this.player.matrix, this.player.pos);
	}

	onKey() {
		setInterval(() => {
			console.log('kkkk')
			this.moveHotKeys()
		}, 70)
	}


	moveHotKeys() {
		if (Key.isDown(Key.MOVE_RIGHT)) this.player.move(1);
		if (Key.isDown(Key.MOVE_LEFT)) this.player.move(-1);
		if (Key.isDown(Key.MOVE_DOWN)) this.player.move(0);

		if (
			Key.isDown(Key.MOVE_RIGHT) ||
			Key.isDown(Key.MOVE_LEFT) ||
			Key.isDown(Key.MOVE_DOWN)
		) this.update();
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
			default: return;
		}

		this.update();
	}


	clearField() {
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, 240, 400);
	}
	
	renderMatrix(matrix, offset) {
		matrix.forEach((row, y) => {
			row.forEach((block, x) => {
				if (block > 0) {
					this.ctx.fillStyle = this.colors[block];
					this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
				}
			});
		});
	}




}











































// // var Key = {
// // 	_pressed: {},
      
// // 	MOVE_RIGHT: 68,	// D
// // 	MOVE_LEFT: 65,	// A
// // 	MOVE_DOWN: 83,	// S
// // 	CHANGE: 87,	// W
// // 	ROTATE_LEFT: 81,	// Q
// // 	ROTATE_RIGHT: 69,	// E
	
// // 	isDown: function(keyCode) {
// // 		return this._pressed[keyCode];
// // 	},
	
// // 	onKeydown: function(event) {
// // 		this._pressed[event.keyCode] = true;
// // 	},
	
// // 	onKeyup: function(event) {
// // 		delete this._pressed[event.keyCode];
// // 	}
// // };




// class Tetris {
// 	constructor() {
// 		this.canvas = document.getElementById('game');
// 		this.ctx = this.canvas.getContext('2d');

// 		this.field = new Field(10, 20);
// 		this.player = new Player(this, this.field);

// 		this.gameTimer = null;
// 		this.colors = [
// 			null,
// 			'#e7072d',
// 			'#014cd6',
// 			'#d6c101',
// 			'#01d541',
// 			'#ae07d8',
// 			'#f17917',
// 			'#17f1cd',
// 		];

// 		this.ctx.scale(20, 20);
// 		this.init();

// 		// window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
// 		// window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

// 		// this.onKey()

// 		this.hotKeysHandler();
// 	}

// 	init() {
// 		this.renderMatrix(this.player.matrix, this.player.pos);
// 		this.setTimer();
// 	}
	
// 	setTimer() {
// 		this.gameTimer = setInterval(() => { 
// 			this.player.move(0);
// 			this.update();
// 		}, 1000)
// 	}
	
// 	stopTimer() {
// 		clearInterval(this.gameTimer);
// 	}
	
// 	update() {
// 		this.clearField();
// 		this.renderMatrix(this.field.matrix, { x: 0, y: 0 });
// 		this.renderMatrix(this.player.matrix, this.player.pos);
// 	}

// 	// onKey() {
// 	// 	setInterval(() => {
// 	// 		console.log('kkkk')
// 	// 		this.hotKeysHandler()
// 	// 	}, 30)
// 	// }


// 	hotKeysHandler() {
// 		// if (Key.isDown(Key.MOVE_RIGHT)) this.player.move(1);
// 		// if (Key.isDown(Key.MOVE_LEFT)) this.player.move(-1);
// 		// if (Key.isDown(Key.MOVE_DOWN)) this.player.move(0);
// 		// if (Key.isDown(Key.CHANGE)) this.player.change();
// 		// if (Key.isDown(Key.ROTATE_LEFT)) this.player.rotate(-1);
// 		// if (Key.isDown(Key.ROTATE_RIGHT)) this.player.rotate(1);

// 		// this.update();

// 		window.addEventListener('keydown', e => {
// 			console.log(e.keyCode)
// 			switch (e.keyCode) {
// 				case 68: 	// D
// 					this.player.move(1);
// 					break;
// 				case 65: 	// A
// 					this.player.move(-1);
// 					break;
// 				case 83: 	// S
// 					this.player.move(0);
// 					break;
// 				case 87: 	// W
// 					this.player.change();
// 					break;
// 				case 81: 	// Q
// 					this.player.rotate(-1);
// 					break;
// 				case 69: 	// E
// 					this.player.rotate(1);
// 					break;
// 				default: return;
// 			}

// 			this.update();
// 		});
// 	}


// 	clearField() {
// 		this.ctx.fillStyle = '#000';
// 		this.ctx.fillRect(0, 0, 240, 400);
// 	}
	
// 	renderMatrix(matrix, offset) {
// 		matrix.forEach((row, y) => {
// 			row.forEach((block, x) => {
// 				if (block > 0) {
// 					this.ctx.fillStyle = this.colors[block];
// 					this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
// 				}
// 			});
// 		});
// 	}




// }


