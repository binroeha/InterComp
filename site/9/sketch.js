let capture;
let prevFrame;

let dots = [];
let history = [];
let dotSize = 15;
let cols, rows;

function setup() {
  let winHeight = windowWidth * 240 / 320;
  createCanvas(windowWidth, winHeight);
  noStroke();

  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();

  prevFrame = createImage(320, 240);

  cols = ceil(width / dotSize);
  rows = ceil(height / dotSize);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * dotSize;
      let y = j * dotSize;
      let c = color(0);
      dots.push(new Dot(x, y, c));
    }
  }
}

function getColor(x, y) {
  let cx = floor(map(x, 0, width, 0, capture.width));
  let cy = floor(map(y, 0, height, 0, capture.height));
  cx = constrain(cx, 0, capture.width - 1);
  cy = constrain(cy, 0, capture.height - 1);
  
  let index = (cx + cy * capture.width) * 4;
  let r = capture.pixels[index];
  let g = capture.pixels[index + 1];
  let b = capture.pixels[index + 2];
  return color(r, g, b);
}

function draw() {
  background(0);

  capture.loadPixels();
  prevFrame.loadPixels();

  for (let i = history.length - 1; i >= 0; i--) {
    let h = history[i];
    h.x -= 6;
    fill(h.c);
    rect(h.x, h.y, dotSize, dotSize);
	  
    if (h.x < -dotSize) {
      history.splice(i, 1);
    }
  }

  for (let cdot of dots) {
    cdot.update();
    cdot.show();
    
    if (cdot.isMoving()) {
      history.push({
        x: cdot.x,
        y: cdot.y,
        c: cdot.c
      });
    }
  }

  prevFrame.copy(capture, 0, 0, capture.width, capture.height, 0, 0, capture.width, capture.height);
}

class Dot {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.h = 1; 
  }

  show() {
    fill(this.c);
    rectMode(CENTER);
    rect(this.x, this.y, dotSize, this.h);
  }

  update() {
    this.c = getColor(this.x, this.y);

    if (this.isMoving()) {
      this.h = dotSize; 
    } else {
      if (this.h >= 2) this.h -= 1; 
    }
  }

  isMoving() {
    let cx = floor(map(this.x, 0, width, 0, capture.width));
    let cy = floor(map(this.y, 0, height, 0, capture.height));
    cx = constrain(cx, 0, capture.width - 1);
    cy = constrain(cy, 0, capture.height - 1);

    let index = (cx + cy * capture.width) * 4;
    
    let r = capture.pixels[index];
    let g = capture.pixels[index + 1];
    let b = capture.pixels[index + 2];
    
    let pr = prevFrame.pixels[index];
    let pg = prevFrame.pixels[index + 1];
    let pb = prevFrame.pixels[index + 2];

    let distance = dist(r, g, b, pr, pg, pb);

    return distance > 60;
  }
}