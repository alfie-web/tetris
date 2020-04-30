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
}