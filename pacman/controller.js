var controller = {

  level: 0,

  init: function(){
    this.level = this.selectDifficulty();
    view.init(this.level);
    this.gameLoop();
  },

  selectDifficulty: function(){
    var input = prompt('Select Difficulty Level: 1 for easy, 2 for medium, 3 for difficult');
    if (isNaN(input) || input > 3 || input < 1) {
      input = 1;
    }
    return input;
  },

  isValidMove: function(positionID){
    var posValue = model.gameboard[positionID];
    return (posValue === '' || posValue === 'food' || posValue === 'glow');
  },

  gameLoop: function(){
    window.interactionLoop = window.setInterval(view.makeMove, 1000/(controller.level));
  },

  endGame: function(){
    window.clearInterval(window.interactionLoop);
    alert('You Lost!');
  }

};

$(document).ready(function(){
  controller.init();

});