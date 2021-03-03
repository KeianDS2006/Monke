var monkey , monkey_running;
var bananaImage, obstacleImage;
var FoodGroup, ObstacleGroup;
var score, ground;
var PLAY=1;
var END=0;
var gameState=PLAY;
var background1, backgroundImg;
var gameOver, gameOverImage;
function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png", "Monkey_10.png")
  monkey_stopped= loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImg = loadImage("jungle.jpg");
  gameOverImage=loadImage("gameOver.png")
}



function setup() {
  createCanvas(500,400);
  score=0;
  background1=createSprite(0,0,600,400);
  background1.addImage("movingBackground", backgroundImg);
  monkey=createSprite(40,345,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addImage("stopped", monkey_stopped);
  monkey.scale=0.15;
  ground=createSprite(40,350,100,20);
  ground.visible=false;
  FoodGroup=createGroup();
  ObstacleGroup=createGroup();
  gameOver=createSprite(200,200,300,100);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
  monkey.setCollider("circle",0,0,100);
  monkey.debug = true;
  
}


function draw() {
  background("turquoise");
  
  
  
  
  text("Score:"+score,450,10);
  if(gameState===PLAY){
  if(keyDown("space")&& monkey.y >= 270) {
        monkey.velocityY = -20;
      
    }
    if(background1.x<100){
    background1.x=500;
  }
    background1.velocityX=-3;
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  SpawnBananas();
  switch(score){
    case 10: monkey.scale=0.17;
    break;
    case 20: monkey.scale=0.19;
    break;
    case 30: monkey.scale=0.21;
    break;
    case 40: monkey.scale=0.22;
    break;
    default: break;
  }
  if(ObstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2;
  }
    drawSprites();
    stroke("white");
    fill("white");
    text("Score:"+score,450,10);
    SpawnObstacles();
  }
  else if(gameState===END){
    end();
  }
  
}

function SpawnBananas(){
  if (frameCount % 150 === 0) {
    var banana = createSprite(500,100,40,10);
    banana.y = Math.round(random(220,270));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    if(score%2==0&&score>=10){
      banana.velocityX=banana.velocityX+0.5;
    }
    
    //assign lifetime to the variable
    banana.lifetime = 125;
    FoodGroup.add(banana);
  }
}
function SpawnObstacles(){
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(500,365,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -4;
    if(score%2==0&&score>=10){
      obstacle.velocityX=obstacle.velocityX+0.5;
    }
    
    //assign lifetime to the variable
    obstacle.lifetime = 125;
    ObstacleGroup.add(obstacle);
  }
}
function end(){
  background(0);
  gameOver.visible=true;
}