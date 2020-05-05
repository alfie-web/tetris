class Player {
	constructor(tetris, field) {
		this.tetris = tetris;
		this.field = field;

		this.pieces = this.createPieces();
		this.matrix = this.pieces[0];	// тукущая фигура
		this.hint = this.matrix;
		this.pos = this.resetPos();
		this.hintPos = { x: this.pos.x, y: 16 };
	}

	// TODO: Поработать с неймингом методов
	
	getRandomPiece() {
		const pieces = [
			[
				[1, 1, 1],
				[0, 1, 0],
				[0, 0, 0],
			],
			[
				[2, 2],
				[2, 2],
			], 
			[
				[0,3, 0, 0],
				[0,3, 0, 0],
				[0,3, 0, 0],
				[0,3, 0, 0],
			], 
			[
				[0, 4, 0],
				[0, 4, 0],
				[0, 4, 4],
			],
			[
				[0, 5, 0],
				[0, 5, 0],
				[5, 5, 0],
			],
			[
				[0, 6, 6],
				[6, 6, 0],
				[0, 0, 0],
			], 
			[
				[7, 7, 0],
				[0, 7, 7],
				[0, 0, 0],
			]
		]

		return pieces[Math.floor(Math.random() * 7)]; 
	}

	// TODO: Объединить createMatrix и resetPos ???
	createPieces() {
		let pieces = [];
		for (let i = 0; i < 3; ++i) {
			pieces.push(this.getRandomPiece());
		}
		return pieces;
	}

	updatePieces() {
		this.pieces.splice(0, 1);
		this.pieces.push(this.getRandomPiece());
		this.matrix = this.pieces[0];
		this.hint = this.pieces[0];

		this.pos = this.resetPos();
		// this.hintPos = this.resetPos();

		if (this.field.collide(this.matrix, this.pos)) {
			console.log('GAME OVER');
			// alert('Очки: ' + this.tetris.score + ', Линии: ' + this.tetris.lines);

			this.tetris.clearScore();
			this.field.matrix = this.field.createMatrix(this.field.width, this.field.height);	// Должен бить какой-то ресет
		}
	}

	resetPos() {
		return { x: (this.field.width / 2 | 0) - (this.matrix.length / 2 | 0), y: 0 };
	}

	move(dir) {
		// this.calcHintPos()

		if (dir !== 0) {
			this.pos.x += dir;
			if (this.field.collide(this.matrix, this.pos)) {
				// console.log('has collision');
				this.pos.x -= dir;
			}
		} else {
			this.pos.y += 1;
			if (this.field.collide(this.matrix, this.pos)) {
				// console.log('merge');
				this.pos.y -= 1;
				this.field.merge(this);

				this.updatePieces();
				
				let stats = this.field.sweep();
				this.tetris.updateScore(stats.score, stats.lines);

			}

		}
	}

	rotate(dir) {
		console.log('rotate')
		if (dir < 0) {
			this.matrix = this.transposeArr(this.reverseArr(this.matrix));
		} else {
			this.matrix = this.reverseArr(this.transposeArr(this.matrix));
		}

		this.hint = this.matrix;

		while ( this.field.collide(this.matrix, this.pos) ) {
			console.log('while')

			if ( this.matrix.length + this.pos.y > this.field.height	// Когда с полом
				|| this.field.matrix[this.pos.y + this.matrix.length][this.pos.x] > 0 	// Когда замерженые фигуры
			) {
				console.log('Тот кейс, когда колизия с пустым полом или когда внизу замерженые фигуры, wall juml снизу')
				this.pos.y--;
			}

			if (this.pos.x < this.field.width / 2) {	// wall juml побокам
				this.pos.x++;
			} else {
				this.pos.x--;
			}
		}

		// this.calcHintPos()
	}

	calcHintPos() {
		this.hintPos.y = 20;
		// TODO: Вместо while попробовать for так как там будет четкое количество итераций
		while(this.field.collide(this.hint, { x: this.pos.x, y: this.hintPos.y })) {
			console.log('check hint ')
			this.hintPos.y--;
		}

		return this.hintPos.y
	}

	change() {
		console.log(this.pieces);
		const cur = this.pieces.splice(0, 1);
		this.pieces.push(cur[0]);
		this.matrix = this.pieces[0];
		this.hint = this.matrix;

		// this.calcHintPos()
	}


	transposeArr(arr) {
		var result = [];
		for (var y = 0; y < arr.length; y++) {
			result[y] = [];
			for (var x = 0; x < arr[y].length; x++) {
				result[y][x] = arr[x][y];
			}
		}
		return result;
	}
	
	reverseArr(arr) {
		for (var y = 0; y < arr.length; y++) {
			arr[y].reverse();
		}
		return arr;
	}
}