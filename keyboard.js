"use strict";

var KEY_ENTER = 13;
var KEY_ESC = 27;
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_NUMZERO = 48;
var KEY_A = 65;
var KEY_D = 68;
var KEY_S = 83;
var KEY_W = 87;
var KEY__ = 189;
document.addEventListener('keydown', function (e) {
  var code = e.keyCode ? e.keyCode : e.which;

  if (code === KEY_SPACE) {
    game.debug();
    return;
  }

  if (code === KEY_ESC) {
    if (!game.isDone() && window.confirm("Do you really want to RESTART it?")) {
      game.restart();
    }
  }

  if (code === KEY_ENTER) {
    if (game.isDone()) {
      game.nextLevel();
    }
  }

  if (code >= KEY_NUMZERO && code < KEY_A || code === KEY__) {
    navigation(code);
  }

  if (code >= KEY_LEFT && code <= KEY_DOWN || code >= KEY_A && code <= KEY_W) {
    control(code);
  }
});

function navigation(code) {
  if (!game.isDone() && !window.confirm("Do you really want to RELOAD it?")) return;
  var level = 0;

  switch (code) {
    case KEY_NUMZERO + 1:
      break;

    case KEY_NUMZERO + 2:
      level = 1;
      break;

    case KEY_NUMZERO + 3:
      level = 2;
      break;

    case KEY_NUMZERO + 4:
      level = 3;
      break;

    case KEY_NUMZERO + 5:
      level = 4;
      break;

    case KEY_NUMZERO + 6:
      level = 5;
      break;

    case KEY_NUMZERO + 7:
      level = 6;
      break;

    case KEY_NUMZERO + 8:
      level = 7;
      break;

    case KEY_NUMZERO + 9:
      level = 8;
      break;

    case KEY_NUMZERO + 0:
      level = 9;
      break;

    case KEY__:
      level = 10;
      break;
  }

  game.setLevel(level);
}

function control(code) {
  if (game.isDone()) return;

  switch (code) {
    case KEY_W:
      game.selectUp();
      break;

    case KEY_S:
      game.selectDown();
      break;

    case KEY_A:
      game.moveLeft();
      break;

    case KEY_D:
      game.moveRight();
      break;

    case KEY_UP:
      game.moveUp();
      break;

    case KEY_DOWN:
      game.moveDown();
      break;

    case KEY_LEFT:
      game.selectLeft();
      break;

    case KEY_RIGHT:
      game.selectRight();
      break;
  }
}
//# sourceMappingURL=keyboard.js.map