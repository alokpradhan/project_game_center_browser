var view = {
  init: function(level){
    this.setGameBoard(level);
  },

  setGameBoard: function(level) {
    defaultSize = 600;
    $('#gameboard').css({ 'height': defaultSize/level + 'px',
                          'width':  defaultSize/level + 'px' });
  }
};
