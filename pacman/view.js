var view = {

  defaultGhost: 0,
  totalDivs: 400,
  defaultSize: 20,
  food: 30,
  superFood: 5,
  currentDirection: 'right',
  prevDirection: '',

  init: function(level){
    this.setGameBoard(level);
    this.showScore();
    $(document).keydown(function(event){
      view.setPacmanDirection(event);
    });
  },

  showScore: function() {
    $('#score').text(model.score);
  },

  setGameBoard: function(level) {
    view.defaultGhost = level;
    for(var i=1; i <= this.totalDivs; i++){
      $('#gameboard').append('<div class="square" id="'+i+'"></div>');
      model.maze[i] = "";
      if (i % view.defaultSize === 0){
        $('#gameboard').append('<br>');
      }
    }
    view.setWall();
    view.setPacman();
    view.setGlow();
    view.setMazeObstacles();
    view.setGhost(controller.level);
    view.setFood(view.food);
    view.setSuperFood(view.superFood);
  },

  setWall: function() {
    this.setBoundary();
    this.setMazeObstacles();
  },

  setBoundary: function(){
    for(var i=1; i <= this.totalDivs; i++){
      if (i <= view.defaultSize ||
          (i > this.totalDivs-view.defaultSize && i <= this.totalDivs) ||
          (i%view.defaultSize === 0 || i%view.defaultSize === 1)
        ) {
        $('#'+ i).addClass('wall');
        model.maze[i] = 'wall';
      }
    }
  },

  //preset per level to make solvable maze
  setMazeObstacles: function(){
    for(var i=0; i < view.totalDivs/view.defaultSize; i++){
      view.setRandomItem('wall', '');
    }
  },

  setGlow: function(){
    var insertGlowAtDivID = view.totalDivs/2 + view.defaultSize/2;
    $('#'+insertGlowAtDivID).addClass('glow');
    model.maze[insertGlowAtDivID] = 'glow';
    model.itemPosition['glow'] = insertGlowAtDivID;
  },

  setGhost: function(num){
    for(var i=0; i < num; i++){
      view.setRandomItem('ghost', i);
    }
    console.log(model.itemPosition);
  },

  setPacman: function() {
    var startingDivID = view.defaultSize + 2;
    $('#' + startingDivID).addClass('pacman');
    model.itemPosition['pacman'] = startingDivID;
  },

  setFood: function(num) {
    for(var i=0; i < num; i++){
      view.setRandomItem('food', '');
    }
    console.log(model.itemPosition);
  },

  setSuperFood: function(num) {
    for(var i=0; i < num; i++){
      view.setRandomItem('super-food', '');
    }
    console.log(model.itemPosition);
  },

  setRandomItem: function(className, num){
    var randomID;
    do {
      randomID = Math.floor(Math.random()* this.totalDivs);
    } while (model.maze[randomID] !== "");
    console.log(className+num+ " at "+randomID);
    $('#' + randomID).addClass(className);
    model.itemPosition[className+num] = randomID;
    model.maze[randomID] = className;
  },

  eatFood: function(nextPosID){
    model.eatFood(nextPosID);
    $('#'+ nextPosID).removeClass('food');
  },

  eatSuperFood: function(nextPosID){
    model.eatSuperFood(nextPosID);
    $('#'+ nextPosID).removeClass('super-food');
  },

  eatGlow: function(){
    var glowID = model.eatGlow();
    console.log(glowID);
    $('#'+ glowID).removeClass('glow');
  },

  ghostMoveLoop: function(nextPosID, ghostNum){
    view.moveGhost(nextPosID, ghostNum);
  },

  moveGhost: function(nextPosID, ghostNum){
    previousPos = model.itemPosition[ghostNum];
    $('#' + nextPosID).addClass('ghost');
    $('#' + previousPos).removeClass('ghost');
    model.updateGhostMove(nextPosID, ghostNum);
  },

  pacmanMoveLoop: function(){
    var nextPosID =  view.newDirectionID();
    if (controller.isValidMove(nextPosID)){
      // console.log('next divID '+model.maze[nextPosID]);
      if (model.maze[nextPosID] === 'food'){
        view.eatFood(nextPosID);
        view.showScore();
      } else if (model.maze[nextPosID] === 'super-food') {
        view.eatSuperFood(nextPosID);
        view.showScore();
      } else if (model.maze[nextPosID] === 'wall') {
        console.log(nextPosID, model.itemPosition['pacman']);
        nextPosID = model.itemPosition['pacman'];
      } else if (model.maze[nextPosID] === 'glow') {
        view.eatGlow();
        view.movePacman(nextPosID);
        controller.endGame("You Win!");
      }
      view.movePacman(nextPosID);
    } else {
      view.movePacman(nextPosID);
      controller.endGame("You Lose! The ghost ate you!");
    }
  },

  movePacman: function(nextPosID){
    previousPos = model.itemPosition['pacman'];
    $('#' + previousPos).removeClass('pacman');
    $('#' + previousPos).rotate(0);
    $('#' + nextPosID).addClass('pacman');
    $('#'+nextPosID).rotate(this.rotatePacman());
    model.updatePacmanMove(nextPosID);
  },

  rotatePacman: function(){
    if (this.prevDirection !== this.currentDirection) {
      return this.pacmanRotation[this.currentDirection];
    } else {
      return 0;
    }
  },

  setPacmanDirection: function(event){
    this.prevDirection = this.currentDirection;
    this.currentDirection =
    this.userMove[event.which] === undefined ?
    this.prevDirection : this.userMove[event.which];
  },

  newDirectionID: function() {
    var pacmanPosition = model.itemPosition['pacman'];
    var divIdToMoveTo = 0;
    switch (this.currentDirection) {
      case 'left' :
        divIdToMoveTo = pacmanPosition - 1;
        break;
      case 'right' :
        divIdToMoveTo = pacmanPosition + 1;
        break;
      case 'up' :
        divIdToMoveTo = pacmanPosition - view.defaultSize;
        break;
      case 'down':
        divIdToMoveTo = pacmanPosition + view.defaultSize;
        break;
      default:
        divIdToMoveTo = pacmanPosition;
    }
    return divIdToMoveTo;
  },

  pacmanRotation: {
    'left': 180,
    'up': 270,
    'right': 0,
    'down': 90
  },

  userMove: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

};

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
     '-moz-transform' : 'rotate('+ degrees +'deg)',
     '-ms-transform' : 'rotate('+ degrees +'deg)',
     'transform' : 'rotate('+ degrees +'deg)'});
};
