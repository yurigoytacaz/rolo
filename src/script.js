// @TODO spin col
// @TODO add controls to screen
// @TODO add high contrast option

const gridSolution = [
  [1,2,2,2,2,1],
  [1,4,0,0,5,1],
  [1,4,0,0,5,1],
  [1,4,0,0,5,1],
  [1,4,0,0,5,1],
  [1,3,3,3,3,1]
];

const colors = [
  { "backgroundColor": "#eee", "color": "white" },
  { "backgroundColor": "#B5FFA2", "color": "black" },
  { "backgroundColor": "#86D1E9", "color": "white" },
  { "backgroundColor": "#DAA1FF", "color": "black" },
  { "backgroundColor": "#F79B7F", "color": "white" },
  { "backgroundColor": "#FFEC80", "color": "black" },
];

const gridElement = document.querySelector('.grid');
const gridSize = gridSolution.length;
const gridPuzzle = [];

let rowSelected = 0;
let colSelected = 0;
let done = false; // console.log(done)
let html = "";

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
    console.log(currentRow);
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
        // allRows.classList.remove('row--active');
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
    // console.log(r);
    spinRow(r, getRandomInt(1, 5));
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

function colorTable(grid, baseElement) {
  const allRows = baseElement.querySelectorAll('.row');

  for (let r = 0; r < allRows.length; r++) {
    const currentRow = allRows[r];
    const allCels = currentRow.querySelectorAll('.cel');

    for (let c = 0; c < allCels.length; c++) {
      const currentCel = allCels[c]; // currentCel.innerHTML = r + "," + c;

      currentCel.style.backgroundColor = colors[grid[r][c]].backgroundColor;
      currentCel.style.color = colors[grid[r][c]].color;
    }
  }
}

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

console.log("RUNNING >>>> ");
colorTable(gridSolution, tableSolution);
shuffleTable();
colorTable(gridPuzzle, tablePuzzle);
console.log("DONE <<<<");
