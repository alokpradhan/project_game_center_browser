var view = {

  defaultSize: 0,
  totalDivs: 0,
  currentDirection: "right",

  init: function(level){
    this.setGameBoard(level);
  },

  setGameBoard: function(level) {
    view.defaultSize = 60/level;
    this.totalDivs = view.defaultSize * view.defaultSize;
    for(var i=1; i <= this.totalDivs; i++){
      $('#gameboard').append('<div class="square" id="'+i+'"></div>');
      model.gameboard[i] = "";
      if (i % view.defaultSize === 0){
        $('#gameboard').append('<br>');
      }
    }
    view.setBorder();
    view.setSnake();
    view.setFood();
  },

  setBorder: function() {
    for(var i=1; i <= this.totalDivs; i++){
      if (i <= view.defaultSize ||
          (i > this.totalDivs-view.defaultSize && i <= this.totalDivs) ||
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

  setFood: function() {
    var randomID;
    do {
      randomID = Math.floor(Math.random()* this.totalDivs);
      console.log("food" + model.gameboard[randomID]);
    } while (model.gameboard[randomID] !== "");
    $('#' + randomID).addClass('food');
    gameboard[randomID] = "food";
  },

  makeMove: function(direction){
    snakeHead = model.snakePosition[0];
    nextPosID =  snakeHead+1; // changes with direction
    if (controller.isValidMove(nextPosID)){
      console.log('inside makeMove if true');
      if (model.gameboard[nextPosID] === 'food'){
        model.growSnake(nextPosID);
        view.setFood();
      }
      view.moveSnake(nextPosID);
    } else {
      controller.endGame();
    }
  },

  moveSnake: function(nextPosID){
    console.log('inside makeSnake');
    snakeTail = model.snakePosition[model.score+1];
    $('#' + nextPosID).addClass('snake');
    $('#' + (snakeTail)).removeClass('snake');
    model.updateSnakeMove(nextPosID);
    // this.currentDirection
  }


  userMove: function() {
    $(document).keydown()
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