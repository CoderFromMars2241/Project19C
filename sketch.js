var towerImg, tower;
var doorImg, door, doorsGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("water.jpg");
  doorImg = loadImage("lifeguard-icon-9.png");
  ghostImg = loadImage("Frog2.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  invisibleBlockGroup=new Group();

  ghost=createSprite(200,200,50,50);
  ghost.scale=0.05;
  ghost.addImage("ghost", ghostImg);
 
}

function draw() {
  background(0);

  if(gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }

    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }

    if(keyDown("space")){
      ghost.velocityY=-10;
    }

    ghost.velocityY=ghost.velocityY+0.8;

    if(doorsGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600||ghost.y<0){
      ghost.destroy();
      gameState="end";
    }

    spawnDoors();
    drawSprites();
  }
  
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
    
  }
 
}

function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50,50,50);
    door.scale=0.1;
    door.addImage(doorImg);
    
    
    

    var invisibleBlock = createSprite(200,-50,50,50);
    invisibleBlock.visible=false;
    invisibleBlock.scale=1.4;
   
    

    door.x=Math.round(random(120,400));
    door.velocityY=1;


    invisibleBlock.x=door.x;
    invisibleBlock.velocityY = 1;

    door.lifetime=800;

    invisibleBlockGroup.lifetime=800;

    ghost.depth=door.depth;
    ghost.depth+=1

    doorsGroup.add(door);

    
    invisibleBlockGroup.add(invisibleBlock);
  }
}
