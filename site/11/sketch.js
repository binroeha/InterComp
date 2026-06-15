let particles = [];
let targets = [];
let inputStr = '';
let isFiring = false;
let launchIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('sans-serif');
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  window.focus();
}

function draw() {
  background(0);

  drawCannon();

  if (isFiring && launchIndex < targets.length) {
    let burstSize = 25; 
    for (let i = 0; i < burstSize; i++) {
      if (launchIndex < targets.length) {
        let t = targets[launchIndex];
        particles.push(new Bullet(60, height / 2, t.x, t.y, t.ch));
        launchIndex++;
      }
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
  }

  drawUI();
}

function keyTyped() {
  if (keyCode === ENTER) {
    if (inputStr.length > 0) {
      resetForNewFire();
      let multilineWord = inputStr.toUpperCase().replace(/ /g, '\n');
      generateTargets(multilineWord);
      inputStr = ''; 
    }
    return false;
  } else {
    if (key.length === 1 && inputStr.length < 30) {
      inputStr += key;
    }
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    inputStr = inputStr.substring(0, inputStr.length - 1);
  }
}

function resetForNewFire() {
  particles = [];
  targets = [];
  launchIndex = 0;
  isFiring = false;
}

function generateTargets(word) {
  let pg = createGraphics(width, height);
  pg.pixelDensity(1); 
  pg.background(0);
  pg.fill(255);
  
  let lineCount = (word.match(/\n/g) || []).length + 1;
  let dynamicSize = height / (lineCount * 1.5);
  if (dynamicSize > height * 0.3) dynamicSize = height * 0.3;

  pg.textSize(dynamicSize); 
  pg.textAlign(CENTER, CENTER);
  pg.textStyle(BOLD);
  pg.textLeading(dynamicSize * 1.1); 
  pg.text(word, width / 2, height / 2);
  pg.loadPixels();

  let gap = 6; 
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      let index = (x + y * width) * 4;
      if (pg.pixels[index] > 128) {
        targets.push({ 
          x: x, 
          y: y, 
          ch: random(word.replace(/\n/g, '').split('')) 
        });
      }
    }
  }
  pg.remove();
  shuffle(targets, true);
  isFiring = true;
}

class Bullet {
  constructor(startX, startY, targetX, targetY, ch) {
    this.pos = createVector(startX, startY);
    this.target = createVector(targetX, targetY);
    this.ch = ch;
    this.vel = createVector(random(25, 50), random(-35, 35));
    this.acc = createVector(0, 0);
    this.maxSpeed = random(20, 35); 
    this.maxForce = 2.5; 
    this.arrived = false;
  }

  update() {
    if (!this.arrived) {
      let desired = p5.Vector.sub(this.target, this.pos);
      let d = desired.mag();

      if (d < 1.5) { 
        this.arrived = true;
        this.pos = this.target.copy();
      } else {
        let speed = this.maxSpeed;
        if (d < 100) speed = map(d, 0, 100, 2, this.maxSpeed);
        
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        this.acc.add(steer);
      }

      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }


  show() {
    if (this.arrived) {
      // 박혀 있는 글자
      fill(255, 220);
      noStroke();
      textSize(12); // 크기를 날아다닐 때와 동일하게 맞춤 (원하는 크기로 조정 가능)
      text(this.ch, this.pos.x, this.pos.y);
    } else {
      // 날아가는 글자
      fill(255);
      noStroke();
      textSize(12); // 도착했을 때와 동일한 크기
      // line(...) 코드를 삭제하여 잔상 꼬리를 없앰
      text(this.ch, this.pos.x, this.pos.y);
    
  
}
  }
}

function drawCannon() {
  push();
  fill(60);
  rect(0, height / 2 - 30, 60, 60);
  fill(210, 85, 20);
  ellipse(60, height / 2, 50, 50);
  pop();
}

function drawUI() {
  push();
  fill(255, 200);
  textAlign(CENTER);
  textSize(24);
  text(inputStr, width / 2, height - 60);
  textSize(14);
  fill(150);
  text("USE SPACE FOR LINE BREAKS AND PRESS ENTER", width / 2, height - 30);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}