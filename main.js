// const field = new Field(10, 20);
// const player = new Player(field);
// const tetris = new Tetris(field, player);

const tetris = new Tetris;

// А желетельно сделать так, чтобы и поле и игрок знали о тетрисе (Это либо переосмыслить логику, или написать EventEmmitter)
// Но нужно сделать какой-то стейт
// А вообще проблема решается, если мы создаём инстансы Field и Player в самом тетрисе, а не сдесь

// function hotKeys