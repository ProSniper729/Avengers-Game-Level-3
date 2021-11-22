var bow , arrow,  background;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var score=0;

 
function preload(){
  
  backgroundImage = loadImage("bg.jfif");
  
  arrowImage = loadImage("bullet.png");
  bowImage = loadImage("thanos.png");
  red_balloonImage = loadImage("iron.png");
  green_balloonImage = loadImage("doctor.png");
  pink_balloonImage = loadImage("nebula.png");
  blue_balloonImage = loadImage("drax.png");
  mind=loadImage("mind.png");
  win=loadImage("win.png");

  die=loadSound("dying.mp3");
  
}

function setup() {
  createCanvas(600, 600);
  
  //creating background
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 6;

  mindStone = createSprite(90,200,100,100);
  mindStone.scale=0.2
  mindStone.addImage(mind);

  
  
  // creating bow to shoot arrow
  bow = createSprite(560,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  redB=new Group();
  blueB=new Group();
  greenB=new Group();
  pinkB=new Group();
  arrowGroup=new Group();

  winSign = createSprite(200,200,400,400);
    winSign.addImage(win);
    winSign.scale = 1.6;
    winSign.visible = false;
  
 
}

function draw() {
  // moving ground
    background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY

  if(keyDown("LEFT_ARROW"))
  bow.x-=2;
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    var temp_arrow = createArrow();
    temp_arrow.addImage(arrowImage);
    temp_arrow.y = bow.y;
    
    
  }

  

  
  var select_balloon = Math.round(random(1,4));
  console.log(select_balloon)
  
  if (World.frameCount % 80 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }
  
  if(arrowGroup.isTouching(redB)){
    redB.destroyEach();
    arrowGroup.destroyEach();
    score=score+1;
  }
  
  if(arrowGroup.isTouching(blueB)){
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score=score+2;
  }
  
  if(arrowGroup.isTouching(greenB)){
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score=score+3  ;
  }
  
  if(arrowGroup.isTouching(pinkB)){
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score=score+4;
  }

  if(bow.isTouching(redB) || bow.isTouching(blueB) || bow.isTouching(greenB) || bow.isTouching(pinkB)){
    bow.x=560;
    bow.y=220;
    die.play();



  }

  if(bow.isTouching(mindStone)){
    winSign.visible=true;
    background.velocityX=0;
    background.velocityY=0;
  }
  
  
  
  
  
  
  drawSprites();
  textSize(26)
  text("Score: "+score,270,30);

  if(score>10){
    barrier = createSprite(20,20,30,1000);
    redB.bounceOff(barrier);
    blueB.bounceOff(barrier);
    greenB.bounceOff(barrier);
    pinkB.bounceOff(barrier);
    
  }

  
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.scale = 0.3;
  red.lifetime=100;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.scale = 0.4;
  blue.lifetime=100;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.scale = 0.5;
  green.lifetime=100;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.scale = 0.5;
  pink.lifetime=100;
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
   arrow= createSprite(480, 100, 5, 10);
   arrow.velocityX = -6;
   arrow.scale = 0.3;
   arrow.lifetime=100;
   arrowGroup.add(arrow);
   return arrow;
}

