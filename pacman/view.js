var view = {

  defaultGhost: 0,
  totalDivs: 2500,
  defaultSize: 50,
  currentDirection: "right",

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
    view.setGhost(controller.level);
    view.setFood(30);
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
    //make obstacles and label wall

  },

  setGhost: function(num){
    for(var i; i< num; i++){
      setRandomItem('ghost');
    };
  },

  setPacman: function() {
    var startingDivID = view.defaultSize + 2;
    $('#' + startingDivID).addClass('pacman');
    model.createMonster(startingDivID, 'pacman');
  },

  setFood: function(num) {
    for(var i; i< num; i++){
      setRandomItem('food');
    };
  },

  setRandomItem: function(className){
    var randomID;
    do {
      randomID = Math.floor(Math.random()* this.totalDivs);
    } while (model.maze[randomID] !== "");
    $('#' + randomID).addClass(className);
    model.maze[randomID] = className;
  },

  makeMove: function(){
    nextPosID =  view.newDirectionID();
    if (controller.isValidMove(nextPosID)){
      if (model.maze[nextPosID] === 'food'){
        view.showScore();
      } else {
        view.movePacman(nextPosID);
      }
    } else {
      view.movePacman(nextPosID);
      controller.endGame();
    }

  },

  newDirectionID: function() {
    var pacmanPosition = model.pacmanID;
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
    }
    return divIdToMoveTo;
  },

  movePacman: function(nextPosID){
    previousPos = model.pacmanID;
    $('#' + nextPosID).addClass('pacman');
    $('#' + previousPos).removeClass('pacman');
    model.updatePacmanMove(nextPosID);
  },

  setPacmanDirection: function(event){
    this.currentDirection = this.userMove[event.which];
  },

  userMove: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }


};

