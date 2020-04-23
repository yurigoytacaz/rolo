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

document.addEventListener('keydown', function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  console.log(code);

  if (code === KEY_SPACE) {
    debugar();
    return;
  }

  if (code === KEY_ESC) {
    if (done || window.confirm("Do you really want to SHUFFLE it?")) {
      hideSuccess();
      shuffleTable();
      colorTable(gridPuzzle, tablePuzzle);
    }
  }

  if (code === KEY_ENTER) {
    if (done) {
      hideSuccess();
      start(levels[++levelIndex]);
    }
  }

  if (code >= KEY_NUMZERO && code < KEY_A) {
    navigation(code);
  }

  if ((code >= KEY_LEFT && code <= KEY_DOWN) || code >= KEY_A && code <= KEY_W) {
    control(code);
  }

  if (done) {
    showSuccess();
    console.log('Ganhou, mizeravi!');
  }
});

function navigation(code) {
  if (!done && !window.confirm("Do you really want to RELOAD it?"))
    return;

  switch (code) {
    case KEY_NUMZERO + 1:
      levelIndex = 0;
      break;

    case KEY_NUMZERO + 2:
      levelIndex = 1;
      break;

    case KEY_NUMZERO + 3:
      levelIndex = 2;
      break;

    case KEY_NUMZERO + 4:
      levelIndex = 3;
      break;

    case KEY_NUMZERO + 5:
      levelIndex = 4;
      break;

    case KEY_NUMZERO + 6:
      levelIndex = 5;
      break;

    case KEY_NUMZERO + 7:
      levelIndex = 6;
      break;

    case KEY_NUMZERO + 8:
      levelIndex = 7;
      break;

    case KEY_NUMZERO + 9:
      levelIndex = 8;
      break;

    case KEY_NUMZERO + 0:
      levelIndex = (levelIndex !== 9 ? 9 : 10);
      break;
  }

  start(levels[levelIndex]);
}

function control(code) {
  if (done)
    return;

  switch (code) {
    case KEY_W:
      selectUp();
      break;

    case KEY_S:
      selectDown();
      break;

    case KEY_A:
      selectLeft();
      break;

    case KEY_D:
      selectRight();
      break;

    case KEY_UP:
      moveUp();
      break;

    case KEY_DOWN:
      moveDown();
      break;

    case KEY_LEFT:
      moveLeft();
      break;

    case KEY_RIGHT:
      moveRight();
      break;
  }
}
