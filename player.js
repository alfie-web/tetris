class Player {
	constructor(tetris, field) {
		this.tetris = tetris;
		this.field = field;

		this.pieces = this.createPieces();
		this.matrix = this.pieces[0];	// тукущая фигура
		this.pos = this.resetPos();
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

	// _create(type) {
	// 	switch(type) {
	// 		case 'T':
	// 			return [
	// 				[1, 1, 1],
	// 				[0, 1, 0],
	// 				[0, 0, 0],
	// 			]
	// 		case 'O':
	// 			return [
	// 				[2, 2],
	// 				[2, 2],
	// 			]
	// 		case 'I':
	// 			return [
	// 				[0,3, 0, 0],
	// 				[0,3, 0, 0],
	// 				[0,3, 0, 0],
	// 				[0,3, 0, 0],
	// 			]
	// 		case 'L':
	// 			return [
	// 				[0, 4, 0],
	// 				[0, 4, 0],
	// 				[0, 4, 4],
	// 			]
	// 		case 'J':
	// 			return [
	// 				[0, 5, 0],
	// 				[0, 5, 0],
	// 				[5, 5, 0],
	// 			]
	// 		case 'S':
	// 			return [
	// 				[0, 6, 6],
	// 				[6, 6, 0],
	// 				[0, 0, 0],
	// 			]
	// 		case 'Z':
	// 			return [
	// 				[7, 7, 0],
	// 				[0, 7, 7],
	// 				[0, 0, 0],
	// 			]
	// 	}
	// }

	// TODO: Объединить createMatrix и resetPos
	createPieces() {
		let pieces = [];
		for (let i = 0; i < 3; ++i) {
			pieces.push(this.getRandomPiece());	// Как-то порефакторить, вынести это в _create
		}
		return pieces;
	}

	updatePieces() {
		this.pieces.splice(0, 1);
		this.pieces.push(this.getRandomPiece());
		this.matrix = this.pieces[0];

		this.pos = this.resetPos();

		if (this.field.collide(this)) {
			console.log('GAME OVER');
			// По идее алертим очки игрока, уровень, и количество линий

			this.field.createMatrix(this.field.width, this.field.height);	// Должен бить какой-то ресет
		}
	}

	resetPos() {
		return { x: 0, y: 0 };
	}

	move(dir) {
		if (dir !== 0) {
			this.pos.x += dir;
			if (this.field.collide(this)) {
				console.log('has collision');
				this.pos.x -= dir;
			}
		} else {
			this.pos.y += 1;
			if (this.field.collide(this)) {
				console.log('merge');
				this.pos.y -= 1;
				this.field.merge(this);
				// merge, и ресет игрока (вместо ресета выбираем следующего из массива)
				this.updatePieces();
				// this.pos = this.resetPos();
			}

		}
	}

	rotate(dir) {
		if (dir < 0) {
			this.matrix = this.transposeArr(this.reverseArr(this.matrix));
		} else {
			this.matrix = this.reverseArr(this.transposeArr(this.matrix));
		}

		while ( this.field.collide(this) ) {
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
	}

	change() {
		console.log(this.pieces);
		const cur = this.pieces.splice(0, 1);
		this.pieces.push(cur[0]);
		this.matrix = this.pieces[0];
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