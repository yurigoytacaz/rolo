"use strict";

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
document.querySelector('.key--w').addEventListener('touchend', function (e) {
  return game.selectUp();
});
document.querySelector('.key--s').addEventListener('touchend', function (e) {
  return game.selectDown();
});
document.querySelector('.key--a').addEventListener('touchend', function (e) {
  return game.selectLeft();
});
document.querySelector('.key--d').addEventListener('touchend', function (e) {
  return game.selectRight();
});
document.querySelector('.key--up').addEventListener('touchend', function (e) {
  return game.moveUp();
});
document.querySelector('.key--down').addEventListener('touchend', function (e) {
  return game.moveDown();
});
document.querySelector('.key--left').addEventListener('touchend', function (e) {
  return game.moveLeft();
});
document.querySelector('.key--right').addEventListener('touchend', function (e) {
  return game.moveRight();
});
//# sourceMappingURL=gamepad.js.map