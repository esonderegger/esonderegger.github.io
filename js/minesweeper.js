function makeGame(gridSize, numMines) {
  var theTable = $("#mineSweeperGame");
  theTable.html('');
  var trCounter = 0;
  for(var x=0; x<gridSize; x++) {
    var tdCounter = 0;
    var trString = '<tr>';
    for(var y=0; y<gridSize; y++) {
      trString += '<td id="tile' + pad2(trCounter) + pad2(tdCounter) + '"></td>';
      tdCounter += 1
    }
    trString += '</tr>';
    theTable.append(trString);
    trCounter += 1;
  }
  addMines(numMines);
  addAllNumbers();
  makeClickable();
}
function borderingTiles(td){
    var borderingArray = [];
    var tileID = td.attr('id');
    var tileTR = parseInt(tileID.slice(4,6), 10);
    var tileTD = parseInt(tileID.slice(6), 10);
    var right = $('#tile' + pad2(tileTR) + pad2(tileTD + 1) );
    if (right.length > 0){
      borderingArray.push(right);
    }
    var left = $('#tile' + pad2(tileTR) + pad2(tileTD - 1) );
    if (left.length > 0){
      borderingArray.push(left);
    }
    var downRight = $('#tile' + pad2(tileTR + 1) + pad2(tileTD + 1) );
    if (downRight.length > 0){
      borderingArray.push(downRight);
    }
    var down = $('#tile' + pad2(tileTR + 1) + pad2(tileTD) );
    if (down.length > 0){
      borderingArray.push(down);
    }
    var downLeft = $('#tile' + pad2(tileTR + 1) + pad2(tileTD - 1) );
    if (downLeft.length > 0){
      borderingArray.push(downLeft);
    }
    var upRight = $('#tile' + pad2(tileTR - 1) + pad2(tileTD + 1) );
    if (upRight.length > 0){
      borderingArray.push(upRight);
    }
    var up = $('#tile' + pad2(tileTR - 1) + pad2(tileTD) );
    if (up.length > 0){
      borderingArray.push(up);
    }
    var upLeft = $('#tile' + pad2(tileTR - 1) + pad2(tileTD - 1) );
    if (upLeft.length > 0){
      borderingArray.push(upLeft);
    }
    return borderingArray;
}
function revealTile(td){
  if (!td.hasClass('flagged')){
    td.addClass('revealed');
    td.css("background-color","#aaa");
    if (td.hasClass('mine')){
      td.html('<img src="/img/glyphicons_021_snowflake.png" />');
      td.css("background-color","#f00");
      validateGame();
    } else if (td.hasClass('borders0')){
      var borderTiles = borderingTiles(td);
      for (i in borderTiles){
        if (!borderTiles[i].hasClass('revealed')){
          revealTile(borderTiles[i]);
        }
      }
    } else if (td.hasClass('borders1')){
      td.text('1');
      td.css("color",colorForNumber(1));
    } else if (td.hasClass('borders2')){
      td.text('2');
      td.css("color",colorForNumber(2));
    } else if (td.hasClass('borders3')){
      td.text('3');
      td.css("color",colorForNumber(3));
    } else if (td.hasClass('borders4')){
      td.text('4');
      td.css("color",colorForNumber(4));
    } else if (td.hasClass('borders5')){
      td.text('5');
      td.css("color",colorForNumber(5));
    } else if (td.hasClass('borders6')){
      td.text('6');
      td.css("color",colorForNumber(6));
    } else if (td.hasClass('borders7')){
      td.text('7');
      td.css("color",colorForNumber(7));
    } else if (td.hasClass('borders8')){
      td.text('8');
      td.css("color",colorForNumber(8));
    }
    td.css("border","1px solid");
    td.css("border-color","#777");
    td.css("height","38px");
    td.css("width","38px");
  }
}
function flagTile(td){
  if (td.hasClass('flagged')){
    td.removeClass('flagged');
    td.text('');
  } else {
    if (!td.hasClass('revealed')){
      td.addClass('flagged');
      td.html('<img src="/img/glyphicons_266_flag.png" />');
    }
  }
}
function addNumber(td){
  if (td.hasClass('notmine')){
    var numMines = 0;
    var borderTiles = borderingTiles(td);
    for (a in borderTiles){
      if (borderTiles[a].hasClass('mine')){
        numMines += 1;
      }
    }
    td.addClass('borders' + numMines);
  }
}
function addAllNumbers(){
  $('td').each(function(index) {
    addNumber($(this));
  });
}
function makeClickable(){
  $('td').each(function(index) {
    $(this).click(function() {
      if (!$("#mineSweeperGame").hasClass('gameOver')){
        if ($('#clickFlags').is(':checked')){
          flagTile($(this));
        } else {
          revealTile($(this));
        }
      }
    });
  });
}
function pad2(number) {
   var str = '' + number;
  while (str.length < 2) {
        str = '0' + str;
    }
    return str;
     //return (number < 10 ? '0' : '') + number
   
}
function colorForNumber(number){
  if (number == 1){
    return '#0004FF';
  }
  else if (number == 2){
    return '#007000';
  }
  else if (number == 3){
    return '#FE0100';
  }
  else if (number == 4){
    return '#05006C';
  }
  else if (number == 5){
    return '#840800';
  }
  else if (number == 6){
    return '#008284';
  }
  else if (number == 7){
    return '#840084';
  }
  else {
    return '#000000'
  }
}
function addMines(numMines){
  var tds = $("td");
  var tilesLeft = tds.length;
  var minesLeft = numMines;
  $('td').each(function(index) {
    var randomNum = Math.floor(Math.random()*tilesLeft);
    if (randomNum < minesLeft){
      $(this).addClass('mine');
      minesLeft -= 1;
    } else {
      $(this).addClass('notmine');
    }
    tilesLeft -= 1;
  });
}
function cheatGame(){
  $('td').each(function(index) {
    if (!$(this).hasClass('mine')){
      revealTile($(this));
    }
  });
}
function isGameWon(){
  var returnVal = true;
  $('td').each(function(index) {
    if ($(this).hasClass('notmine')){
      if (!$(this).hasClass('revealed')){
        returnVal = false;
      }
    }
  });
  return returnVal;
}
function validateGame(){
  var gameWon = isGameWon();
  if (gameWon){
    $('#winLossRow').text('You win!');
    $('.mine').each(function() {
      $(this).html('<img src="/img/glyphicons_266_flag.png" />');
    });
  } else {
    $('#winLossRow').text('You lose!');
    $('.mine').each(function() {
      $(this).html('<img src="/img/glyphicons_021_snowflake.png" />');
      $(this).css("border","1px solid");
      $(this).css("border-color","#777");
      $(this).css("height","38px");
      $(this).css("width","38px");
      if ($(this).css("background-color") == 'rgb(187, 187, 187)'){
        $(this).css("background-color","#aaa");
      }
    });
  }
  $("#mineSweeperGame").addClass('gameOver');
}
function saveGame(){

}
function loadGame(){

}
function makeMineSweeper(){
  var gridSize = $('#gridSize').val();
  var numMines = $('#numMines').val();
  $("#mineSweeperGame").removeClass('gameOver');
  $('#winLossRow').text("Minesweeper in Javascript");
  makeGame(gridSize,numMines);
}
$(document).ready(function() {
  $('#newGame').click(function(){
    makeMineSweeper();
  });
  $('#cheat').click(function(){
    cheatGame();
  });
  $('#validate').click(function(){
    validateGame();
  });
  $('#saveGame').click(function(){
    saveGame();
  });
  makeMineSweeper();
  if (localstorage.minesweeperGames){
    $("#savedGames").text('got games');
  }
});
