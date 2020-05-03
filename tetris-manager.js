class TetrisManager {
	constructor() {
		this.players = [];
	}

	create(hotKeys) {
		const elem = this.createTetrisElement();
		const player = new Tetris(elem.field, elem.stats, hotKeys);

		this.players.push(player)
	}
	
	createTetrisElement() {
		let game = document.createElement('div');
		game.classList.add('game');
		
		let field = document.createElement('canvas');
		field.classList.add('field');
		field.width = 200;
		field.height = 400;
		// this.canvas = field;

		let stats = document.createElement('canvas');
		stats.classList.add('view');
		stats.width = 150;
		stats.height = 400;
		// this.statsCanvas = field;

		game.append(field, stats);
		document.body.appendChild(game);

		return {field, stats}
	}
}