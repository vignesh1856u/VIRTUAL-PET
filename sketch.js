var dog,sadDog,happyDog, database;
var foodS,foodStock,lastfed,feed,fedTime;
var addFood;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

FedTime = databases.ref('feedTime');
FedTime.on("value",fuction(data){
  lastFed = data.val();
})

fill(255,255,254);
textSize(15);
if(lastFed >= 12) {
  text("Last Feed : " + lastFed %12 + "Pm", 350,30);

}
else if(lastFed == 0){
  text("Last Feed : 12Am", 350,30);
}
else{
  text("Last Feed : " + lastFed + "Am",350,30);
}
   
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
