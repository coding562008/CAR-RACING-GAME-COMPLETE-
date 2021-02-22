class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value",(data)=>{
            gameState = data.val()
        })
    }

    update(state){
       database.ref("/").update({gameState:state}) 
    }

   async start(){
       if(gameState === 0){
           player = new Player()
           var playerCountRef = await database.ref("playerCount").once("value")
           if(playerCountRef.exists()){
               playerCount = playerCountRef.val()
               player.getCount()
           }
           form = new Form()
           form.display()
       }

       car1 = createSprite(100,200)
       car1.addImage(car1Img)
       car2 = createSprite(300,200)
       car2.addImage(car2Img)
       car3 = createSprite(500,200)
       car3.addImage(car3Img)
       car4 = createSprite(700,200)
       car4.addImage(car4Img)

       cars = [car1,car2,car3,car4]
       finishedPoint = false;
   }

   play(){
       form.hide()
       Player.getPlayerInfo()
       player.getFinishedPlayers()
       if(allPlayers !== undefined){
          
            background(85)
            image(trackImg,0,-displayHeight * 4,displayWidth,displayHeight * 5)
            var index = 0;
            var x = 175;
            var y 
           //var position = 100;
           for(var plr in allPlayers){
           
            index += 1;
            x += 250;
            y = displayHeight - allPlayers[plr].distance
            cars[index-1].x = x
            cars[index-1].y = y
            if(index === player.index){
                fill("red")
                stroke(10)
                ellipse(x,y,80,80)
                camera.position.x = displayWidth / 2;
                camera.position.y = cars[index-1].y;
            }
            //position = position + 20;
            fill("yellow")
            textSize(25);
            textAlign(CENTER)
            text(allPlayers[plr].name,cars[index-1].x, cars[index-1].y + 70)

            
           }

       }
       if(keyDown(UP_ARROW) && player.index !== null && finishedPoint !== true){
           player.distance += 10;
           player.update()
       }

       if(player.distance > 4300 && finishedPoint === false){
           finishedPoint = true;
           Player.updateFinishedPlayers()
           player.rank = finishedPlayers;
           player.update()
       }
      drawSprites()
   }

   displayRank(){
       console.log("BUND KARO")
       camera.position.y = 0;
       camera.position.x = 0;
       imageMode(CENTER)
       image(bronzeImg, -displayWidth/4, displayHeight/9-100, 200, 240)
       image(silverImg, displayWidth/4, displayHeight/10-100, 220, 270)
       image(goldImg, 0, -100, 250, 300)
       
       Player.getPlayerInfo()
       textSize(40)
       fill("gold")
       textAlign(CENTER)
       for(var plr in allPlayers){
           if(allPlayers[plr].rank === 1){
               text("1st : "+allPlayers[plr].name,0,85)
           }
           else if(allPlayers[plr].rank === 2){
               text("2nd : "+allPlayers[plr].name,displayWidth/4, displayHeight/10 + 85)
           }
           else if(allPlayers[plr].rank === 3){
               text("3rd : "+allPlayers[plr].name, -displayWidth/4, displayHeight/9 + 85)
           }
            else{
                textSize(22.5)
                text("!NIKAL! : "+allPlayers[plr].name, 0, 255)
            }
                
       }
   }
   
}