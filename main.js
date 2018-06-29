// Loading page
$("#canvas").toggle()

function begin(){

// window.onload = function(){

  //Setting up canvas
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  //Variables
  var boxes = [];
  var imgArepa = new Image();
  imgArepa.src = 'images/reina-pepiada.png';
  var circles = [];
  var imgHerb = new Image();
  imgHerb.src = 'images/herbalife1.png';

  //drawing text (im tired so fix it later please!)
  function drawScore() {
    ctx.font = '48px serif';
    ctx.fillText('Score', 10, 50);
    ctx.fillText(theGeorge.health, 10, 100);


  }
  

  //////////////////  CONSTRUCTOR FUNCTIONS  ////////////////////////

  //Game constructor function
  function Game(){
    this.george = {};
    this.speed = 1;
    
  }

  //Box constructor function
  function Box(x,y){
    this.x = x ;
    this.y = y;
    this.width = 72;
    this.height = 72;
  }

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
  
  //Circle constructor function
  function Circle(x,y){
    this.x = x ;
    this.y = y;
    this.raius = 5;
    this.width = 72;
    this.height = 72;
  }


  

  //////////////////  DECLARATION OF CONSTRUCTOR FUNCTIONS  /////////

  var game = new Game();
  var theGeorge = new George();
  
  
  //////////////////  PROTOTYPES  ///////////////////////////////////

  ///Obsticles!------
  Game.prototype.generateBoxes = function(){
   




      for(var i=0; i < 21; i++){
        var randomI = Math.floor((Math.random() * 20))
        var newBox = new Box(randomI *73, 0);
        boxes.push(newBox);
      }
     
   
  }

  Game.prototype.drawBoxes = function(){
    for(var i=0; i < boxes.length; i++){

      boxes[i].y += game.speed;
    // ctx.fillRect(boxes[i].x, boxes[i].y, 72, 72);
    ctx.drawImage(imgArepa, boxes[i].x, boxes[i].y, 72, 72 )
    }
  }

  
  /// End of obsticles----

  //More points------

  Game.prototype.generateCircles = function(){
    randomNumber = Math.floor(Math.random() * 4)
    for(var i=0; i < randomNumber; i++){
  var randomX = Math.floor(Math.random() * canvas.width)
  var randomY = Math.floor(Math.random() * canvas.height)
  
      var newCircle = new Circle(randomX,randomY);
      circles.push(newCircle);
    }

  }

  Game.prototype.drawCircles = function(){
    for(var i=0; i < circles.length; i++){
    circles[i].y += 1;
    ctx.drawImage(imgHerb, circles[i].x, circles[i].y, 80, 72 )
    }
  }
    



 
  ///Character/ character movement
  George.prototype.drawGeorge = function(){
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  George.prototype.move = function(theX, theY){
    ctx.clearRect(this.x, this.y, this.width, this.height);
      this.x = theX
      this.y = theY
      if(game.george.canMove(this.x, this.y)) {
        game.george.drawGeorge();
      }
  }

  //makes sure that the image doenst go pass the border
  George.prototype.canMove = function (futurex, futurey) {
    if (futurex + this.width >= canvas.width) {
        this.x =canvas.width- this.width;
      } else if(futurex <= 0 ||
        futurey + this.height >= canvas.height ||
        futurey <= 0){
        return false
      } else {
        return true;
    }
  }
  /// End of character movement----


  //ANIMATE!!!-------
  Game.prototype.animate = function(){
  setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    game.drawCircles();
    game.drawBoxes();
    game.george.drawGeorge();
    drawScore();
    
    for(var i = 0; i <  boxes.length; i++) {
      if (boxes[i].x < theGeorge.x + theGeorge.width && //from left
        boxes[i].x + boxes[i].width > theGeorge.x &&    //from right
        boxes[i].y < theGeorge.y + theGeorge.height &&  //from top
        boxes[i].height + boxes[i].y > theGeorge.y)     //from bottom
        {
        console.log('georges health', theGeorge.health)
        boxes.splice(i,1);
        theGeorge.health--; 
      }
    }

      for(var i = 0; i <  circles.length; i++) {
        if (circles[i].x < theGeorge.x + theGeorge.width && //from left
          circles[i].x + circles[i].width > theGeorge.x &&    //from right
          circles[i].y < theGeorge.y + theGeorge.height &&  //from top
          circles[i].height + circles[i].y > theGeorge.y)     //from bottom
          {
          console.log('georges health', theGeorge.health)
          circles.splice(i,1);
          theGeorge.health += 3; 
          }
        }
        
  

    },17);
  }
  
  /////////////  END OF PROTOTYPES  /////////////////////////////////
  

  //////////////////  CALLING PROTOTYPES  ///////////////////////////

  game.generateBoxes();
  game.generateCircles();
  game.animate();
  game.george = theGeorge;  

  
  //////////////////   FUNCTIONS   //////////////////////////////////

  setInterval(function(){
    game.generateBoxes();
  },3800);


  function mousePos(e) {
    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    } else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    theGeorge.move(mouseX, mouseY)
  }

  $(function () { 
    canvas.onmousemove = mousePos;
  });

  //////////////////  END OF FUNCTIONS  /////////////////////////////
  
  
}

document.getElementById('button').onclick = function(){
console.log('Start Button clicked');
$("#canvas").toggle()
$("#button").toggle()
begin();

}



