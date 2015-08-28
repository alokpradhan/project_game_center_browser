var model = {
  // var food,
  gameboard: {},
  // First pushed element is the head div ID, last is the tail div ID
  snakePosition: [],
  score: 0,

  initialize: function(level) {
    createSnake(level);
  },

  createSnake: function(startingDivID) {
    this.gameboard[startingDivID] = 'snake';
    this.gameboard[startingDivID+1] = 'snake';
    this.snakePosition.push(startingDivID+1);
    this.snakePosition.push(startingDivID);
    // defaultSize = 2;
    // snake['length'] = level*defaultSize;
  },

  updateSnakeMove: function(newHeadDivID) {
    //add div
    this.snakePosition.unshift(newHeadDivID);
    this.gameboard[newHeadDivID] = 'snake';
    this.gameboard[this.snakePosition.pop()] = '';
  },

  growSnake: function(newHeadDivID){
    this.snakePosition.unshift(newHeadDivID);
    this.gameboard[newHeadDivID] = 'snake';
    this.score++;
    this.ateFood(newHeadDivID);
  },

  ateFood: function(oldFoodID){
    this.gameboard[oldFoodID]= '';
  }

};

// head, tail
// [2,1]

// pop tail, unshift head
// [3,2]

// grow unshift head
// [4,3,2]
