var view = {

  defaultSize: 0,
  totalDivs: 0,
  currentDirection: "right",

  init: function(level){
    this.setGameBoard(level);

    $(document).keydown(function(event){
      view.setSnakeDirection(event);
    });
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
    $('.food').addClass('snake').removeClass('food');
    do {
      randomID = Math.floor(Math.random()* this.totalDivs);
    } while (model.gameboard[randomID] !== "");
    $('#' + randomID).addClass('food');
    model.gameboard[randomID] = "food";
    console.log('food here: '+ randomID);
  },

  makeMove: function(){
    nextPosID =  view.newDirectionID();
    console.log('nextPosID: ' + nextPosID);
    if (controller.isValidMove(nextPosID)){
      if (model.gameboard[nextPosID] === 'food'){
        console.log('nextPos is: ' + model.gameboard[nextPosID]);
        // console.log('snakeHead')
        model.growSnake(nextPosID);
        view.setFood();
      } else {
        view.moveSnake(nextPosID);
      }
    } else {
      view.moveSnake(nextPosID);
      controller.endGame();
    }
  },

  newDirectionID: function() {
    var snakeHead = model.snakePosition[0];
    var divIdToMoveTo = 0;
    switch (this.currentDirection) {
      case 'left' :
        divIdToMoveTo = snakeHead - 1;
        break;
      case 'right' :
        divIdToMoveTo = snakeHead + 1;
        break;
      case 'up' :
        divIdToMoveTo = snakeHead - view.defaultSize;
        break;
      case 'down':
        divIdToMoveTo = snakeHead + view.defaultSize;
        break;
    }
    return divIdToMoveTo;
  },

  moveSnake: function(nextPosID){
    snakeTail = model.snakePosition[model.score+1];
    $('#' + nextPosID).addClass('snake');
    $('#' + (snakeTail)).removeClass('snake');
    model.updateSnakeMove(nextPosID);
  },

  setSnakeDirection: function(event){
    this.currentDirection = this.userMove[event.which];
  },

  userMove: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

};



// Use keypress() over keydown()

// http://stackoverflow.com/questions/14919459/using-jquery-on-to-watch-for-enter-key-press

// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

// http://stackoverflow.com/questions/5106024/enter-listener-not-firing-on-webkit-chrome