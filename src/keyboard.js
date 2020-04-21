const KEY_ESC = 27;
const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;
const KEY_LEFT = 37;
const KEY_TOP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

document.addEventListener('keydown', function (e) {
  var code = e.keyCode ? e.keyCode : e.which; // console.log(code);

  switch (code) {
    case KEY_ESC:
      // esc
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
      // w
    break;

    case KEY_S:
      // s
    break;

    case KEY_A:
      colSelected = Math.max(0, colSelected - 1);
      selectCol(tablePuzzle);
    break;

    case KEY_D:
      colSelected = Math.min(gridSolution[0].length - 1, colSelected + 1);
      selectCol(tablePuzzle);

    break;

    case KEY_LEFT:
      // left
      if (done === false) {
        spinRow(rowSelected, -1);
        colorTable(gridPuzzle, tablePuzzle);
        matchTables();
      }
    break;

    case KEY_TOP:
      // top
      if (done === false) {
        rowSelected = Math.max(0, rowSelected - 1);
        selectRow(tablePuzzle);
      }
    break;

    case KEY_RIGHT:
      // right
      if (done === false) {
        spinRow(rowSelected, 1);
        colorTable(gridPuzzle, tablePuzzle);
        matchTables();
      }
    break;

    case KEY_DOWN:
      // down
      if (done === false) {
        rowSelected = Math.min(gridSolution.length - 1, rowSelected + 1);
        selectRow(tablePuzzle);
      }
    break;
  }
});
