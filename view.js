var view = {

  defaultSize: 0,
  currentDirection: "right",

  init: function(level){
    this.setGameBoard(level);
  },

  setGameBoard: function(level) {
    view.defaultSize = 60/level;
    totalDivs = view.defaultSize * view.defaultSize;
    for(var i=1; i <= totalDivs; i++){
      $('#gameboard').append('<div class="square" id="'+i+'"></div>');
      model.gameboard[i] = "";
      if (i % view.defaultSize === 0){
        $('#gameboard').append('<br>');
      }
    }
    view.setBorder();
    view.setSnake();
  },

  setBorder: function() {
    totalDivs = view.defaultSize * view.defaultSize;
    for(var i=1; i <= totalDivs; i++){
      if (i <= view.defaultSize ||
          (i > totalDivs-view.defaultSize && i <= totalDivs) ||
          (i%view.defaultSize === 0 || i%view.defaultSize === 1)
        ) {
        $('#'+ i).addClass('border');
        model.gameboard[i] = 'border';
      }
    }
  },

  setSnake: function() {
    var startingDivID = view.defaultSize + 2;
    $('#' + startingDivID + ', #' + (startingDivID + 1) ).addClass('snake');
    model.createSnake(startingDivID);
  },

  moveSnake: function(direction){
    console.log('snake moving');
    snakeHead = model.snakePosition[0];
    snakeTail = model.snakePosition[model.score+1];
    $('#' + (snakeHead+1)).addClass('snake');
    $('#' + (snakeTail)).removeClass('snake');
    model.updateSnakeMove(snakeHead+1);
    // this.currentDirection
  }

  // make method call or property only?
  // var keys: {
  //   37: leftArrow,
  //   38: upArrow,
  //   39: rightArrow,
  //   40: downArrow
  // },

  // moveSnake: function(){
  //   $('#gameboard').ready(function(){
  //     $("#snake").animate({ "left": "+=10px" }, "slow", view.moveSnake);
  //   });
  // }



};



// Use keypress() over keydown()

// http://stackoverflow.com/questions/14919459/using-jquery-on-to-watch-for-enter-key-press

// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

// http://stackoverflow.com/questions/5106024/enter-listener-not-firing-on-webkit-chrome