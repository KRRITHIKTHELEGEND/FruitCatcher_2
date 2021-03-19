var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var score = 0;
var distance = 0;
var database;
var fruit, fruitGroup, fruit1, fruit2, fruit3, fruit4, fruit5;
var form, player, game;
var player1score = 0;
var player2score = 0;
var cars, car1, car2;

var track, car1_img, car2_img;

function preload(){
  track = loadImage("jungle.jpg");
  car1_img = loadImage("basket.png");
  car2_img = loadImage("basket.png");
  fruit1 = loadImage("apple2.png");
  fruit2 = loadImage("banana2.png");
  fruit3 = loadImage("melon2.png");
  fruit4 = loadImage("orange2.png");
  fruit5 = loadImage("pineapple2.png");
  //ground = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  fruitGroup = new Group();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
