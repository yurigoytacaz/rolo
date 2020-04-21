const gridSolution =   [[0, 1, 1, 1, 1, 0],
                        [0, 0, 1, 1, 0, 0],
                        [0, 0, 1, 1, 0, 0],
                        [0, 0, 1, 1, 0, 0],
                        [0, 0, 1, 1, 0, 0],
                        [0, 1, 1, 1, 1, 0]];
const gridPuzzle = [];

const colors =  [
                    { "backgroundColor": "#eee", "color": "white" },
                    { "backgroundColor": "#cf0", "color": "black" },
                ];

let rowSelected = 1;

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
    console.log('Ganhou mizeravi');
    return true;
}

document.addEventListener('keydown', function(e) {
var code = (e.keyCode ? e.keyCode : e.which);
// console.log(code);
switch(code) {
    case 87: // w
        rowSelected = Math.max(0, rowSelected-1);
        selectRow(document.querySelector('.tablePuzzle'));
    break;
    case 83: // s
        rowSelected = Math.min(gridSolution.length-1, rowSelected+1);
        selectRow(document.querySelector('.tablePuzzle'));
    break;
    case 65: // a
    break;
    case 68: // d
    break;
    case 37: // left
        spinRow(rowSelected, -1);
        colorTable(gridPuzzle, document.querySelector('.tablePuzzle'));
        matchTables();
    break;
    case 38: // top
    break;
    case 39: // right
        spinRow(rowSelected, 1);
        colorTable(gridPuzzle, document.querySelector('.tablePuzzle'));
        matchTables();
    break;
    case 40: // down
    break;
}
});


function selectRow(baseElement) {
    const allRows = baseElement.querySelectorAll('.row');
    for (let r = 0; r < allRows.length; r++) {
        const currentRow = allRows[r];
        if (r == rowSelected) {
            currentRow.classList.add('row--active');
        }
        else {
            currentRow.classList.remove('row--active');
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
    // for (let r = 0; r < gridSolution.length; r++) {
        // spinRow(gridSolution[r], getRandomInt(1,5));
    // }
    spinRow(0, getRandomInt(1,5));
    spinRow(1, getRandomInt(1,5));
    spinRow(2, getRandomInt(1,5));
    spinRow(3, getRandomInt(1,5));
    spinRow(4, getRandomInt(1,5));
    spinRow(5, getRandomInt(1,5));
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
        for (let c = 0; c < allCels.length; c++){
            const currentCel = allCels[c];
            // currentCel.innerHTML = r + "," + c;
            currentCel.style.backgroundColor = colors[grid[r][c]].backgroundColor;
            currentCel.style.color = colors[grid[r][c]].color;
        }
    }
}


console.log("RUNNING >>>> ");

colorTable(gridSolution, document.querySelector('.tableSolution'));
shuffleTable();
colorTable(gridPuzzle, document.querySelector('.tablePuzzle'));

console.log("DONE <<<<");

// @TODO randomize tablePuzzle
// @TODO select col
