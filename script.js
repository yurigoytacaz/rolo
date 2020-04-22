// @TODO add controls to screen
// @TODO load new layouts

let gridSolution = [
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [1,1,2,2,1,1],
  [1,1,2,2,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1]
];

const colors = [
  { "backgroundColor": "#CCCCCC", "color": "black" },
  { "backgroundColor": "#DAA1FF", "color": "black" },
  { "backgroundColor": "#B5FFA2", "color": "black" },
  { "backgroundColor": "#FFEC80", "color": "black" },
  { "backgroundColor": "#86D1E9", "color": "white" },
  { "backgroundColor": "#F79B7F", "color": "white" },
  { "backgroundColor": "#CCFF00", "color": "black" },
];

const gridElement = document.querySelector('.grid');
const gridSize = gridSolution.length;
const gridPuzzle = [];

let rowSelected = 0;
let colSelected = 0;
let debug = false;
let html = "";
let done = false;

renderGrid('tablePuzzle');
renderGrid('tableSolution');

const tableSolution = document.querySelector('.tableSolution');
const tablePuzzle = document.querySelector('.tablePuzzle');

function renderGrid(classname) {
  let root = document.documentElement;
  root.style.setProperty('--rows', gridSize);

  html += `<div class="table `+classname+`">`;
  for (let row = 0; row < gridSize; row++) {
      html += `<div class="row">`;
      for (let column = 0; column < gridSize; column++) {
        html += `<div class="cel">`;
        html += "</div>";
      }
      html += "</div>";
  }
  html += "</div>";
  gridElement.innerHTML = html;
}

function matchTables() {
  for (let r = 0; r < gridSolution.length; r++) {
    const currentRow = gridSolution[r];

    for (let c = 0; c < currentRow.length; c++) {
      const v = gridSolution[r][c];
      const p = gridPuzzle[r][c];

      if (v != p) {
        return false;
      }
    }
  }

  done = true;
  success();
  console.log('Ganhou, mizeravi!');
  return true;
}

function success() {
  document.querySelector('.success').classList.add('success--on');
  done = false;
}

function selectRow(baseElement) {
  const allRows = baseElement.querySelectorAll('.row');

  for (let r = 0; r < allRows.length; r++) {
    const currentRow = allRows[r];

    if (r == rowSelected) {
      currentRow.classList.add('row--active');
    } else {
      currentRow.classList.remove('row--active');
    }
  }
}

function selectCol(baseElement) {
  const allRows = baseElement.querySelectorAll('.row');

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i].children;
    for(let j = 0; j < row.length; j++) {
      const cell = row[j];

      if(j === colSelected) {
        cell.classList.add('cell--selected');
      } else {
        cell.classList.remove('cell--selected');
      }
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleTable() {
  // clone grid
  for (let r = 0; r < gridSolution.length; r++) {
    const currentRow = gridSolution[r];
    gridPuzzle[r] = [];

    for (let c = 0; c < currentRow.length; c++) {
      gridPuzzle[r].push(currentRow[c]);
    }
  }

  for (let r = 0; r < gridSolution.length; r++) {
    spinRow(r, getRandomInt(1, 3));
    spinColumn(r, getRandomInt(1, 3));
    spinRow(r, getRandomInt(3, 5));
    spinColumn(r, getRandomInt(3, 5));
  }

  console.log('shuffled');
}

function spinRow(r, offset) {
  const row = gridPuzzle[r];
  const rowClone = [];

  for (let c = 0; c < row.length; c++) {
    rowClone.push(row[c]);
  }

  for (let c = 0; c < row.length; c++) {
    const newVal = (row.length + c - offset) % row.length;
    row[c] = rowClone[newVal];
  }
}

function spinColumn(c, offset) {
	let gridTransposed = transpose(gridPuzzle);
  const row = gridTransposed[c];
  const rowClone = [];

  for (let i = 0; i < row.length; i++) {
    rowClone.push(row[i]);
  }

  for (let i = 0; i < row.length; i++) {
    const newVal = (row.length + i - offset) % row.length;
    row[i] = rowClone[newVal];
  }

  gridTransposed = transpose(gridTransposed);
  for (let i = 0; i < gridPuzzle[0].length; i++) {
  	gridPuzzle[i] = gridTransposed[i];
  }
}

function transpose(g) {
  return Object.keys(g[0]).map(function(c) {
    return g.map(function(r) { return r[c]; });
  });
}

function colorTable(grid, baseElement) {
  const allRows = baseElement.querySelectorAll('.row');

  for (let r = 0; r < allRows.length; r++) {
    const currentRow = allRows[r];
    const allCels = currentRow.querySelectorAll('.cel');

    for (let c = 0; c < allCels.length; c++) {
      const currentCel = allCels[c];

      if (debug == true) {
        currentCel.innerHTML = r + "," + c;
      } else {
        currentCel.innerHTML = '';
      }

      currentCel.style.backgroundColor = colors[grid[r][c]].backgroundColor;
      currentCel.style.color = colors[grid[r][c]].color;
    }
  }
}

function debugar() {
  if (debug == true) {
    debug = false;
  } else {
    debug = true;
  }
  console.log(debug)
}

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

    case KEY_W:
      if (done === false) {
        rowSelected = Math.max(0, rowSelected - 1);
        selectRow(tablePuzzle);
      }
    break;

    case KEY_S:
      if (done === false) {
        rowSelected = Math.min(gridSolution.length - 1, rowSelected + 1);
        selectRow(tablePuzzle);
      }
    break;

    case KEY_A:
      colSelected = Math.max(0, colSelected - 1);
      selectCol(tablePuzzle);
    break;

    case KEY_D:
      colSelected = Math.min(gridSolution[0].length - 1, colSelected + 1);
      selectCol(tablePuzzle);
    break;

    case KEY_UP:
      spinColumn(colSelected, -1);
      colorTable(gridPuzzle, tablePuzzle);
      matchTables();
    break;

    case KEY_DOWN:
      spinColumn(colSelected, 1);
      colorTable(gridPuzzle, tablePuzzle);
      matchTables();
    break;

    case KEY_LEFT:
      if (done === false) {
        spinRow(rowSelected, -1);
        colorTable(gridPuzzle, tablePuzzle);
        matchTables();
      }
    break;

    case KEY_RIGHT:
      if (done === false) {
        spinRow(rowSelected, 1);
        colorTable(gridPuzzle, tablePuzzle);
        matchTables();
      }
    break;

  }
});

function start(){
  console.log("ROLLING >>>> ");
  colorTable(gridSolution, tableSolution);
  shuffleTable();
  colorTable(gridPuzzle, tablePuzzle);
  rowSelected = Math.min(0, rowSelected + 1);
  selectRow(tablePuzzle);
  colSelected = Math.max(0, colSelected - 1);
  selectCol(tablePuzzle);
  console.log("ROLLED <<<<");
}

start();


const grid1 = [
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [1,1,2,2,1,1],
  [1,1,2,2,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1]
];

const grid2 = [
  [1,1,1,1,1,1],
  [1,2,2,2,2,1],
  [1,2,1,1,2,1],
  [1,2,1,1,2,1],
  [1,2,2,2,2,1],
  [1,1,1,1,1,1]
];

const grid3 = [
  [6,6,6,6,6,6],
  [6,6,6,6,6,6],
  [0,0,6,6,0,0],
  [0,0,6,6,0,0],
  [6,6,6,6,6,6],
  [6,6,6,6,6,6]
];

const grid4 = [
  [1,1,4,4,1,1],
  [1,1,4,4,1,1],
  [4,4,4,4,4,4],
  [4,4,4,4,4,4],
  [1,1,4,4,1,1],
  [1,1,4,4,1,1]
];

const grid5 = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [2,2,1,1,2,2],
  [2,2,1,1,2,2]
];

const grid6 = [
  [4,4,4,4,4,4],
  [5,5,5,5,5,5],
  [0,0,0,0,0,0],
  [5,5,5,5,5,5],
  [3,3,3,3,3,3],
  [5,5,5,5,5,5]
];

const grid7 = [
  [1,1,1,0,0,0],
  [1,1,1,0,0,0],
  [1,1,1,0,0,0],
  [3,3,3,4,4,4],
  [3,3,3,4,4,4],
  [3,3,3,4,4,4]
];

const grid8 = [
  [1,1,3,2,2,3],
  [1,1,3,2,2,3],
  [1,1,3,2,2,3],
  [1,1,3,2,2,3],
  [1,1,3,2,2,3],
  [1,1,3,2,2,3]
];

const grid9 = [
  [5,5,4,4,1,1],
  [2,5,5,4,4,1],
  [2,2,5,5,4,4],
  [2,2,2,5,5,4],
  [2,2,2,2,5,4],
  [2,2,2,2,5,4]
];

const grid0 = [
  [2,0,3,2,1,4],
  [1,2,2,1,1,5],
  [0,1,1,1,1,1],
  [1,4,4,5,1,2],
  [0,2,0,2,4,0],
  [4,4,4,3,3,5]
];

