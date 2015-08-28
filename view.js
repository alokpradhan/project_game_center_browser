var view = {

  defaultSize: 0,
  gameboard: {},

  init: function(level){
    this.setGameBoard(level);
    // this.moveSnake();
  },

  setGameBoard: function(level) {
    view.defaultSize = 60/level;
    totalDivs = view.defaultSize * view.defaultSize;
    for(var i=1; i <= totalDivs; i++){
      $('#gameboard').append('<div class="square" id="'+i+'"></div>');
      view.gameboard[i] = "";
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
        view.gameboard[i] = 'border';
      }
    }
  },

  setSnake: function() {
    $('#' + (view.defaultSize + 2)).addClass('snake');
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