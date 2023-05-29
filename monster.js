var monster_colors = "F39C12-1ABC9C-E67E22-581845-2980B9".split("-").map(a=>"#"+a);


class Monster{
    constructor(args){
        // this.p = args.p || {x: random(width), y:random(height)}
        this.r = args.r || random(30,60)
        this.p = args.p || createVector(random(width),random(height) )
        this.v = args.v || createVector(random(-1,1),random(-1,1) )
        this.color =args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
        this.IsDead = false 
        this.timenum = 0

    
      }
      draw() {
        if (this.IsDead == false) {
          push();
          translate(this.p.x, this.p.y);
          fill(this.color);
          noStroke();
          ellipse(0, 0, this.r);
      
          if (this.mode == "happy") {
            fill(255);
            ellipse(0, 0, this.r / 2);
            fill(0);
            ellipse(0, 0, this.r / 3);
          } else {
            fill(this.color);
            beginShape();
            var angle = 0;
            var eyeOffset = this.r / 6; 
            var mouthOffset = this.r / 6; 
            for (var i = 0; i < 5; i++) {
              var x = cos(angle) * this.r / 2;
              var y = sin(angle) * this.r / 2;
              vertex(x, y);
              angle += TWO_PI / 5;
              x = cos(angle) * this.r / 4 - eyeOffset; 
              y = sin(angle) * this.r / 4;
              vertex(x, y);
              angle += TWO_PI / 5;
            }
            endShape(CLOSE);
      
        
            fill(255, 0, 0);
            var eyeSize = this.r / 8;
            ellipse(-eyeOffset, 0, eyeSize);
            ellipse(eyeOffset, 0, eyeSize);
            rect(-mouthOffset, this.r / 4 - mouthOffset, mouthOffset * 2, mouthOffset / 2);
          }
      
          stroke(this.color);
          strokeWeight(5);
          noFill();
          for (var j = 0; j < 8; j++) {
            rotate(PI / 4);
            rect(this.r, -5, 20, 10);
          } 
        pop()
       }else{
            this.timenum = this.timenum + 5
            push()
                translate(this.p.x,this.p.y)
                fill(this.color)
                noStroke()
                ellipse(0,0,this.r)
                stroke(255)
                line(-this.r/3,0,this.r/3,0)
                stroke(this.color)
                strokeWeight(8)
                noFill();
                for (var j = 0; j < 8; j++) {
                  rotate(PI / 4);
                  triangle(this.r, 0, this.r + 10, -10, this.r + 10, 10)

                }


            pop()






       }
        
      }
      update(){
        this.p.add(this.v)
        if(this.p.x<0 || this.p.x>width)
        {
            this.v.x = -this.v.x
        }
        if(this.p.y<=0 || this.p.y>=height) 
        {
            this.v.y = -this.v.y
        }

      }
      isBallInRanger(x,y){
        let d = dist(x,y,this.p.x,this.p.y)
        if(d<this.r/2){
          return true
        }
        else{
          return false
        }
    
      }

}