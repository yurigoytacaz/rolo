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
let gridSolution = [];

const gridElement = document.querySelector('.grid');
let tableSolution = document.querySelector('.tableSolution');
let tablePuzzle = document.querySelector('.tablePuzzle');

let rowSelected = 0;
let colSelected = 0;
let slider = null;

let done = false;
let debug = false;

function render(size) {
  let root = document.documentElement;
  root.style.setProperty('--rows', size);

  setInnerHtml(gridElement, '');
  appendInnerHtml(gridElement, renderGrid('tablePuzzle', size));
  appendInnerHtml(gridElement, renderGrid('tableSolution', size));

  tableSolution = document.querySelector('.tableSolution');
  tablePuzzle = document.querySelector('.tablePuzzle');
}

function renderGrid(classname, size) {
  let html = `<div class="table ` + classname + `">`;
  for (let row = 0; row < size; row++) {
    html += `<div class="row">`;
    for (let column = 0; column < size; column++) {
      html += `<div class="cel">`;
      html += "</div>";
    }
    html += "</div>";
  }
  html += "</div>";
  return html;
}

function matchTables() {
  for (let i = 0; i < gridSolution.length; i++) {
    for (let j = 0; j < gridSolution.length; j++) {
      if (gridSolution[i][j] !== gridPuzzle[i][j])
        return false;
    }
  }

  done = true;
  showSuccess();
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
  done = false;

  // clone grid
  for (let r = 0; r < gridSolution.length; r++) {
    const currentRow = gridSolution[r];
    gridPuzzle[r] = [];

    for (let c = 0; c < currentRow.length; c++) {
      gridPuzzle[r].push(currentRow[c]);
    }
  }

  for (let r = 0; r < gridSolution.length; r++) {
    spinRow(gridPuzzle, r, getRandomInt(1, 3));
    spinColumn(gridPuzzle, r, getRandomInt(1, 3));
    spinRow(gridPuzzle, r, getRandomInt(3, 5));
    spinColumn(gridPuzzle, r, getRandomInt(3, 5));
  }

  // console.log('shuffled');
}

function spinRow(grid, r, offset) {
  const row = grid[r];
  const rowClone = [];

  for (let c = 0; c < row.length; c++) {
    rowClone.push(row[c]);
  }

  for (let c = 0; c < row.length; c++) {
    const newVal = (row.length + c - offset) % row.length;
    row[c] = rowClone[newVal];
  }
}

function spinColumn(grid, c, offset) {
  let gridTransposed = transpose(grid);

  spinRow(gridTransposed, c, offset);

  gridTransposed = transpose(gridTransposed);
  for (let i = 0; i < grid[0].length; i++) {
    grid[i] = gridTransposed[i];
  }
}

function colorTable(grid, baseElement) {
  const allRows = baseElement.querySelectorAll('.row');

  for (let r = 0; r < allRows.length; r++) {
    const currentRow = allRows[r];
    const allCels = currentRow.querySelectorAll('.cel');

    for (let c = 0; c < allCels.length; c++) {
      const currentCel = allCels[c];

      if (debug) {
        setInnerHtml(currentCel, r + "," + c);
      } else {
        setInnerHtml(currentCel, '');
      }

      currentCel.style.backgroundColor = colors[grid[r][c]].backgroundColor;
      currentCel.style.color = colors[grid[r][c]].color;
    }
  }
}

const transpose = (g) => Object.keys(g[0]).map((c) => g.map((r) => r[c]));
const setInnerHtml = (elem, html) => elem.innerHTML = html;
const appendInnerHtml = (elem, html) => elem.innerHTML += html;

function debugar() {
  debug = !debug;
  console.log(debug);
}

function solveIt() {
  for (let i = 0; i < gridSolution.length; i++) {
    gridPuzzle[i] = gridSolution[i]
  };

  rowSelected = 0;
  colSelected = 0;
  spinRow(gridPuzzle, 0, 1);
  selectRow(tablePuzzle);
  selectCol(tablePuzzle);
  colorTable(gridPuzzle, tablePuzzle);
}

function start(grid) {
  if (gridSolution.length !== grid.length) {
    render(grid.length);
  }

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
  const initialLevel = levels[levelIndex];
  start(initialLevel);
}

initialize();
