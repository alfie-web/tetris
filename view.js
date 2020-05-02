class View {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	}

	clear(color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, 240, 400);
	}

	renderMatrix(matrix, offset, color) {
		matrix.forEach((row, y) => {
			row.forEach((block, x) => {
				if (block > 0) {
					this.ctx.fillStyle = color;
					this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
				}
			});
		});
	}
}