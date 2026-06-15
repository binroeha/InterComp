let imgDay, imgNight;
let particles = [];

function preload() {
  imgDay = loadImage('day.png');
  imgNight = loadImage('night.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(30); 
  noStroke();
}

function draw() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    
    p.update();

    fill(p.c);
    ellipse(p.pos.x, p.pos.y, p.d, p.d);

    if (p.isDead() || p.lifespan < 0) {
      particles.splice(i, 1);
    }
  }
  drawingContext.letterSpacing = '-1.5px';
  textFont('Helvetica', 30);
  textStyle(BOLD);
  
  stroke(0);         
  strokeWeight(7);   
  fill(255);        
  textAlign(LEFT, TOP);
  text("Left Click to paint it day", 20, 20);

  stroke(255);     
  strokeWeight(7);  
  fill(0);           
  textAlign(RIGHT, TOP);
  text("Right Click to paint it night", width - 20, 20);
  noStroke();
}

function mousePressed() {
  let targetImg;
  
  if (mouseButton === LEFT) {
    targetImg = imgDay;
  } else if (mouseButton === RIGHT) {
    targetImg = imgNight;
  }

  if (targetImg) {
    for (let i = 0; i < 600; i++) {
      particles.push(new WaterSplash(mouseX, mouseY, targetImg));
    }
  }
}

function mouseReleased() {
  return false;
}

document.oncontextmenu = function() { return false; }

class WaterSplash {
  constructor(_x, _y, _img) {
    this.pos = createVector(_x, _y);
    this.vel = p5.Vector.random2D().mult(random(2, 8));
    this.d = random(5, 15);
    this.img = _img;
    this.lifespan = 300;
    
    this.c = this.collectColor(this.pos.x, this.pos.y);
  }

  collectColor(x, y) {
    let ix = map(x, 0, width, 0, this.img.width);
    let iy = map(y, 0, height, 0, this.img.height);
    return this.img.get(ix, iy);
  }

  update() {
    this.vel.mult(0.99); 
    
    this.pos.add(this.vel);
    this.d *= 0.99;
    this.lifespan -= 1;

    this.c = this.collectColor(this.pos.x, this.pos.y);
  }


  isDead() {
    return (this.d < 0.0001 || this.lifespan < 0 || 
            this.pos.x < 0 || this.pos.x > width || 
            this.pos.y < 0 || this.pos.y > height);
  }
}