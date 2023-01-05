// keyIsPressed function was learned from https://p5js.org/reference/#/p5/keyIsPressed
// refresh the page function was learned from https://www.youtube.com/watch?v=Okd0wlhWYVw
// the initial code structure was learned from https://www.youtube.com/watch?v=cXgA1d_E-jY
// the audios are from https://www.youtube.com/watch?v=JlaCLB2NiuA
// the logo and other elements were inspired by the game of "Kirby and the Forgotten Land"

var score = 0;
var highScore = 0;
var kirby;
var voice1;
var voice2;
var buildings = [];
var kirbyImg;
var kirbyJump;
var bgImg;
var buildingImg1;
var buildingImg2;
var bangImg;
var gasImg;
var logoImg;
var elem = document.documentElement;
// let url1 = "https://webspace.ocad.ca/~ellen.zhang/index2.html";
// let url2 = "https://webspace.ocad.ca/~ellen.zhang/index.html";

function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { 
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { 
      elem.msRequestFullscreen();
    }
  }

function preload(){
  kirbyImg = loadImage("img/1.png");
  kirbyJump = loadImage("img/2.png");
  bgImg = loadImage("img/bg.png");
  buildingImg1 = loadImage("img/buildingup.png");
  buildingImg2 = loadImage("img/buildingdown.png");
  bangImg = loadImage("img/bang.png");
  gasImg = loadImage("img/gas.png");
  logoImg = loadImage("img/logo.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    alert("Hello, welcome to the game called 'Flying Kirby' \nPlease press the space bar to help Kirby fly. \nHope you can get a higher mark, good luck! ˗ˋˏ ♡ ˎˊ˗");
    document.getElementById( "refresh" ).onclick = 
    function(){
        window.location.reload();
    }
    kirby = new Kirby();
    voice1 = createAudio("audio/1.wav");
    voice1.speed(2);
    voice2 = createAudio("audio/2.wav");
    // voice3 = createAudio("audio2/3.wav");
    buildings.push(new Building());
    highScore = getItem("highScore");
    if(highScore === null){
    highScore = 10;
    }
}

function Kirby(){
    this.x = 300;
    this.y = height/4;
    this.gravity = 0.3;
    this.velocity = 0;
    this.show = function(){
        if(keyIsPressed === true){
            image(kirbyJump, this.x, this.y, 100, 100);
            image(gasImg, this.x - 45, this.y+45, 50, 50); 
        }else{
            image(kirbyImg, this.x, this.y, 100, 100); 
        }
    }

    this.update = function(){
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.y > height){
            this.y = height-50;
            this.velocity = 0;
        }
    
        if(this.y < 0){
            this.y = 0;
            this.velocity = 0;
        }
    }

    this.up = function(){ 
        this.velocity = -5;
        voice1.stop();
        voice1.play();
    } 
}

function Building(){
    this.top = random(0, height-250);
    this.bottom = random(0, height-(this.top + 160));
    this.x = width;
    this.w = 100;
    this.speed = 3;

    this.show = function(){
        image(buildingImg1, this.x, 0, this.w, this.top);
        image(buildingImg2, this.x, height-this.bottom, this.w, this.bottom);
    }

    this.update = function(){
        this.x -= this.speed;
    }

    this.offscreen = function(){
        if(this.x < -this.w){
            return true;
        }else{
            return false;
        }
    }

    this.hits = function hitKirby(kirby){
        if(kirby.x + 80 >= this.x && kirby.x <= this.x + this.w){
            if(kirby.y< this.top || kirby.y + 90 > height-this.bottom){
                voice2.play();
                voice1.stop();
                return false;  
            }
        }
        return true;
    }
} 


  

function draw() {
    background(bgImg, 0, 0, windowWidth, windowHeight);

    for(var i = 0; i < buildings.length; i++){
        buildings[i].show();
        buildings[i].update();    

        if(buildings[i].hits(kirby)){
            console.log("hits");
        }

        if(buildings[i].hits(kirby) === true && kirby.x > buildings[i].x){
            score = buildings.length-3;
        }
        
        if(score > highScore){
            highScore = score;
            storeItem("highScore", highScore);
        }

        if(score % 4 == 0 && score != 0){
            fill("#F4A018");
            textSize(40);
            textFont('Comfortaa');
            text("Good Job! •͈ᴗ•͈", windowWidth/3, windowHeight/2); 
        }

        if(score % 9 == 0 && score != 0){
            fill("#F4A018");
            textSize(40);
            textFont('Comfortaa');
            text("Keep it up, Kirby! 〃'▽'〃", windowWidth/3, windowHeight/2);
        }
    }
    
    kirby.update();
    kirby.show();
   
    if(frameCount % 150 == 0){
        buildings.push(new Building()); 
    }
    
    for(var i = buildings.length-1; i >= 0; i--){
        if(buildings[i].hits(kirby) === false){
            noLoop();
            image(bangImg, kirby.x+30, kirby.y, 100, 100);
            fill("#F4A018");
            textSize(40);
            textFont('Comfortaa');
            text("Oops, Game over ˙ϖ˙", windowWidth/3, windowHeight/2); 
        }
    }
    
    fill("#1C59A1");
    textSize(25);
    textFont('Comfortaa');
    text("Score: "+ score, 50, 143);

    fill("#1C59A1");
    textSize(25);
    textFont('Comfortaa');
    text("High Score: "+ highScore, 50, 180);

    image(logoImg, 45, 30, 297, 66);
  }


function keyPressed(){
    if(key == ' '){
        kirby.up();
    }
}








  