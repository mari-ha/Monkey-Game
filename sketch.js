var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var food ,foodImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var gameOver, gameOverImage
var restart, restartImage


var survivalTime=0

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  foodImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
 
}



function setup() {
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400, 350, 900, 20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
  gameOver=createSprite(200, 150);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  
  restart=createSprite(200, 180);
  restart.addImage(restartImage);
  restart.scale=0.5;
  

  
}


function draw() {
  background ("lightblue");
  
  if(gameState === PLAY){
        gameOver.visible=false;
        restart.visible=false;
    survivalTime=survivalTime+Math.round(frameRate()/60)
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    }

    
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
      monkey.velocityY = monkey.velocityY + 0.8
  
      monkey.collide(ground);

  spawnFood();
  spawnObstacle();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  
  else if(gameState === END){
    gameOver.visible=true;
    restart.visible=true;
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    
  }
  
 if(mousePressedOver(restart)) {
      reset();    }

  drawSprites ();
  
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survivial Time: "+survivalTime, 120, 50);
  

  
}
function reset (){
      monkey.changeAnimation ("monkey", monkey_running);
      gameState = PLAY;
      obstacleGroup.destroyEach ();
      survivalTime=0;
  }
    
function spawnFood (){
  if (frameCount%80 === 0){
    var food = createSprite (400, 200, 20, 20);
    food.y=Math.round(random(120, 200));
    food.addImage(foodImage);
    food.velocityX=-4;
    food.lifetime=100;
    food.scale=0.1;
    
    foodGroup.add(food)
  }
}
function spawnObstacle (){
  if (frameCount%300 === 0) {
    var obstacle=createSprite(400,320,40,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4;
    obstacle.lifetime=100;
    obstacle.scale=0.1;
    
    obstacleGroup.add(obstacle);
  }
}







