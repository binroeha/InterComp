
let rad1 =0
let rad2 =0
let rad3 =0


function setup() {
  createCanvas(windowWidth,windowHeight);
  x = width/2;
  y = height/2;
}


function draw() {
  background('#17BEBB');
  noStroke();


  for(let x=0; x<=2000; x+=200) {
    for(let y=0; y<=1000; y+=200) {

    push();
    translate(x,y);
    rotate(rad2);


    scale(2.5)
    fill('#2E282A');
    ellipse(0,30,45,45);
    ellipse(30,0,45,45);
    ellipse(0,-30,45,45);
    ellipse(-30,0,45,45);
    pop();


    rad2 += PI/30000*(-1)

  
    }
  }



  for(let x=0; x<=2000; x+=200) {
    for(let y=0; y<=1000; y+=200) {

    push();
    translate(x,y);
    rotate(rad1);

    scale(4)
    fill('#CD5334');
    noStroke()
    beginShape()
    curveVertex(0,40)
    curveVertex(-10,20)
    curveVertex(-25,25)
    curveVertex(-20,10)
    curveVertex(-40,0)
    curveVertex(-20,-10)
    curveVertex(-25,-25)
    curveVertex(-10,-20)
    curveVertex(0,-40)
    curveVertex(+10,-20)
    curveVertex(+25,-25)
    curveVertex(+20,-10)
    curveVertex(+40,0)
    curveVertex(+20,+10)
    curveVertex(+25,+25)
    curveVertex(+10,+20)
    curveVertex(0,40)
	  curveVertex(-10,20)
	  curveVertex(-25,25)
	  curveVertex(-20,10)
    endShape()

    pop();


    rad1 += PI/12000

    }
  }




  for(let x=0; x<=2000; x+=200) {
    for(let y=0; y<=1000; y+=200) {

    push();
    translate(x,y);
    rotate(rad3);

    fill('#ffbbb7')
    scale(1)
    noStroke()
    beginShape()
    vertex(0,40)
    bezierVertex(0,20,-20,0,-40,0)
    bezierVertex(-20,0,0,-20,0,-40)
    bezierVertex(0,-20,20,0,40,0)
    bezierVertex(20,0,0,20,0,40)
    endShape()

    pop();

    rad3 += PI/20000 * (-1)

    }
  }
}




