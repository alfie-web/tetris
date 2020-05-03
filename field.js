class Field {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		// this.matrix = this.createMatrix(this.width, this.height);
		this.matrix = [];

		this.createMatrix(this.width, this.height);
	}

	// Создат поле и ресетает
	createMatrix(w, h) {
		const matrix = [];
		for (let i = 0; i < h; i++) {
			matrix[i] = [];
			for (let j = 0; j < w; j++) {
				matrix[i][j] = 0;
			}
		}
		this.matrix = matrix;
	}

	// Проверяет сталкивается ли игрок (фигура) с границами поля или с замержеными фигурами
	collide(player) {	// player
		const { matrix, pos } = player;

		for (let y = 0; y < matrix.length; y++) {
			for (let x = 0; x < matrix[y].length; x++) {
				if (
					matrix[y][x] !== 0 &&		// По факту если undefined или > 0
					( this.matrix[pos.y + y] && this.matrix[pos.y + y][pos.x + x] ) !== 0
				) {
					return true;
				}
			}
		}

		return false;
	}

	// Мержит игрока (фигуру) с полем
	merge(player) {
		const { matrix, pos } = player;

		for (let y = 0; y < matrix.length; y++) {
			for (let x = 0; x < matrix[y].length; x++) {
				if (matrix[y][x] !== 0) {
					this.matrix[y + pos.y][x + pos.x] = matrix[y][x];
				}
			}
		}
	}

	// Удаляет заполненные ряды (Посмотреть как codeDojo это делал)
	sweep() {
		let linesCount = 0;	// Для подсчёта комбо
		let score = 0;

		outer: for (let y = this.height - 1; y > 0; y--) {
			for (let x = 0; x < this.width; x++) {
				// console.log(y, x)
				if (this.matrix[y][x] === 0) continue outer;
			}

			linesCount++;
			this.matrix.splice(y, 1);
			this.matrix.unshift(new Array(this.width).fill(0));
			++y;

			// score += linesCount * 10;
			// linesCount *= 2;
		}

		score += (linesCount ** 2) * 100;	// 1 - 100, 2 - 400, 3 - 900, 4 - 1600

		return { score, lines: linesCount };
	}
}