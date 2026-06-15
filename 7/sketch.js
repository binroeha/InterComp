let cell = [];
let flash = 0;
let RandomColors = ['#fff983','#8cff8e','#ffb073','#8ad2ff','#f6a3ff','#ff92ab']

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function mousePressed() {
    cell.push(new Cell(mouseX, mouseY));
  }

function keyPressed() {
	  if (key === ' ') {
    cell = [];
	flash = 255;
	}

  
}

function draw() {
  background(0,50);
  for (let i=0; i<cell.length; i++) {
    if (cell[i].isDone() == true) {
      cell.splice(i,1);}
      else{
    cell[i].show();
    cell[i].update();

    if (cell[i].shouldSplit()) {
      cell.push(cell[i].split());
    }

    if (cell[i].isDone()) {
      cell.splice(i,1);
    } else {
      cell[i].show();
    }
  }
}
displayWarning();
	if (flash > 250) {
    fill(255, flash); 
    noStroke();
    rect(0, 0, width, height); 
    flash -= 0.2; 
  }
	else if (0<flash <= 250) {
		fill(255, flash); // 
    noStroke();
    rect(0, 0, width, height); 
    flash -= 2;}

}



function displayWarning() {
  let count = cell.length;
  if (count >1600) {
    push();
    fill(255, 255, 255);
    stroke(255,0,0);
    strokeWeight(14);
    textSize(40);
    textAlign(CENTER, CENTER); 
    textStyle(BOLD);
    text(`⚠️\nWARNING!\nToo Many Mutations!\nPress SPACE to Terminate!`, width / 2, height /2);
    pop();  
  }
}


class Cell {
  constructor(x,y,c) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.d = 10;
    this.color = random(RandomColors);


    this.px = this.x;
    this.py = this.y; //원들이 보이는 게 맘에 안 드니까 px,py를 만들어 
    // 이전 위치를 저장해서 선으로 연결해보자   

    this.age = 0;
    this.splitInterval = 50;
    this.nextSplit = this.splitInterval;
  }

  show() {
    stroke(this.color);
    strokeWeight(8);
    fill(random(RandomColors));
    line(this.px, this.py, this.x, this.y);
  }

  update() {
    this.age +=1;
    this.px = this.x;
    this.py = this.y; //업데이트 전에 이전 위치 저장

    this.x += this.dx;
    this.y += this.dy;
    
    this.d *= random(0.998, 0.999);
    this.dx += random(-0.2,0.2);
    this.dy += random(-0.2,0.2);
  }

  shouldSplit() {
    if (this.age >= this.nextSplit) {
      this.nextSplit += this.splitInterval;
      return true;
    }
    return false;
  }

  split() {
    let newColor = random(RandomColors);
    let child = new Cell(this.x, this.y, newColor);
    child.dx = this.dx + random(-0.2, 0.2);
    child.dy = this.dy + random(-0.2, 0.2);
    child.d *= random(0.998, 0.999);
    child.px = this.x;
    child.py = this.y;
    return child;
  }

  isDone() {
    if (this.x>width || this.x<0 || this.y>height || this.y< 0) {
      return true;
    } else {
      return false;
    }
  }
}