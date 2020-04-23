function selectUp() {
  rowSelected = Math.max(0, rowSelected - 1);
  selectRow(tablePuzzle);
}
function selectDown() {
  rowSelected = Math.min(gridSolution.length - 1, rowSelected + 1);
  selectRow(tablePuzzle);
}
function selectLeft() {
  colSelected = Math.max(0, colSelected - 1);
  selectCol(tablePuzzle);
}
function selectRight() {
  colSelected = Math.min(gridSolution[0].length - 1, colSelected + 1);
  selectCol(tablePuzzle);
}

function moveUp() {
  spinColumn(colSelected, -1);
  colorTable(gridPuzzle, tablePuzzle);
  matchTables();
}

function moveDown() {
  spinColumn(colSelected, 1);
  colorTable(gridPuzzle, tablePuzzle);
  matchTables();
}

function moveLeft() {
  spinRow(rowSelected, -1);
  colorTable(gridPuzzle, tablePuzzle);
  matchTables();
}

function moveRight() {
  spinRow(rowSelected, 1);
  colorTable(gridPuzzle, tablePuzzle);
  matchTables();
}

document.querySelector('.key--w').addEventListener('touchend', function (e) {
  selectUp();
});

document.querySelector('.key--s').addEventListener('touchend', function (e) {
  selectDown();
});

document.querySelector('.key--a').addEventListener('touchend', function (e) {
  selectLeft();
});

document.querySelector('.key--d').addEventListener('touchend', function (e) {
  selectRight();
});

document.querySelector('.key--up').addEventListener('touchend', function (e) {
  moveUp();
});

document.querySelector('.key--down').addEventListener('touchend', function (e) {
  moveDown();
});

document.querySelector('.key--left').addEventListener('touchend', function (e) {
  moveLeft();
});

document.querySelector('.key--right').addEventListener('touchend', function (e) {
  moveRight();
});
