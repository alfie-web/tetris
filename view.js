class View {
	constructor(canvas, size) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');

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

		this.ctx.scale(size, size);
		this.ctx.font = "1px PressStart2P";
	}

	clear() {
		this.ctx.clearRect(0, 0, 240, 400);
	}

	renderMatrix(matrix, pos) {
		matrix.forEach((row, y) => {
			row.forEach((block, x) => {
				if (block > 0) {
					this.ctx.fillStyle = this.colors[block];
					this.ctx.fillRect(x + pos.x, y + pos.y, 1, 1);
				}
			});
		});
	}

	renderText(text, pos) {
		this.ctx.fillStyle = "white";
		this.ctx.fillText(text, pos.x, pos.y);
	}
}