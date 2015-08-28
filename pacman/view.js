var view = {

draw: function() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var pacMan = new Image();
  pacMan.onload = function() {
    ctx.drawImage(pacMan,0,0, 100, 100);
    ctx.drawImage(monster,200,0, 100, 100);
    ctx.beginPath();
    ctx.moveTo(30,96);
    ctx.lineTo(70,66);
    ctx.lineTo(103,76);
    ctx.lineTo(170,15);
    ctx.stroke();
  };
  pacMan.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pacman.svg/2000px-Pacman.svg.png';
  monster.src = 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0CAcQjRxqFQoTCK3it-L2zMcCFcQ6iAodgdYGwg&url=http%3A%2F%2Fwww.softicons.com%2Fgame-icons%2Fclassic-games-icons-by-thvg%2Fpacman-1-icon&ei=T-7gVe3-A8T1oASBrZuQDA&psig=AFQjCNHhxfEBYSY4N4eBRaNJXB2fzigd5w&ust=1440890821459682';

}

};

