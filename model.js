var model = {
  // var snakeHead,
  // var snakeTail,
  // var food,

  snake: {},

  initialize: function(level) {
    createSnake(level);
  },

  createSnake: function(level) {
    defaultSize = 10;
    snake['length'] = level*defaultSize;
    snake['score'] = 0;
  }

};