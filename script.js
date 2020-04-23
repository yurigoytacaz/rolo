// @TODO add controls to screen
// @TODO load new layouts

const colors = [
  { "backgroundColor": "#CCCCCC", "color": "black" },
  { "backgroundColor": "#DAA1FF", "color": "black" },
  { "backgroundColor": "#B5FFA2", "color": "black" },
  { "backgroundColor": "#FFEC80", "color": "black" },
  { "backgroundColor": "#86D1E9", "color": "white" },
  { "backgroundColor": "#F79B7F", "color": "white" },
  { "backgroundColor": "#CCFF00", "color": "black" },
];

const gridPuzzle = [];
let gridIndex = 0;

const gridElement = document.querySelector('.grid');
let tableSolution = document.querySelector('.tableSolution');
let tablePuzzle = document.querySelector('.tablePuzzle');

let gridSolution = [
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1]
];
let gridSize = gridSolution.length;

let rowSelected = 0;
let colSelected = 0;
let slider = null;

let done = false;
let debug = false;

const appendInnerHtml = (elem, html) => elem.innerHTML += html;

function render() {
  let root = document.documentElement;
  root.style.setProperty('--rows', gridSize);
  
  appendInnerHtml(gridElement, renderGrid('tablePuzzle'));
  appendInnerHtml(gridElement, renderGrid('tableSolution'));

  tableSolution = document.querySelector('.tableSolution');
  tablePuzzle = document.querySelector('.tablePuzzle');
}

function renderGrid(classname) {
  let html = `<div class="table ` + classname + `">`;
  for (let row = 0; row < gridSize; row++) {
      html += `<div class="row">`;
      for (let column = 0; column < gridSize; column++) {
        html += `<div class="cel">`;
        html += "</div>";
      }
      html += "</div>";
  }
  html += "</div>";
  return html;
}

function matchTables() {
  for (let r = 0; r < gridSolution.length; r++) {
    const currentRow = gridSolution[r];

    for (let c = 0; c < currentRow.length; c++) {
      const v = gridSolution[r][c];
      const p = gridPuzzle[r][c];

      if (v != p)
        return false;
    }
  }

  return true;
}

function showSuccess() {
  document.querySelector('.success').classList.add('success--on');
}

function hideSuccess() {
  document.querySelector('.success').classList.remove('success--on');
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
    
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      if (j === colSelected) {
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

const transpose = (g) => Object.keys(g[0]).map((c) => g.map((r) => r[c]));

function colorTable(grid, baseElement) {
  const allRows = baseElement.querySelectorAll('.row');

  for (let r = 0; r < allRows.length; r++) {
    const currentRow = allRows[r];
    const allCels = currentRow.querySelectorAll('.cel');

    for (let c = 0; c < allCels.length; c++) {
      const currentCel = allCels[c];

      if (debug) {
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
  debug = !debug;
  console.log(debug);
}

function start(grid) {
  console.log("ROLLING >>>> ");

  gridSolution = grid;

  colorTable(gridSolution, tableSolution);
  shuffleTable();
  colorTable(gridPuzzle, tablePuzzle);

  rowSelected = Math.min(0, rowSelected + 1);
  selectRow(tablePuzzle);
  
  colSelected = Math.max(0, colSelected - 1);
  selectCol(tablePuzzle);

  console.log("ROLLED <<<<");
}

function initialize() {
  render();

  start(grids[gridIndex]);
}

initialize();