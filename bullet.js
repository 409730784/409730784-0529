
class Bullet {
    constructor(args) {
      this.r = args.r || 10;
      this.p = args.p || shipP.copy();
      this.v = args.v || createVector(mouseX - width / 2, mouseY - height / 2).limit(10);
      this.color = args.color || "#FFC300"; // 設定為橘黃色 #FFC300
    }
  
    draw() {
      push();
      translate(this.p.x, this.p.y);
      fill(this.color);
      noStroke();
      beginShape();
      const angle = TWO_PI / 6;
      for (let i = 0; i < 6; i++) {
        const x = this.r * cos(i * angle);
        const y = this.r * sin(i * angle);
        vertex(x, y);
      }
      endShape(CLOSE);
      pop();
    }
  
    update() {
      this.p.add(this.v);
    }
  }