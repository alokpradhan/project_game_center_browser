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
    $('#gameboard').click(function(){
      $("#snake").animate({ "left": "+=100px" }, "slow" );
    });
  }


};
