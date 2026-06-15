let JaeumCols = ['#64F58D', '#8bdcd6', '#99B2DD', '#8D80AD', '#c56e63', '#ff82e6', '#7a5ae2', '#FF87AB', '#d7968e'];
let MoeumCols = ["#a75cbc", "#6ecdaf", "#d8e976", "#ebbf6f", "#F79F79"];
let BackCols = ["#DEDBD8", "#D8FFDD", "#ffead8", "#cffcd3", "#ffefd4", '#E5E7E6', '#F6CACA'];

let wd = 200;
let cols, rows;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	rectMode(CENTER);
	noLoop();

	cols = ceil(width / wd); //정확한 갯수는 높이/칸간격
	rows = ceil(height / wd);

	drawPattern();

	// for (let x = w / 2; x < width + 1000; x += w) {
	// 	for (let y = w / 2; y < height + 1000; y += w) {
	// 		drawRect(x, y, w);
	// 		drawPetals(x, y, w);
	// 	}
	// }
}

function mousePressed() {
	drawPattern();
}

function drawPattern() {
	for (let col = 0; col<cols; col++) {
		for (let row = 0; row <rows; row++) {
			let x = col*wd;
      let y = row * wd;
      drawRect(x,y,wd);
      drawTop(x,y,wd);
			drawMid(x, y, wd);
      drawBot(x, y, wd);
		}
	}
}


function drawRect(x, y, w) {
	push();
	translate(x, y);
	fill(random(BackCols));
	rect(0, 0, w);
	pop();

}


function drawTop(x, y, wd) {
	push();
	translate(x-wd/4, y-wd/4);
  let num = int(random(5));
  if (num == 4) {
    drawGiyeok(0, 0, wd/2);
  } else if (num == 3) {
    drawNieun(0, 0, wd/2);
  } else if (num == 2) {
    drawDigeud(0, 0, wd/2);
  } else if (num == 1) {
    drawMieum(0, 0, wd/2);
  }  else if (num == 0) {
      drawSiot(0, 0, wd/2);
    }
	pop();

}



function drawBot(x, y, wd) {
	push();
	translate(x + wd/4, y + wd/4);
  let num = int(random(5));
  if (num == 4) {
    drawGiyeok(0, 0, wd/2);
  } else if (num == 3) {
    drawNieun(0, 0, wd/2);
  } else if (num == 2) {
    drawDigeud(0, 0, wd/2);
  } else if (num == 1) {
    drawMieum(0, 0, wd/2);
  }  else  if (num == 0) {
      drawSiot(0, 0, wd/2);
    }
	pop();
}


function drawMid(x, y, wd) {
	push();
	translate(x + wd/4, y - wd/4);
  let num = int(random(3));
  if (num == 2) {
    drawAa(0, 0, wd/2);
  } else if (num == 1) {
    drawEo(0, 0, wd/2);
  } else if (num == 0) {
    drawIe(0, 0, wd/2);
  }
	pop();
}


function drawGiyeok(x, y, wd) {
		push();
		translate(x, y);
		fill(random(JaeumCols));
		beginShape();
		vertex(-wd/2+wd/10, -wd/2+wd/10);
    vertex(wd/2-wd/10, -wd/2+wd/10);
    vertex(wd/2-wd/10, wd/2-wd/10);
    vertex(wd/2-wd/10-wd/5, wd/2-wd/10);
    vertex(wd/2-wd/10-wd/5, wd/5+wd/10);
    vertex(wd/2-wd/10-wd/5, -wd/2+wd/10+wd/5);
    vertex(-wd/2+wd/10, -wd/2+wd/5+wd/10);
    endShape()
		pop();
	}

function drawNieun(x, y, wd) {
  push()
  translate(x, y);
  fill(random(JaeumCols))  
  rotate(PI)
	beginShape();
		vertex(-wd/2+wd/10, -wd/2+wd/10);
    vertex(wd/2-wd/10, -wd/2+wd/10);
    vertex(wd/2-wd/10, wd/2-wd/10);
    vertex(wd/2-wd/10-wd/5, wd/2-wd/10);
    vertex(wd/2-wd/10-wd/5, wd/5+wd/10);
    vertex(wd/2-wd/10-wd/5, -wd/2+wd/10+wd/5);
    vertex(-wd/2+wd/10, -wd/2+wd/5+wd/10);
    endShape()
    pop()
	}

function drawDigeud(x, y, wd) {
		push();
		translate(x, y);
		fill(random(JaeumCols));
		beginShape();
		vertex(-wd/2+wd/10, -wd/2+wd/10);
    vertex(wd/2-wd/10, -wd/2+wd/10);
    vertex(wd/2-wd/10, -wd/2+wd/10+wd/5);
    vertex(-wd/2+wd/10+wd/5, -wd/2+wd/10+wd/5);
    vertex(-wd/2+wd/10+wd/5, wd/2-wd/10-wd/5);
    vertex(wd/2-wd/10, wd/2-wd/10-wd/5);
    vertex(wd/2-wd/10, wd/2-wd/10);
    vertex(-wd/2+wd/10, wd/2-wd/10);
    endShape()
    pop();
	}

function drawMieum(x, y, wd) {
		push();
		translate(x, y);
		fill(random(JaeumCols));
		beginShape();
		vertex(-wd/2+wd/10, -wd/2+wd/10);
    vertex(wd/2-wd/10, -wd/2+wd/10);
    vertex(wd/2-wd/10, wd/2-wd/10);
    vertex(-wd/2+wd/10, wd/2-wd/10,);
    endShape()
    pop();
	}


  function drawSiot(x, y, wd) {
		push();
		translate(x, y);
		fill(random(JaeumCols));
		beginShape();
		vertex(0, -wd/2+wd/10);
    vertex(wd/2-wd/10, wd/2-wd/10);
    vertex(wd/2-wd/10-wd/5, wd/2-wd/10);
    vertex(0, -wd/2+wd/5+wd/5);
    vertex(-wd/2+wd/10+wd/5, wd/2-wd/10);
    vertex(-wd/2+wd/10, wd/2-wd/10);
    endShape();
    pop();
	}

  function drawIe(x, y, wd) {
		push();
		translate(x, y);
		fill(random(MoeumCols));
		beginShape();
		vertex(wd/10, -wd/2+wd/10);
    vertex(wd/10, wd/2-wd/10);
    vertex(-wd/10, wd/2-wd/10);
    vertex(-wd/10, -wd/2+wd/10);
    endShape();
    pop();
	}

    function drawEo(x, y, wd) {
		push();
		translate(x, y);
		fill(random(MoeumCols));
		beginShape();
		vertex(wd/10, -wd/2+wd/10);
    vertex(wd/10, wd/2-wd/10);
    vertex(-wd/10, wd/2-wd/10);
    vertex(-wd/10, -wd/2+wd/10);
    endShape()
    beginShape()
    vertex(-wd/10, wd/10);
    vertex(-wd/2+wd/10, wd/10);
    vertex(-wd/2+wd/10, -wd/10);
    vertex(-wd/10, -wd/10);
    endShape();
    pop();
	}

    function drawAa(x, y, wd) {
		push();
		translate(x, y);
		fill(random(MoeumCols));
		beginShape();
		vertex(wd/10, -wd/2+wd/10);
    vertex(wd/10, -wd/10);
    vertex(+wd/2-wd/10, -wd/10);
    vertex(+wd/2-wd/10, +wd/10);
    vertex(wd/10, wd/10);
    vertex(wd/10, wd/2-wd/10);
    vertex(-wd/10, wd/2-wd/10);
    vertex(-wd/10, wd/2-wd/10);
    vertex(-wd/10, -wd/2+wd/10);
    endShape();
    pop();
	}



function draw() {

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	cols = ceil(width / wd) + 1;
	rows = ceil(height / wd) + 1;

	drawPattern();

}
