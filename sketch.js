var database;
var playerCount;
var gameState=0;
var allPlayers;
var form;
var game;
var player;
var car1,car2,car3,car4,cars;
var car1Img,car2Img,car3Img,car4Img;
var trackImg;
var goldImg,silverImg,bronzeImg;
var finishedPlayers,finishedPoint;


function preload(){
    car1Img = loadImage("images/car1.png")
    car2Img = loadImage("images/car2.png")
    car3Img = loadImage("images/car3.png")
    car4Img = loadImage("images/car4.png")
    trackImg = loadImage("images/track.jpg")
    goldImg = loadImage("images/gold.png")
    silverImg = loadImage("images/silver.png")
    bronzeImg = loadImage("images/bronze.png")

}

function setup(){
    createCanvas(displayWidth - 20,displayHeight - 30);
    database = firebase.database()
    game = new Game()
    game.getState()
    game.start()

    }

function draw(){
    
    if(playerCount === 4){
        game.update(1)
    }
    if(gameState === 1){
        clear()
        game.play()
    }
    if(finishedPlayers === 4){
        gameState = 2
    }
    if(gameState === 2){
        game.displayRank()
     }
  
  
}


