class Game {

    #done = false;
    #debug = false;

    #levelIndex = 0;

    #gridPuzzle = [];
    #gridSolution = [];

    #rowSelected = 0;
    #colSelected = 0;

    #colors = [
        { "backgroundColor": "#CCCCCC", "color": "black" },
        { "backgroundColor": "#DAA1FF", "color": "black" },
        { "backgroundColor": "#B5FFA2", "color": "black" },
        { "backgroundColor": "#FFEC80", "color": "black" },
        { "backgroundColor": "#86D1E9", "color": "white" },
        { "backgroundColor": "#F79B7F", "color": "white" },
        { "backgroundColor": "#CCFF00", "color": "black" },
    ];

    #gridElement;
    #tableSolution;
    #tablePuzzle;

    constructor() {
        this.#gridElement = document.querySelector('.grid');
        this.#tableSolution = document.querySelector('.tableSolution');
        this.#tablePuzzle = document.querySelector('.tablePuzzle');

        this.slider = null;

        const level = levels[this.#levelIndex];
        if (this.#gridSolution.length !== level.length) {
            this.#render(level.length);
        }

        this.#gridSolution = level;
    }

    start() {
        this.#hideSuccess();

        this.#colorTable(this.#gridSolution, this.#tableSolution);
        this.#shuffleTable();
        this.#colorTable(this.#gridPuzzle, this.#tablePuzzle);

        this.#rowSelected = Math.min(0, this.#rowSelected + 1);
        this.#selectRow(this.#tablePuzzle);

        this.#colSelected = Math.max(0, this.#colSelected - 1);
        this.#selectCol(this.#tablePuzzle);
    }

    restart() {
        this.start();
    }

    nextLevel() {
        const level = levels[++this.#levelIndex];
        if (this.#gridSolution.length !== level.length) {
            this.#render(level.length);
        }

        this.#gridSolution = level;
        this.start();
    }

    setLevel(index) {
        const level = levels[index];
        if (this.#gridSolution.length !== level.length) {
            this.#render(level.length);
        }

        this.#gridSolution = level;
        this.start();
    }

    debug() {
        this.#debug = !this.#debug;
        if (this.#debug)
            console.log("debugging");
        else
            console.log("stopped debugging")
    }

    solveIt() {
        for (let i = 0; i < this.#gridSolution.length; i++) {
            this.#gridPuzzle[i] = this.#gridSolution[i]
        };

        this.#rowSelected = 0;
        this.#colSelected = 0;
        this.#spinRow(this.#gridPuzzle, 0, 1);
        this.#selectRow(this.#tablePuzzle);
        this.#selectCol(this.#tablePuzzle);
        this.#colorTable(this.#gridPuzzle, this.#tablePuzzle);
    }

    isDone() {
        return this.#done;
    }

    selectUp() {
        this.#rowSelected = Math.max(0, this.#rowSelected - 1);
        this.#selectRow(this.#tablePuzzle);
    }

    selectDown() {
        this.#rowSelected = Math.min(this.#gridSolution.length - 1, this.#rowSelected + 1);
        this.#selectRow(this.#tablePuzzle);
    }

    selectLeft() {
        this.#colSelected = Math.max(0, this.#colSelected - 1);
        this.#selectCol(this.#tablePuzzle);
    }

    selectRight() {
        this.#colSelected = Math.min(this.#gridSolution[0].length - 1, this.#colSelected + 1);
        this.#selectCol(this.#tablePuzzle);
    }

    moveUp() {
        this.#spinColumn(this.#gridPuzzle, this.#colSelected, -1);
        this.#colorTable(this.#gridPuzzle, this.#tablePuzzle);
        this.#matchTables();
    }

    moveDown() {
        this.#spinColumn(this.#gridPuzzle, this.#colSelected, 1);
        this.#colorTable(this.#gridPuzzle, this.#tablePuzzle);
        this.#matchTables();
    }

    moveLeft() {
        this.#spinRow(this.#gridPuzzle, this.#rowSelected, -1);
        this.#colorTable(this.#gridPuzzle, this.#tablePuzzle);
        this.#matchTables();
    }

    moveRight() {
        this.#spinRow(this.#gridPuzzle, this.#rowSelected, 1);
        this.#colorTable(this.#gridPuzzle, this.#tablePuzzle);
        this.#matchTables();
    }

    // #region private methods

    #render = function (size) {
        let root = document.documentElement;
        root.style.setProperty('--rows', size);

        this.#setInnerHtml(this.#gridElement, '');
        this.#appendInnerHtml(this.#gridElement, this.#renderGrid('tablePuzzle', size));
        this.#appendInnerHtml(this.#gridElement, this.#renderGrid('tableSolution', size));

        this.#tableSolution = document.querySelector('.tableSolution');
        this.#tablePuzzle = document.querySelector('.tablePuzzle');
    }

    #renderGrid = function (classname, size) {
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

    #colorTable = function (grid, baseElement) {
        const allRows = baseElement.querySelectorAll('.row');

        for (let r = 0; r < allRows.length; r++) {
            const currentRow = allRows[r];
            const allCels = currentRow.querySelectorAll('.cel');

            for (let c = 0; c < allCels.length; c++) {
                const currentCel = allCels[c];

                if (this.#debug) {
                    this.#setInnerHtml(currentCel, r + "," + c);
                } else {
                    this.#setInnerHtml(currentCel, '');
                }

                currentCel.style.backgroundColor = this.#colors[grid[r][c]].backgroundColor;
                currentCel.style.color = this.#colors[grid[r][c]].color;
            }
        }
    }

    #shuffleTable = function () {
        this.#done = false;

        // clone grid
        for (let r = 0; r < this.#gridSolution.length; r++) {
            const currentRow = this.#gridSolution[r];
            this.#gridPuzzle[r] = [];

            for (let c = 0; c < currentRow.length; c++) {
                this.#gridPuzzle[r].push(currentRow[c]);
            }
        }

        for (let r = 0; r < this.#gridSolution.length; r++) {
            this.#spinRow(this.#gridPuzzle, r, this.#getRandomInt(1, 3));
            this.#spinColumn(this.#gridPuzzle, r, this.#getRandomInt(1, 3));
            this.#spinRow(this.#gridPuzzle, r, this.#getRandomInt(3, 5));
            this.#spinColumn(this.#gridPuzzle, r, this.#getRandomInt(3, 5));
        }
    }

    #spinRow = function (grid, r, offset) {
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

    #spinColumn = function (grid, c, offset) {
        let gridTransposed = this.#transpose(grid);

        this.#spinRow(gridTransposed, c, offset);

        gridTransposed = this.#transpose(gridTransposed);
        for (let i = 0; i < grid[0].length; i++) {
            grid[i] = gridTransposed[i];
        }
    }

    #matchTables = function () {
        for (let i = 0; i < this.#gridSolution.length; i++) {
            for (let j = 0; j < this.#gridSolution.length; j++) {
                if (this.#gridSolution[i][j] !== this.#gridPuzzle[i][j])
                    return;
            }
        }

        this.#done = true;
        this.#showSuccess();
    }

    #showSuccess = function () {
        document.querySelector('.success').classList.add('success--on');
    }

    #hideSuccess = function () {
        document.querySelector('.success').classList.remove('success--on');
    }

    #selectRow = function (baseElement) {
        const allRows = baseElement.querySelectorAll('.row');

        for (let r = 0; r < allRows.length; r++) {
            const currentRow = allRows[r];

            if (r == this.#rowSelected) {
                currentRow.classList.add('row--active');
            } else {
                currentRow.classList.remove('row--active');
            }
        }
    }

    #selectCol = function (baseElement) {
        const allRows = baseElement.querySelectorAll('.row');

        for (let i = 0; i < allRows.length; i++) {
            const row = allRows[i].children;

            for (let j = 0; j < row.length; j++) {
                const cell = row[j];

                if (j === this.#colSelected) {
                    cell.classList.add('cell--selected');
                } else {
                    cell.classList.remove('cell--selected');
                }
            }
        }
    }

    #setInnerHtml = (elem, html) => elem.innerHTML = html;
    #appendInnerHtml = (elem, html) => elem.innerHTML += html;

    #transpose = (g) => Object.keys(g[0]).map((c) => g.map((r) => r[c]));
    #getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

    // #endregion
}
