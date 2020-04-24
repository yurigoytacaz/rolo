"use strict";

// let slider = document.querySelector('.row--active');
var isDown = false;
var startX;
var scrollLeft;
slider.addEventListener('mousedown', function (e) {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', function () {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', function () {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', function (e) {
  if (!isDown) return;
  e.preventDefault();
  var x = e.pageX - slider.offsetLeft;
  var walk = (x - startX) * 3; //scroll-fast

  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);

  if (walk > 0) {
    if (!done) {
      spinRow(gridPuzzle, rowSelected, 1);
      colorTable(gridPuzzle, tablePuzzle);
      matchTables();
    }
  } else if (!done) {
    spinRow(gridPuzzle, rowSelected, -1);
    colorTable(gridPuzzle, tablePuzzle);
    matchTables();
  }
});
//# sourceMappingURL=mouse.js.map