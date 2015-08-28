var view = {
  init: function(level){
    this.setGameBoard(level);
    this.moveSnake();
  },

  setGameBoard: function(level) {
    defaultSize = 600;
    $('#gameboard').css({ 'height': defaultSize/level + 'px',
                          'width':  defaultSize/level + 'px' });
  },

  moveSnake: function(){
    $('#gameboard').ready(function(){
      $("#snake").animate({ "left": "+=10px" }, "slow", view.moveSnake);
    });
  }



};


// Use keypress() over keydown()

// http://stackoverflow.com/questions/14919459/using-jquery-on-to-watch-for-enter-key-press

// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

// http://stackoverflow.com/questions/5106024/enter-listener-not-firing-on-webkit-chrome