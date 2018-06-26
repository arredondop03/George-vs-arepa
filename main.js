// Loading page
window.onload = function(){

  //Setting up canvas
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //Game constructor function
  function Game(){
  }

  //Calling all constructor function
  var game = new Game();
  var box = new Box();

  //Storage for the rows
  var boxes = [];

  //box constructor function
  function Box(x,y){
    this.x = x ;
    this.y = y;
    this.width = 72;
    this.height = 72;
  }


  // Prototypes

  //
  Game.prototype.generateBoxes = function(){

    for(var i=0; i < 21; i++){
      var randomI = Math.floor((Math.random() * 20) + 1)
      var newBox = new Box(randomI *72, 0);
      boxes.push(newBox);
    // ctx.fillRect(randomI *72, 0, 72, 72);
    }
  }

  Game.prototype.drawBoxes = function(){
    for(var i=0; i < boxes.length; i++){
      boxes[i].y += 10;
    ctx.fillRect(boxes[i].x, boxes[i].y, 72, 72);
    }
  }

  Game.prototype.fallingBoxes = function(){
    setInterval(function(){
      ctx.clearRect(0,0,canvas.width,canvas.height)
      game.drawBoxes();
    },500);
  }

  

  setInterval(function(){
    game.generateBoxes();
  },10000);

  game.fallingBoxes();
  game.generateBoxes();

}

