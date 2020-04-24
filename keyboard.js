const KEY_ENTER = 13;
const KEY_ESC = 27;
const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_NUMZERO = 48;
const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;
const KEY_W = 87;
const KEY__ = 189;

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

  if ((code >= KEY_NUMZERO && code < KEY_A) || code === KEY__) {
    navigation(code);
  }

  if ((code >= KEY_LEFT && code <= KEY_DOWN) || code >= KEY_A && code <= KEY_W) {
    control(code);
  }
});

function navigation(code) {
  if (!game.isDone() && !window.confirm("Do you really want to RELOAD it?"))
    return;

  let level = 0;
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
  if (game.isDone())
    return;

  switch (code) {
    case KEY_W:
      game.selectUp();
      break;

    case KEY_S:
      game.selectDown();
      break;

    case KEY_A:
      game.selectLeft();
      break;

    case KEY_D:
      game.selectRight();
      break;

    case KEY_UP:
      game.moveUp();
      break;

    case KEY_DOWN:
      game.moveDown();
      break;

    case KEY_LEFT:
      game.moveLeft();
      break;

    case KEY_RIGHT:
      game.moveRight();
      break;
  }
}
