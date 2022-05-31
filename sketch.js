var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var restart, restartImg
var gameOver, gameOverImg
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  restartImg = loadImage("restart.png")
  gameOver = loadImage("gameover.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.3

  restart = createSprite(300,400)
  restart.addImage("restart", restartImg)
  restart.visible = false

  gameover = createSprite(300,300)
  gameover.addImage("restart", restartImg)
  gameover.visible = false

  doorsGroup = new Group()
  invisibleBlockGroup = new Group()
  climbersGroup = new Group()
}

function draw() {
  background(200);
  
  if(gameState === "play"){
  
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }

    if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
      ghost.destroy()
      gameState = "end"
    }
    if(keyDown("right")){
      ghost.x += 10
      }
    if(keyDown("left")){
      ghost.x -= 10
    }
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    if(keyDown("up")){
      spookySound.play()
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY +0.8
    

    if(tower.y > 400){
        tower.y = 300
      }
      createClimber()
      drawSprites()

    if(ghost.x <=0 || ghost.x >=600){
      ghost.x = 200
    }
    }
  if(gameState === "end"){
    fill("red")
    textSize(50)
    gameover.visible = true
    restart.visible = true
    
  }
}

function createClimber(){
  if(frameCount % 240 === 50){
   var door = createSprite(200,-50)
   door.addImage(doorImg)
   var climber = createSprite(200,10)
   climber.addImage(climberImg)
   var invisibleBlock = createSprite(200,20)
   invisibleBlock.width = climber.width
   invisibleBlock.height = 2

   door.x = Math.round(random(120,400))
   climber.x = door.x
   invisibleBlock.x = door.x

   door.velocityY = 1
   climber.velocityY = 1
   invisibleBlock.velocityY = 1

   door.lifetime = 600
   climber.lifetime = 600
   invisibleBlock.lifetime = 600

   doorsGroup.add(door)
   climbersGroup.add(climber)
   invisibleBlockGroup.add(invisibleBlock)

   door.depth = ghost.depth
   ghost.depth += 1

   invisibleBlock.visible = false
   invisibleBlock.collider
  }
} 

