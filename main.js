// const tetris = new Tetris;
const game = new TetrisManager()
game.create({
	moveRight: 68, //D
	moveLeft: 65, //A
	moveDown: 83, //S
	change: 87, //W
	rotateLeft: 81, //Q
	rotateRight: 69, //E
});
game.create({
	moveRight: 75, //K
	moveLeft: 72, //H
	moveDown: 74, //J
	change: 85, //U
	rotateLeft: 89, //Y
	rotateRight: 73, //I
});


// TODO: 
//  Смену уровня и скорости падения фигур

// Хотя можно и убрать плавную обработку клавиш??

// TODO: Показывать стату, активную и следующие фигуры	Мейби отдельный класс
// TODO: Сделать подсказку куда упадёт фигура

// Создание нескольких инстансов игры

// TODO: ВООБЩЕ ДЛЯ ВСЕХ ОТРИСОВОК СДЕЛАТЬ ОТДЕЛЬНЫЙ КЛАСС
