var model = {
  score: 0,
  maze: {},
  itemPosition: {},

  initialize: function(){
    this.pacman = new Monster('pacman');
    this.ghost = new Monster('ghost');
  },

  updatePacmanMove: function(newDivID){
    console.log(this);
    this.maze[newDivID] = 'pacman';
    this.maze[this.itemPosition['pacman']] = '';
    this.itemPosition['pacman'] = newDivID;
  },

  eatFood: function(oldFoodID){
    this.maze[oldFoodID] = '';
    // this.itemPosition['food'] = oldFoodID;
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