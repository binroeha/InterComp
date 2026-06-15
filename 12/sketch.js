
let palette1 = ['#3C1518', '#69140E', '#A44200', '#D58936', '#FFC94F'];
let palette2 = ['#F5CCE8', '#EC9DED', '#C880B7', '#9F6BA0', '#4A2040'];
let palette3 = ['#EAEFBD', '#C9E3AC', '#90BE6D', '#EA9010', '#37371F'];

let allPalettes = [palette1, palette2, palette3];
let currentPaletteIndex = 0; 


let shapesConfig = [];


let flowfield = [];
let scl = 20; 
let cols, rows;
let t = 0; 
let off = 0.01; 

let worms = [];

let footprintCanvas;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 
  cols = floor(width / scl);
  rows = floor(height / scl);

  footprintCanvas = createGraphics(windowWidth, windowHeight);
  footprintCanvas.clear();
  footprintCanvas.noStroke();

  noStroke();
  
  currentPaletteIndex = floor(random(allPalettes.length));
  let currentPalette = allPalettes[currentPaletteIndex];

  initShapesConfig(currentPalette);

  for (let i = 0; i < shapesConfig.length; i++) {
    let config = shapesConfig[i];
    for (let c = 0; c < config.count; c++) {
      worms.push(new Worm(config));
    }
  }
  
  background(255); 
}

function draw() {
  background('rgba(255, 255, 255, 0.15)'); 

  flowfield = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let n = noise(x * off, y * off, t);
      let angle = map(n, 0, 1, 0, TWO_PI * 4);
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.08); 
      flowfield.push(v);
    }
  }
  t += off; 

  image(footprintCanvas, 0, 0); 

  for (let worm of worms) {
    worm.addForce(flowfield);
    worm.update();
    worm.edges();
    worm.showBody();
  }
}

function initShapesConfig(selectedPalette) {
  shapesConfig = [
    { sides: 0, size: 28, color: selectedPalette[0], moveStep: 40, count: 1 },  
    { sides: 3, size: 22, color: selectedPalette[1], moveStep: 40, count: 2 },  
    { sides: 4, size: 16, color: selectedPalette[2], moveStep: 40, count: 4 },  
    { sides: 5, size: 10, color: selectedPalette[3], moveStep: 40, count: 7 },  
    { sides: 6, size: 6,  color: selectedPalette[4], moveStep: 40, count: 12 } 
  ];
}

function mousePressed() {
  currentPaletteIndex = (currentPaletteIndex + 1) % allPalettes.length;
  let nextPalette = allPalettes[currentPaletteIndex];
  
  initShapesConfig(nextPalette);
  
  footprintCanvas.clear();
  background(255);
  
  let wormIndex = 0;
  for (let i = 0; i < shapesConfig.length; i++) {
    let config = shapesConfig[i];
    for (let c = 0; c < config.count; c++) {
      if (worms[wormIndex]) {
        worms[wormIndex].c = config.color;
        wormIndex++;
      }
    }
  }
}

function drawMainPolygon(x, y, radius, sides, rotation) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = map(i, 0, sides, 0, TWO_PI) + rotation; 
    let sx = x + cos(angle) * radius;
    let sy = y + sin(angle) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawCanvasPolygon(pg, x, y, radius, sides, rotation) {
  pg.beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = map(i, 0, sides, 0, TWO_PI) + rotation; 
    let sx = x + cos(angle) * radius;
    let sy = y + sin(angle) * radius;
    pg.vertex(sx, sy);
  }
  pg.endShape(CLOSE);
}

class Worm {
  constructor(config) {
    this.s = config.size;
    this.sides = config.sides;
    this.c = config.color;
    this.moveStep = config.moveStep; 
    
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.moveCount = 0; 
  }

  addForce(field) {
    let xx = floor(this.pos.x / scl);
    let yy = floor(this.pos.y / scl);
    
    if (xx >= 0 && xx < cols && yy >= 0 && yy < rows) {
      let index = xx + yy * cols;
      this.acc.add(field[index]);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(3); 
    this.pos.add(this.vel);
    this.acc.mult(0); 
    
    this.moveCount++;
    if (this.moveCount >= this.moveStep) {
      this.stamp(); 
      this.moveCount = 0; 
    }
  }

  edges() {
    if (this.pos.x > width)  this.pos.x = 0;
    if (this.pos.x < 0)      this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0)      this.pos.y = height;
  }

  showBody() {
    fill(this.c);
    let rotationAngle = this.vel.heading(); 
    
    if (this.sides === 0) {
      ellipse(this.pos.x, this.pos.y, this.s * 2);
    } else {
      drawMainPolygon(this.pos.x, this.pos.y, this.s, this.sides, rotationAngle);
    }
  }

  stamp() {
    footprintCanvas.fill(this.c);
    let rotationAngle = this.vel.heading();
    
    if (this.sides === 0) {
      footprintCanvas.ellipse(this.pos.x, this.pos.y, this.s * 2);
    } else {
      drawCanvasPolygon(footprintCanvas, this.pos.x, this.pos.y, this.s, this.sides, rotationAngle);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  footprintCanvas = createGraphics(windowWidth, windowHeight);
  footprintCanvas.clear();
  footprintCanvas.noStroke();
  background(255);
}