class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("basket_1",car1_img);
    //car1.scale = 0.25;
    car2 = createSprite(300,200);
    car2.addImage("basket_1",car2_img);
    //car2.scale = 0.25;
    cars = [car1, car2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(0,0,0));
      image(track, 0,0,displayWidth, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 700 ;
      var x;

      text(allPlayers.player1.score, 10, 10);
      text(allPlayers.player2.score, 100, 100);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x = 500-allPlayers[pls].distance;
        y = 500;
        //position the cars a little away from each other in x direction
        /*y = y + 0;
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;*/
        cars[index-1].y = y;
        cars[index-1].x = x;
       // console.log(index, player.index)

       
        if (index === player.index){
          textSize = 25;
          text(allPlayers[plr].name, x-25, y+25);
          /*stroke(10);
          fill("black");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x*/
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -= 10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance += 10
      player.update();
    }

    if(frameCount % 60 === 0) {
      fruit = createSprite(random(100,1000), 0, 100, 100);
      fruit.velocityY = random(4,7);
      var rand = Math.round(random(1,5));
      switch(rand) {
        case 1 : fruit.addImage("apple", fruit1);
        break;
        case 2 : fruit.addImage("banana", fruit1);
        break;
        case 3 : fruit.addImage("melon", fruit1);
        break;
        case 4 : fruit.addImage("orange", fruit1);
        break;
        case 5 : fruit.addImage("pineapple", fruit1);
        break;
      }
      fruitGroup.add(fruit)
    }

    if (player.index !== null) {
      for (i = 0; i < fruitGroup.length; i++) {
        if(fruitGroup.get(i).isTouching(players)) {
          fruitGroup.get(i).destroy();
          player.score = player.score + 1;
          player.update;
        }
      }
    }
   
    drawSprites();
  }

  end(){
    console.log("GaMe oOoOoVeR");
  }
}
