const KEY_ESC = 27;
const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_SPACE = 32;
const KEY_NUMZERO = 48

document.addEventListener('keydown', function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  console.log(code);

  switch (code) {
    case KEY_SPACE:
      debugar();
    break;

    case KEY_ESC:
      if (done) {
        success();
        done = false;
      } else {
        if (window.confirm("Do you really want to SHUFFLE it?")) {
          document.querySelector('.success').classList.remove('success--on');
          shuffleTable();
          colorTable(gridPuzzle, tablePuzzle);
        }
      }
    break;

    case KEY_W:
      if (done === false) {
        selectUp();
      }
    break;

    case KEY_S:
      if (done === false) {
        selectDown();
      }
    break;

    case KEY_A:
      if (done === false) {
        selectLeft();
      }
    break;

    case KEY_D:
      if (done === false) {
        selectRight();
      }
    break;

    case KEY_UP:
      if (done === false) {
        moveUp();
      }
    break;

    case KEY_DOWN:
      if (done === false) {
        moveDown();
      }
    break;

    case KEY_LEFT:
      if (done === false) {
        moveLeft();
      }
    break;

    case KEY_RIGHT:
      if (done === false) {
        moveRight();
      }
    break;

    case KEY_NUMZERO+1:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid1
        start()
      }
    break;

    case KEY_NUMZERO+2:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid2
        start()
      }
    break;

    case KEY_NUMZERO+3:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid3
        start()
      }
    break;

    case KEY_NUMZERO+4:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid4
        start()
      }
    break;

    case KEY_NUMZERO+5:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid5
        start()
      }
    break;

    case KEY_NUMZERO+6:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid6
        start()
      }
    break;

    case KEY_NUMZERO+7:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid7
        start()
      }
    break;

    case KEY_NUMZERO+8:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid8
        start()
      }
    break;

    case KEY_NUMZERO+9:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid9
        start()
      }
    break;

    case KEY_NUMZERO+0:
      if (window.confirm("Do you really want to RELOAD it?")) {
        gridSolution = grid0
        start()
      }
    break;

  }
});
