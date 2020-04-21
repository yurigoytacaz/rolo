const tableSolution = document.querySelector('.tableSolution');
const tablePuzzle = document.querySelector('.tablePuzzle');

const gridSolution = [
[1,2,2,2,2,1],
[1,4,0,0,5,1],
[1,4,0,0,5,1],
[1,4,0,0,5,1],
[1,4,0,0,5,1],
[1,3,3,3,3,1]
];

// const gridSolution = [
// [4 ,3 ,3 ,4 ,5 ,1],
// [3 ,5 ,5 ,2 ,4 ,3],
// [3 ,5 ,0 ,2 ,3 ,5],
// [4 ,2 ,2 ,2 ,0 ,4],
// [5 ,4 ,3 ,0 ,4 ,4],
// [1 ,3 ,5 ,4 ,4 ,3],
// ]

// const gridSolution = [
// [0,4,2,5,2,0,2,0],
// [4,5,2,0,2,4,4,2],
// [3,5,2,2,5,5,1,2],
// [5,0,0,5,5,4,3,0],
// [2,0,0,2,1,3,3,0],
// [4,2,1,4,5,5,1,2],
// [4,0,3,0,3,2,3,0],
// [1,4,1,3,2,2,0,2],
// ]

const gridPuzzle = [];

const colors =  [
                    { "backgroundColor": "#eee", "color": "white" },
                    { "backgroundColor": "#cf0", "color": "black" },
                    { "backgroundColor": "#ED70FF", "color": "white" },
                    { "backgroundColor": "#49F9E8", "color": "black" },
                    { "backgroundColor": "#FF8820", "color": "white" },
                    { "backgroundColor": "#FF3D3D", "color": "black" },
                ];

let rowSelected = 0;
let done = false;
// console.log(done)

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

function success(){
    document.querySelector('.success').classList.add('success--on');
    done = false;
}

document.addEventListener('keydown', function(e) {
var code = (e.keyCode ? e.keyCode : e.which);
// console.log(code);
switch(code) {
    case 27: // esc
        if (done) {
            success();
            done = false;
        } else {
            if (window.confirm("Do you really want to SHUFFLE it?")){
                document.querySelector('.success').classList.remove('success--on');
                shuffleTable();
                colorTable(gridPuzzle, tablePuzzle);
            }
        }
    break;
    case 87: // w
    break;
    case 83: // s
    break;
    case 65: // a
    break;
    case 68: // d
    break;
    case 37: // left
        if (done === false) {
            spinRow(rowSelected, -1);
            colorTable(gridPuzzle, tablePuzzle);
            matchTables();
        }
    break;
    case 38: // top
        if (done === false) {
            rowSelected = Math.max(0, rowSelected-1);
            selectRow(tablePuzzle);
        }
    break;
    case 39: // right
        if (done === false) {
            spinRow(rowSelected, 1);
            colorTable(gridPuzzle, tablePuzzle);
            matchTables();
        }
    break;
    case 40: // down
        if (done === false) {
            rowSelected = Math.min(gridSolution.length-1, rowSelected+1);
            selectRow(tablePuzzle);
        }
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

function selectCol(baseElement){
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
        spinRow(r, getRandomInt(1,5));
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
        for (let c = 0; c < allCels.length; c++){
            const currentCel = allCels[c];
            // currentCel.innerHTML = r + "," + c;
            currentCel.style.backgroundColor = colors[grid[r][c]].backgroundColor;
            currentCel.style.color = colors[grid[r][c]].color;
        }
    }
}

console.log("RUNNING >>>> ");

colorTable(gridSolution, tableSolution);
shuffleTable();
colorTable(gridPuzzle, tablePuzzle);

console.log("DONE <<<<");

// @TODO select col
