// grid is 6, 7
var GRID = {
  cols: 7,
  rows: 6
};

function createGrid(){
  for(var i = 0; i < GRID.rows; i++) {
    var $row = $("<div></div>");
    for(var j = 0; j < GRID.cols; j++) {
      var $col = $("<div></div>")
        .addClass("box")
        .addClass("row-" + i)
        .addClass("col-" + j)
        .data("col", j)
        .data("row", i);
      $row.append($col);
    }
    $("body").append($row);
  }
}

function moveComputer() {
  var placed = false;
  var $col;
  while(!placed) {
    var col = ".col-" + Math.floor(Math.random() * GRID.cols);
    $col = $(col);
    var numPieces = $col.find(".piece").length;
    if (numPieces < GRID.cols) {
      var $last = $col.not(".piece").last();
      $last.addClass("piece")
          .addClass("computer");
      placed = true;
      checkConnect($last.data("row"), $last.data("col"));
    }
  }
}

function movePlayer(colNum){
  if (colNum == null ||
      colNum < 0 ||
      colNum > GRID.cols) return false;

  var $col = $(".col-" + colNum);
  var $last = $col.not(".piece").last();
  $last.addClass("piece")
      .addClass("player");
  checkConnect($last.data("row"), $last.data("col"));
  return true;
}

function checkConnect(rowI, colI){
  var $row = $(".row-" + rowI);
  var $col = $(".col-" + colI);
  var comp = 0;
  var user = 0;

  // check horizontal wins
  for(var j = 0; j < $row.length; j++) {
    var $item = $($row[j]);
    if($item.hasClass("computer")) {
      comp++;
      user = 0;
    } else if ($item.hasClass("player")) {
      user++;
      comp = 0;
    } else {
      comp = 0;
      user = 0;
    }

    if (comp === 4) {
      computerWins();
      break;
    } else if (user === 4) {
      playerWins();
    }
  // check vertical
  }
  for(var j = 0; j < $col.length; j++) {
    var $item = $($col[j]);
    if($item.hasClass("computer")) {
      comp++;
      user = 0;
    } else if ($item.hasClass("player")) {
      user++;
      comp = 0;
    } else {
      comp = 0;
      user = 0;
    }

    if (comp === 4) {
      computerWins();
      break;
    } else if (user === 4) {
      playerWins();
    }
  }
}

function computerWins(){
  alert("computer kicked your ass, bitch.")
}
function playerWins(){
  alert("player wins.")
}

$(document).ready(function(){
  createGrid();
  $(".box").on("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    var $target = $(e.target);
    var colNum = $target.data("col");
    if (movePlayer(colNum)) {
      moveComputer();
    }
  })
});