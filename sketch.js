var path, boy, cash, diamonds, jwellery, sword , ruby;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg,rubyImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG,rubyG, swordGroup;
var PLAY = 1;
var END = 0;
var gamestate = 1;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  rubyImg=loadImage("ruby.png")
  endImg = loadAnimation("gameOver.png");
}

function setup() {
  createCanvas(400, 400);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  rubyG=new Group();
  swordGroup = new Group();
  gamestate = PLAY;
}

function draw() {

  background(0);
  boy.x = World.mouseX;

  edges = createEdgeSprites();
  boy.collide(edges);

  //code to reset the background
  if (path.y > 400) {
    path.y = height / 2;
  }

  createCash();
  createDiamonds();
  createJwellery();
  createSword();
  createRuby();
  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection = treasureCollection + 50;
  } else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection = treasureCollection + 150;
  } else if (jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasureCollection = treasureCollection + 250;
  } else if (swordGroup.isTouching(boy)) {
      gamestate = END;
    } else 
      if (rubyG.isTouching(boy)){
        rubyG.destroyEach();
        treasureCollection = treasureCollection + 300;
      }
     
   

  if (gamestate === END) {
    End_Game();
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 200;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 140;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 300;
    swordGroup.add(sword);
  }
}
function createRuby(){
  if(World.frameCount%200==0){
    var ruby=createSprite(Math.round(random(50,350),40,10,10));
    ruby.addImage(rubyImg);
    ruby.scale=0.08;
    ruby.velocityY=3;
    ruby.lifetime=300;
    rubyG.add(ruby);
  }
}

function End_Game() {
  path.velocityY = 0;
  jwelleryG.destroyEach();
  diamondsG.destroyEach();
  cashG.destroyEach();
  swordGroup.destroyEach();
  rubyG.destroyEach();
  boy.addAnimation("SahilRunning", endImg);
  boy.scale = 1;
  boy.x = 200;
  boy.y = 200;
}