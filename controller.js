
var controller = {

  init: function(){
    var level = this.selectDifficulty();
    view.init(level);
    this.gameLoop();
  },

  selectDifficulty: function(){
    var level = prompt('Select Difficulty Level: 1 for easy, 2 for medium, 3 for difficult');
    if (isNaN(level) || level > 3 || level < 1) {
      level = 1;
    }
    return level;
  },

  isValidMove: function(positionID){
    var posValue = model.gameboard[positionID];
    return (posValue === '' || posValue === 'food');
  },

  gameLoop: function(){
    window.interactionLoop = window.setInterval(view.makeMove, 500);
  },

  endGame: function(){
    window.clearInterval(window.interactionLoop);
    alert('You Lost!');
  }

};

$(document).ready(function(){
  controller.init();
  // view.moveSnake();
});