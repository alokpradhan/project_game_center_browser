var model = {
  score: 0,
  scatter: false,
  maze: {},
  itemPosition: {},

  initialize: function(){
    this.pacman = new Monster('pacman');
    this.ghost = new Monster('ghost');
  },

  updatePacmanMove: function(newDivID){
    this.maze[newDivID] = 'pacman';
    this.maze[this.itemPosition['pacman']] = '';
    this.itemPosition['pacman'] = newDivID;
  },

  eatFood: function(oldFoodID){
    console.log("Eating food at:"+oldFoodID);
    this.maze[oldFoodID] = '';
    this.score++;
    // this.itemPosition['food'] = oldFoodID;
  },

  eatSuperFood: function(oldSuperFoodID){
    console.log("Eating super food at:"+oldSuperFoodID);
    this.maze[oldSuperFoodID] = '';
    this.score+=5;
    this.scatter = true;
  },

  ghostMovement: function(ghostNum){
    // console.log('returning movement' + movements[0]);
    return model.selectGhostMove(ghostNum);
    // Add checks so ghost can't go thru walls
  },

  updateGhostMove: function(newDivID, ghostNum){
    console.log('updating ghost3 to ' + newDivID);
    this.maze[newDivID] = 'ghost';
    this.maze[this.itemPosition[ghostNum]] = '';
    this.itemPosition[ghostNum] = newDivID;
  },

  selectGhostMove: function(ghost) {
    var currentPosition = model.itemPosition[ghost];
    var move = null;
    var potentialGhostMoves = [currentPosition-1,
                              currentPosition+1,
                              currentPosition-view.defaultSize,
                              currentPosition+view.defaultSize];
    if (ghost == 'ghost0'){
      move = potentialGhostMoves[0];
    } else if (ghost == 'ghost1'){
      move = potentialGhostMoves[2];
    } else {
      randomMove = Math.floor(Math.random()*4);
      move = potentialGhostMoves[randomMove];
    }
    return move;
  },

  ghostOneMove: function(){

  },

  ghostTwoMove: function(){

  },

  ghostThreeMove: function(){

  },

  ensureGhostsStayInbounds: function(){

  }

};

function Monster(name) {
  this.name = name;
  this.movementTimer = 0;
  this.currentPosition = 0;
  this.startPosition = 0;

  var setStartPosition = function(name){
    if (name === 'pacman'){
      this.startPosition = model.itemPosition['pacman'];
    } else {
      this.startPosition = model.itemPosition['ghost'];
    }
  };
  setStartPosition(name);
}