
let points = [[-1.5, 8.2], [0.5, 9.7], [2.8, 10.3], [4.2, 7.6], [3.1, -1.2], [2.8, -4.5], [2.3, -7.9], [3.6, -6.8], [-5.7, -6.4], [-4.9, -5.1], [-4.2, -3.9], [-1.8, 3.9], [-3.4, 6.2], [-3.1, 8.5], [-1.5, 8.2]];
var fill_colors = "FF0000-FFA500-800080-000080-FFFF00".split("-").map(a=>"#"+a);
var stroke_colors = "F39C12-1ABC9C-E67E22-581845-2980B9".split("-").map(a=>"#"+a)
var score

function preload() {
  rocket_sound  = loadSound("sound/rocket.wav")
  bullet_sound = loadSound("sound/bullet.wav")
  

}


var ball
var balls = []
var bullet    
var bullets = []
var monster
var monsters = []
var score = 0
var shipP

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)

  for(var j = 0;j<50;j=j+1)
  {
    ball = new Obj({})
    balls.push(ball)
  }
  for(var j = 0;j<30;j=j+1)
  {
    monster = new Monster({})
    monsters.push(monster)
  }
}


function draw() {
  background(220);
  // for(var k = 0;balls.length; k = k +1){
  //   ball = balls[k]
  //   ball.draw()
  //   ball.update()
  // }
  if (keyIsPressed){
    if (key == "ArrowLeft"|| key == "a"){
      shipP.x = shipP.x-5
  
    }
    if (key == "ArrowRight" || key == "d"){
      shipP.x = shipP.x+5
  
    }
    if (key == "ArrowUp" || key == "w"){
      shipP.y = shipP.y-5
  
    }
    if (key == "ArrowDown"|| key == "s"){
      shipP.y = shipP.y+5
  
    
    }
  }
  for(let ball of balls){
    ball.draw()
    ball.update()

    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y))
      {
        score = score + 1
        rocket_sound.play()
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
      }
    }
  }

  for(let bullet of bullets){
    bullet.draw()
    bullet.update()
  }
  
  for(let monster of monsters){
    if(monster.IsDead && monster.timenum>=6){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()

    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y))
      {
        score = score +1
        // rocket_sound.play()
        // monsters.splice(monsters.indexOf(monster),1)
        monster.IsDead = true
        bullets.splice(bullets.indexOf(bullet),1)
      }
    }
  
  }


  textSize(50)
  text(score,50,50)
  push()
    let dx = mouseX-width/2
    let dy = mouseY-height/2
    let angle = atan2(dy,dx)

    // translate(width/2,height/2)
    translate(shipP.x,shipP.y)// 砲台位置
    rotate(angle)
    noStroke()
    fill("#ffc03a")
    ellipse(0,0,65)
    fill("#ff000")
    triangle(50,0,-25,-25,-25,25)
  pop()

}

function mousePressd() {
  // 按下滑鼠產生一個物件
  // ball = new Obj ({   
  //   p:{ x: mouseX, y: mouseY}
  // })
  // balls.push(ball)
  // ---------------------------------------
//   for(let ball of balls){
//     if(ball.isBallInRanger()){
//       score = score + 1

//       balls.splice(balls.indexOf(ball),1)
//     }
//   }


bullet = new Bullet({})
bullets.push(bullet)
bullet_sound.play()

}
function keyPressed(){
  if(key==" "){
    bullet = new Bullet({})
    bullets.push(bullet)
    bullet_sound.play() 
  }

  if (score >= 20) {
    background(0); 
    textSize(60);
    fill(255);
    textAlign(CENTER);
    text("Game Over", width/2, height/2);
    noLoop(); 
  }
}
