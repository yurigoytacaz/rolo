document.querySelector('.key__continue').addEventListener('touchend', function (e) {
  if (game.isDone()) {
    game.nextLevel();
  }
});

document.querySelector('.key__restart').addEventListener('touchend', function (e) {
  if (!game.isDone() && window.confirm("Do you really want to RESTART it?")) {
    game.restart();
  }
});

document.querySelector('.key--w').addEventListener('touchend', (e) => game.selectUp());
document.querySelector('.key--s').addEventListener('touchend', (e) => game.selectDown());
document.querySelector('.key--a').addEventListener('touchend', (e) => game.selectLeft());
document.querySelector('.key--d').addEventListener('touchend', (e) => game.selectRight());
document.querySelector('.key--up').addEventListener('touchend', (e) => game.moveUp());
document.querySelector('.key--down').addEventListener('touchend', (e) => game.moveDown());
document.querySelector('.key--left').addEventListener('touchend', (e) => game.moveLeft());
document.querySelector('.key--right').addEventListener('touchend', (e) => game.moveRight());
