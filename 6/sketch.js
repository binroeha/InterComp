let colors = ['#00f5d4', '#00bbf9', '#fee440', '#f15bb5', '#9b5de5'];

let w = 50;
let maxw = 40;
let crossrects = [];
let cols, rows;
let steps =0;
let incr = 1;
let dir =1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  cols = ceil(width / w) + 1;
  rows = ceil(height / w) + 1;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
		let y = j * w;
		
      crossrects.push(new StarPattern(x, y, w));
    }
  }
}

function draw() {
  background(0);
  for (let star of crossrects) {
    star.update();
    star.show();
  }
	timer();
}

function timer() {
  steps += incr * dir;
  if (steps > w || steps < -w) {
    dir *= -1;
  }
}

class StarPattern {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = maxw;
    this.angle = 0;
    this.col = random(colors);
	  this.rRate = 0.2;
  }

  update() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    let maxdistance = dist(0, 0, width, height);
    this.w = map(distance, 0, maxdistance, maxw*2, 0);   
	  
    let speed = map(distance, 0, maxdistance, 0, 0.5); 
    this.angle += speed;
	  this.rRate = map(steps, -w, w, 0.1, 0.45)
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.col);
    
    this.drawStar(0, 0, this.w * 0.5, this.w * this.rRate,);
    pop();
  }

 drawStar(x, y, r1, r2) {
    let angle = 2*PI/5;
    let halfAngle = angle / 2;
    beginShape();

    for (let a = 0; a < 3*PI; a += angle) {
      let sx = x + cos(a) * r1;
      let sy = y + sin(a) * r1;
      curveVertex(sx, sy);
      
      let mx = x + cos(a + halfAngle) * r2 * 1.1; 
      let my = y + sin(a + halfAngle) * r2 * 1.1;
      curveVertex(mx, my);
    }
    endShape();
  }
}