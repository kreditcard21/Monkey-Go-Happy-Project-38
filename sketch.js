var gamestate;
var PLAY = 1;
var END = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var food, foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


gamestate = PLAY;
function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300, 350, 1000, 10);
  
  ground.x = ground.width/2
 
  foodGroup = new Group();
  obstacleGroup = new Group();
}



function draw(){
  background("white");
  
  if(gamestate === PLAY){
    ground.velocityX = -4;
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    
    
    
      for(var i=0; i<foodGroup.length; i++){
        if(foodGroup[i].isTouching(monkey)){
          foodGroup[i].destroy();
          score =score+1
      }
    }
    
    spawnObstacles();
    spawnFood();
    
    if(obstacleGroup.isTouching(monkey)){
      gamestate = END;
   
      
    }
    var index=0;
    var x;
    var y=100;
    if(index===monkey.index){
      camera.position.x=displayWidth/2;
      camera.position.y=monkey.y;
      

  }

  }
  
  else if(gamestate === END){
    monkey.velocityY = 0;
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    ground.lifetime = -1;
    ground.velocityX = 0;
  }
  stroke("black");
    textSize(20);
    fill("black");
    text("Score: " + score, 400, 100);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time: " + survivalTime, 400, 50);
  monkey.collide(ground);
  
  
  
  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    food = createSprite(600, 200, 20, 20);
    food.velocityX = -6;
    food.addImage("food", bananaImage); 
    food.scale = 0.1;
    food.x = Math.round(random(10, 550));
    foodGroup.add(food);
    food.lifetime = 100;
  }

}

function spawnObstacles(){
  if(frameCount % 300 ===0){
    obstacle = createSprite(600, 330, 100, 100);
    obstacle.velocityX = -6;
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 100;
  }
}