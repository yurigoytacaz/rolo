"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    _done.set(this, {
      writable: true,
      value: false
    });

    _debug.set(this, {
      writable: true,
      value: false
    });

    _levelIndex.set(this, {
      writable: true,
      value: 0
    });

    _gridPuzzle.set(this, {
      writable: true,
      value: []
    });

    _gridSolution.set(this, {
      writable: true,
      value: []
    });

    _rowSelected.set(this, {
      writable: true,
      value: 0
    });

    _colSelected.set(this, {
      writable: true,
      value: 0
    });

    _colors.set(this, {
      writable: true,
      value: [{
        "backgroundColor": "#CCCCCC",
        "color": "black"
      }, {
        "backgroundColor": "#DAA1FF",
        "color": "black"
      }, {
        "backgroundColor": "#B5FFA2",
        "color": "black"
      }, {
        "backgroundColor": "#FFEC80",
        "color": "black"
      }, {
        "backgroundColor": "#86D1E9",
        "color": "white"
      }, {
        "backgroundColor": "#F79B7F",
        "color": "white"
      }, {
        "backgroundColor": "#CCFF00",
        "color": "black"
      }]
    });

    _gridElement.set(this, {
      writable: true,
      value: void 0
    });

    _tableSolution.set(this, {
      writable: true,
      value: void 0
    });

    _tablePuzzle.set(this, {
      writable: true,
      value: void 0
    });

    _render.set(this, {
      writable: true,
      value: function value(size) {
        var root = document.documentElement;
        root.style.setProperty('--rows', size);

        _classPrivateFieldGet(this, _setInnerHtml).call(this, _classPrivateFieldGet(this, _gridElement), '');

        _classPrivateFieldGet(this, _appendInnerHtml).call(this, _classPrivateFieldGet(this, _gridElement), _classPrivateFieldGet(this, _renderGrid).call(this, 'tablePuzzle', size));

        _classPrivateFieldGet(this, _appendInnerHtml).call(this, _classPrivateFieldGet(this, _gridElement), _classPrivateFieldGet(this, _renderGrid).call(this, 'tableSolution', size));

        _classPrivateFieldSet(this, _tableSolution, document.querySelector('.tableSolution'));

        _classPrivateFieldSet(this, _tablePuzzle, document.querySelector('.tablePuzzle'));
      }
    });

    _renderGrid.set(this, {
      writable: true,
      value: function value(classname, size) {
        var html = "<div class=\"table " + classname + "\">";

        for (var row = 0; row < size; row++) {
          html += "<div class=\"row\">";

          for (var column = 0; column < size; column++) {
            html += "<div class=\"cel\">";
            html += "</div>";
          }

          html += "</div>";
        }

        html += "</div>";
        return html;
      }
    });

    _colorTable.set(this, {
      writable: true,
      value: function value(grid, baseElement) {
        var allRows = baseElement.querySelectorAll('.row');

        for (var r = 0; r < allRows.length; r++) {
          var currentRow = allRows[r];
          var allCels = currentRow.querySelectorAll('.cel');

          for (var c = 0; c < allCels.length; c++) {
            var currentCel = allCels[c];

            if (_classPrivateFieldGet(this, _debug)) {
              _classPrivateFieldGet(this, _setInnerHtml).call(this, currentCel, r + "," + c);
            } else {
              _classPrivateFieldGet(this, _setInnerHtml).call(this, currentCel, '');
            }

            currentCel.style.backgroundColor = _classPrivateFieldGet(this, _colors)[grid[r][c]].backgroundColor;
            currentCel.style.color = _classPrivateFieldGet(this, _colors)[grid[r][c]].color;
          }
        }
      }
    });

    _shuffleTable.set(this, {
      writable: true,
      value: function value() {
        _classPrivateFieldSet(this, _done, false); // clone grid


        for (var r = 0; r < _classPrivateFieldGet(this, _gridSolution).length; r++) {
          var currentRow = _classPrivateFieldGet(this, _gridSolution)[r];

          _classPrivateFieldGet(this, _gridPuzzle)[r] = [];

          for (var c = 0; c < currentRow.length; c++) {
            _classPrivateFieldGet(this, _gridPuzzle)[r].push(currentRow[c]);
          }
        }

        for (var _r = 0; _r < _classPrivateFieldGet(this, _gridSolution).length; _r++) {
          _classPrivateFieldGet(this, _spinRow).call(this, _classPrivateFieldGet(this, _gridPuzzle), _r, _classPrivateFieldGet(this, _getRandomInt).call(this, 1, 3));

          _classPrivateFieldGet(this, _spinColumn).call(this, _classPrivateFieldGet(this, _gridPuzzle), _r, _classPrivateFieldGet(this, _getRandomInt).call(this, 1, 3));

          _classPrivateFieldGet(this, _spinRow).call(this, _classPrivateFieldGet(this, _gridPuzzle), _r, _classPrivateFieldGet(this, _getRandomInt).call(this, 3, 5));

          _classPrivateFieldGet(this, _spinColumn).call(this, _classPrivateFieldGet(this, _gridPuzzle), _r, _classPrivateFieldGet(this, _getRandomInt).call(this, 3, 5));
        }
      }
    });

    _spinRow.set(this, {
      writable: true,
      value: function value(grid, r, offset) {
        var row = grid[r];
        var rowClone = [];

        for (var c = 0; c < row.length; c++) {
          rowClone.push(row[c]);
        }

        for (var _c = 0; _c < row.length; _c++) {
          var newVal = (row.length + _c - offset) % row.length;
          row[_c] = rowClone[newVal];
        }
      }
    });

    _spinColumn.set(this, {
      writable: true,
      value: function value(grid, c, offset) {
        var gridTransposed = _classPrivateFieldGet(this, _transpose).call(this, grid);

        _classPrivateFieldGet(this, _spinRow).call(this, gridTransposed, c, offset);

        gridTransposed = _classPrivateFieldGet(this, _transpose).call(this, gridTransposed);

        for (var i = 0; i < grid[0].length; i++) {
          grid[i] = gridTransposed[i];
        }
      }
    });

    _matchTables.set(this, {
      writable: true,
      value: function value() {
        for (var i = 0; i < _classPrivateFieldGet(this, _gridSolution).length; i++) {
          for (var j = 0; j < _classPrivateFieldGet(this, _gridSolution).length; j++) {
            if (_classPrivateFieldGet(this, _gridSolution)[i][j] !== _classPrivateFieldGet(this, _gridPuzzle)[i][j]) return;
          }
        }

        _classPrivateFieldSet(this, _done, true);

        _classPrivateFieldGet(this, _showSuccess).call(this);
      }
    });

    _showSuccess.set(this, {
      writable: true,
      value: function value() {
        document.querySelector('.success').classList.add('success--on');
      }
    });

    _hideSuccess.set(this, {
      writable: true,
      value: function value() {
        document.querySelector('.success').classList.remove('success--on');
      }
    });

    _selectRow.set(this, {
      writable: true,
      value: function value(baseElement) {
        var allRows = baseElement.querySelectorAll('.row');

        for (var r = 0; r < allRows.length; r++) {
          var currentRow = allRows[r];

          if (r == _classPrivateFieldGet(this, _rowSelected)) {
            currentRow.classList.add('row--active');
          } else {
            currentRow.classList.remove('row--active');
          }
        }
      }
    });

    _selectCol.set(this, {
      writable: true,
      value: function value(baseElement) {
        var allRows = baseElement.querySelectorAll('.row');

        for (var i = 0; i < allRows.length; i++) {
          var row = allRows[i].children;

          for (var j = 0; j < row.length; j++) {
            var cell = row[j];

            if (j === _classPrivateFieldGet(this, _colSelected)) {
              cell.classList.add('cell--selected');
            } else {
              cell.classList.remove('cell--selected');
            }
          }
        }
      }
    });

    _setInnerHtml.set(this, {
      writable: true,
      value: function value(elem, html) {
        return elem.innerHTML = html;
      }
    });

    _appendInnerHtml.set(this, {
      writable: true,
      value: function value(elem, html) {
        return elem.innerHTML += html;
      }
    });

    _transpose.set(this, {
      writable: true,
      value: function value(g) {
        return Object.keys(g[0]).map(function (c) {
          return g.map(function (r) {
            return r[c];
          });
        });
      }
    });

    _getRandomInt.set(this, {
      writable: true,
      value: function value(min, max) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
      }
    });

    _classPrivateFieldSet(this, _gridElement, document.querySelector('.grid'));

    _classPrivateFieldSet(this, _tableSolution, document.querySelector('.tableSolution'));

    _classPrivateFieldSet(this, _tablePuzzle, document.querySelector('.tablePuzzle'));

    this.slider = null;

    var level = levels[_classPrivateFieldGet(this, _levelIndex)];

    if (_classPrivateFieldGet(this, _gridSolution).length !== level.length) {
      _classPrivateFieldGet(this, _render).call(this, level.length);
    }

    _classPrivateFieldSet(this, _gridSolution, level);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      _classPrivateFieldGet(this, _hideSuccess).call(this);

      _classPrivateFieldGet(this, _colorTable).call(this, _classPrivateFieldGet(this, _gridSolution), _classPrivateFieldGet(this, _tableSolution));

      _classPrivateFieldGet(this, _shuffleTable).call(this);

      _classPrivateFieldGet(this, _colorTable).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _tablePuzzle));

      _classPrivateFieldSet(this, _rowSelected, Math.min(0, _classPrivateFieldGet(this, _rowSelected) + 1));

      _classPrivateFieldGet(this, _selectRow).call(this, _classPrivateFieldGet(this, _tablePuzzle));

      _classPrivateFieldSet(this, _colSelected, Math.max(0, _classPrivateFieldGet(this, _colSelected) - 1));

      _classPrivateFieldGet(this, _selectCol).call(this, _classPrivateFieldGet(this, _tablePuzzle));
    }
  }, {
    key: "restart",
    value: function restart() {
      this.start();
    }
  }, {
    key: "nextLevel",
    value: function nextLevel() {
      var level = levels[_classPrivateFieldSet(this, _levelIndex, +_classPrivateFieldGet(this, _levelIndex) + 1)];

      if (_classPrivateFieldGet(this, _gridSolution).length !== level.length) {
        _classPrivateFieldGet(this, _render).call(this, level.length);
      }

      _classPrivateFieldSet(this, _gridSolution, level);

      this.start();
    }
  }, {
    key: "setLevel",
    value: function setLevel(index) {
      var level = levels[index];

      if (_classPrivateFieldGet(this, _gridSolution).length !== level.length) {
        _classPrivateFieldGet(this, _render).call(this, level.length);
      }

      _classPrivateFieldSet(this, _gridSolution, level);

      this.start();
    }
  }, {
    key: "debug",
    value: function debug() {
      _classPrivateFieldSet(this, _debug, !_classPrivateFieldGet(this, _debug));

      if (_classPrivateFieldGet(this, _debug)) console.log("debugging");else console.log("stopped debugging");
    }
  }, {
    key: "solveIt",
    value: function solveIt() {
      for (var i = 0; i < _classPrivateFieldGet(this, _gridSolution).length; i++) {
        _classPrivateFieldGet(this, _gridPuzzle)[i] = _classPrivateFieldGet(this, _gridSolution)[i];
      }

      ;

      _classPrivateFieldSet(this, _rowSelected, 0);

      _classPrivateFieldSet(this, _colSelected, 0);

      _classPrivateFieldGet(this, _spinRow).call(this, _classPrivateFieldGet(this, _gridPuzzle), 0, 1);

      _classPrivateFieldGet(this, _selectRow).call(this, _classPrivateFieldGet(this, _tablePuzzle));

      _classPrivateFieldGet(this, _selectCol).call(this, _classPrivateFieldGet(this, _tablePuzzle));

      _classPrivateFieldGet(this, _colorTable).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _tablePuzzle));
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return _classPrivateFieldGet(this, _done);
    }
  }, {
    key: "selectUp",
    value: function selectUp() {
      _classPrivateFieldSet(this, _rowSelected, Math.max(0, _classPrivateFieldGet(this, _rowSelected) - 1));

      _classPrivateFieldGet(this, _selectRow).call(this, _classPrivateFieldGet(this, _tablePuzzle));
    }
  }, {
    key: "selectDown",
    value: function selectDown() {
      _classPrivateFieldSet(this, _rowSelected, Math.min(_classPrivateFieldGet(this, _gridSolution).length - 1, _classPrivateFieldGet(this, _rowSelected) + 1));

      _classPrivateFieldGet(this, _selectRow).call(this, _classPrivateFieldGet(this, _tablePuzzle));
    }
  }, {
    key: "selectLeft",
    value: function selectLeft() {
      _classPrivateFieldSet(this, _colSelected, Math.max(0, _classPrivateFieldGet(this, _colSelected) - 1));

      _classPrivateFieldGet(this, _selectCol).call(this, _classPrivateFieldGet(this, _tablePuzzle));
    }
  }, {
    key: "selectRight",
    value: function selectRight() {
      _classPrivateFieldSet(this, _colSelected, Math.min(_classPrivateFieldGet(this, _gridSolution)[0].length - 1, _classPrivateFieldGet(this, _colSelected) + 1));

      _classPrivateFieldGet(this, _selectCol).call(this, _classPrivateFieldGet(this, _tablePuzzle));
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      _classPrivateFieldGet(this, _spinColumn).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _colSelected), -1);

      _classPrivateFieldGet(this, _colorTable).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _tablePuzzle));

      _classPrivateFieldGet(this, _matchTables).call(this);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      _classPrivateFieldGet(this, _spinColumn).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _colSelected), 1);

      _classPrivateFieldGet(this, _colorTable).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _tablePuzzle));

      _classPrivateFieldGet(this, _matchTables).call(this);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      _classPrivateFieldGet(this, _spinRow).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _rowSelected), -1);

      _classPrivateFieldGet(this, _colorTable).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _tablePuzzle));

      _classPrivateFieldGet(this, _matchTables).call(this);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      _classPrivateFieldGet(this, _spinRow).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _rowSelected), 1);

      _classPrivateFieldGet(this, _colorTable).call(this, _classPrivateFieldGet(this, _gridPuzzle), _classPrivateFieldGet(this, _tablePuzzle));

      _classPrivateFieldGet(this, _matchTables).call(this);
    } // #region private methods
    // #endregion

  }]);

  return Game;
}();

var _done = new WeakMap();

var _debug = new WeakMap();

var _levelIndex = new WeakMap();

var _gridPuzzle = new WeakMap();

var _gridSolution = new WeakMap();

var _rowSelected = new WeakMap();

var _colSelected = new WeakMap();

var _colors = new WeakMap();

var _gridElement = new WeakMap();

var _tableSolution = new WeakMap();

var _tablePuzzle = new WeakMap();

var _render = new WeakMap();

var _renderGrid = new WeakMap();

var _colorTable = new WeakMap();

var _shuffleTable = new WeakMap();

var _spinRow = new WeakMap();

var _spinColumn = new WeakMap();

var _matchTables = new WeakMap();

var _showSuccess = new WeakMap();

var _hideSuccess = new WeakMap();

var _selectRow = new WeakMap();

var _selectCol = new WeakMap();

var _setInnerHtml = new WeakMap();

var _appendInnerHtml = new WeakMap();

var _transpose = new WeakMap();

var _getRandomInt = new WeakMap();
//# sourceMappingURL=game.js.map