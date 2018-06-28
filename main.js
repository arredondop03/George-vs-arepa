// Loading page
window.onload = function(){

  //Setting up canvas
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //Variables
  var theImage;
  var boxes = [];

  //////////////////CONSTRUCTOR FUNCTIONS////////////

  //Game constructor function
  function Game(){
    this.george = {}
  }

  //Box constructor function
  function Box(x,y){
    this.x = x ;
    this.y = y;
    this.width = 72;
    this.height = 72;
  }
  var imgArepa = new Image();
  imgArepa.src = 'images/reina-pepiada.png';

  //George constructor function
  var George = function(){
    this.x = 240;
    this.y = 600;
    this.width = 58;
    this.height = 72;
    this.img = new Image();
    this.img.src = 'images/george_harris.png';  
    this.health = 20;
  }

  

  //////////////////DECLARATION OF CONSTRUCTOR FUNCTIONS////////////

  var game = new Game();
  // var box = new Box();
  var theGeorge = new George();
  



  
  
  //////////////////PROTOTYPES////////////

  // Game.prototype.image = function () {
  // this.height = 40;
  // this.x = x;
  // this.y = y;
  // }

  Game.prototype.generateBoxes = function(){
      for(var i=0; i < 21; i++){
        var randomI = Math.floor((Math.random() * 20))
        var newBox = new Box(randomI *73, 0);
        boxes.push(newBox);
      }

  }

  Game.prototype.generateBooster = function(){
    // var randomMaxAmount = Math.floor((Math.random() * 5));
    // for(var i=0; i <randomMaxAmount; i++){

    // }

    setInterval(function(){
      
    })
  }

  Game.prototype.drawBoxes = function(){
    for(var i=0; i < boxes.length; i++){
      boxes[i].y += 1;
    // ctx.fillRect(boxes[i].x, boxes[i].y, 72, 72);
    ctx.drawImage(imgArepa, boxes[i].x, boxes[i].y, 72, 72 )
    }
  }

  Game.prototype.animate = function(){
    setInterval(function(){
      ctx.clearRect(0,0,canvas.width,canvas.height)
      
      game.drawBoxes();
      game.george.drawGeorge();
     
      for(var i = 0; i <  boxes.length; i++) {
        if (boxes[i].x < theGeorge.x + theGeorge.width && //from left
          boxes[i].x + boxes[i].width > theGeorge.x &&    //from right
          boxes[i].y < theGeorge.y + theGeorge.height &&  //from top
          boxes[i].height + boxes[i].y > theGeorge.y)     //from bottom
          {
          // collision detected!
          console.log('georges health', theGeorge.health)
          boxes.splice(i,1);
          theGeorge.health--;

          //crear un boolean  a false, y cuando collide lo pones true 
          //falso, toca true, esperar falso de nuevo
      }
    }
    },17);
    


  }
 
  George.prototype.drawGeorge = function(){
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  Box.prototype.drawArepas = function(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

  }


  George.prototype.move = function(theX, theY){
    ctx.clearRect(this.x, this.y, this.width, this.height);
      this.x = theX
      this.y = theY
      if(game.george.canMove(this.x, this.y)) {
        game.george.drawGeorge();
        // ctx.drawImage(this.theImage, this.x, this.y, this.width, this.height);
      }
  }

  George.prototype.canMove = function (futurex, futurey) {
  // if(
  //   futurex + this.width >= currentGame.obstacle.x &&
  //   futurex <= currentGame.obstacle.x + currentGame.obstacle.width &&
  //   futurey + this.height >= currentGame.obstacle.y &&
  //   futurey <= currentGame.obstacle.y + currentGame.obstacle.height
  //   ){
  //     return false
  //   } else 
    if(
      futurex + this.width >= canvas.width){
        this.x =canvas.width-50;
      } else if(futurex <= 0 ||
        futurey + this.height >= canvas.height ||
        futurey <= 0){

          return false
        }
      {
        return true;
    }
  }
  

  //Function to generate row every ten seconds
  setInterval(function(){
    game.generateBoxes();
  },3800);

  //////////////////CALLING PROTOTYPES////////////

  game.generateBoxes();
  game.animate();

 
  game.george = theGeorge;  //------------WHAT IS THIS?-------------------------- FROM HERE DOWN

  

  function mousePos(e) {
  
    if (e.offsetX) {
      // console.log('here')
      // console.log('george',theGeorge.x)
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
      
        mouseX = e.layerX;
        mouseY = e.layerY;
    }

    theGeorge.move(mouseX, mouseY)

  }

  $(function () { 
    canvas.onmousemove = mousePos;
  });

  

  window.addEventListener('mousemove', function(){
    // console.log('hiii');
  })




}