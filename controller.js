
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

  gameLoop: function(){
    setInterval(view.moveSnake, 1000);
  },


  endGame: function(){
    clearInterval(this.gameLoop());
  }


};

$(document).ready(function(){
  controller.init();
  // view.moveSnake();
});