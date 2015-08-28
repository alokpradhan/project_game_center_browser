var view = {
  init: function(level){
    this.setGameBoard(level);
    $('#gameboard').click(function(){
      $( "#snake" ).animate({ "left": "+=500px" }, "fast" );
    });
  },

  setGameBoard: function(level) {
    defaultSize = 600;
    $('#gameboard').css({ 'height': defaultSize/level + 'px',
                          'width':  defaultSize/level + 'px' });
  }


};
