
var controller = {
  init: function(){
    var level = this.selectDifficulty();
    view.init(level);
  },

  selectDifficulty: function(){
    var level = prompt('Select Difficulty Level: 1 for easy, 2 for medium, 3 for difficult');
    if (isNaN(level) || level > 3 || level < 1) {
      level = 1;
    }
    return level;
  }
}


$(document).ready(){controller.init();};