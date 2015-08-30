var controller = {

  level: 0,

  init: function(){
    this.level = this.selectDifficulty();
    view.init(this.level);
    model.initialize();
    this.pacmanLoop();
    this.ghostLoop();
  },

  selectDifficulty: function(){
    var input = prompt('Select Difficulty Level: 1 for easy, 2 for medium, 3 for difficult');
    if (isNaN(input) || input > 3 || input < 1) {
      input = 1;
    }
    return input;
  },

  isValidMove: function(positionID){
    var posValue = model.maze[positionID];
    return (posValue === ''           ||
            posValue === 'food'       ||
            posValue === 'super-food' ||
            posValue === 'glow'       ||
            posValue === 'wall');
  },

  pacmanLoop: function(){
    window.pacmanLoop = window.setInterval(view.pacmanMoveLoop, 200+(controller.level*40));
  },

  ghostLoop: function(){
    window.ghostLoop = window.setInterval(function(){
      numOfGhosts = view.defaultGhost;
      for(var i = 0; i < numOfGhosts; i++){
        nextPosID = model.ghostMovement('ghost'+i);
        view.ghostMoveLoop(nextPosID, 'ghost'+ i);
      }
    },
    1000/(controller.level));
  },

  endGame: function(){
    window.clearInterval(window.pacmanLoop);
    window.clearInterval(window.ghostLoop);
    alert('You Lost!');
  }

};

$(document).ready(function(){ controller.init(); });