var view = {

  defaultSize: 0,

  init: function(level){
    this.setGameBoard(level);
    // this.moveSnake();
  },

  setGameBoard: function(level) {
    view.defaultSize = 90/level;
    totalDivs = view.defaultSize * view.defaultSize;
    for(var i=1; i <= totalDivs; i++){
      // if ('#')

      $('#gameboard').append('<div class="square" id="'+i+'"></div>');
      if (i % view.defaultSize === 0){
        $('#gameboard').append('<br>');
      }

      // between 1-default-size, last row, after and before break
    }
  }
  // setGameboard: function(size){
  //   for( var i=1; i <= size; i++){
  //     var $card = $('<div class="hidden-square" id="'+i+'"></div>');
  //     $('#gameboard').append($card);
  //   }
  // }

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