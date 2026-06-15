let rad1 = 0
let rad2 = 0
let rad3 = 0
let t = 0;              
let duration = 0.01;
let cycleCount = 0; 

function ease(x) {
  if (x < 0.5) {
    return 4 * x * x * x;
  } else {
    return 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
}


function draw() {
  background('#17BEBB');
  noStroke();
    
  t += duration;
  
  if (t > 1) {
    t = 0; 
    cycleCount += 1; 
  }
  

  let totalEase = ease(t) + cycleCount; 
  
  let currentRad1 = totalEase * PI/4 * 1;       
  let currentRad2 = totalEase * PI/4 * (-1);    
  let currentRad3 = totalEase * PI/4 * 2;       



  for (let x = 0; x <= 2000; x += 200) {
    for (let y = 0; y <= 1000; y += 200) {

      push();
      translate(x, y);
      rotate(currentRad2); 

      scale(2.5)
      fill('#2E282A');
      ellipse(0, 30, 45, 45);
      ellipse(30, 0, 45, 45);
      ellipse(0, -30, 45, 45);
      ellipse(-30, 0, 45, 45);
      pop();

    }
  }



  for (let x = 0; x <= 2000; x += 200) {
    for (let y = 0; y <= 1000; y += 200) {

      push();
      translate(x, y);
      rotate(currentRad2); 

      scale(2.5)
      fill('#2E282A');
      ellipse(0, 30, 45, 45);
      ellipse(30, 0, 45, 45);
      ellipse(0, -30, 45, 45);
      ellipse(-30, 0, 45, 45);
      pop();

    }
  }



  for (let x = 0; x <= 2000; x += 200) {
    for (let y = 0; y <= 1000; y += 200) {

      push();
      translate(x, y);
      rotate(currentRad1);

      scale(4)
      fill('#CD5334');
      noStroke()
      beginShape()
      curveVertex(0, 40)
      curveVertex(-10, 20)
      curveVertex(-25, 25)
      curveVertex(-20, 10)
      curveVertex(-40, 0)
      curveVertex(-20,-10)
      curveVertex(-25,-25)
      curveVertex(-10,-20)
      curveVertex(0, -40)
      curveVertex(+10,-20)
      curveVertex(+25,-25)
      curveVertex(+20,-10)
      curveVertex(+40, 0)
      curveVertex(+20,+10)
      curveVertex(+25,+25)
      curveVertex(+10,+20)
      curveVertex(0, 40)
      curveVertex(-10, 20)
      curveVertex(-25, 25)
      curveVertex(-20, 10)
      endShape()

      pop();

    }
  }




  for (let x = 0; x <= 2000; x += 200) {
    for (let y = 0; y <= 1000; y += 200) {

      push();
      translate(x, y);
      
      // ==========================================
      // [이징 적용] 기존 매개변수 대신 이징이 계산된 각도를 대입
      // ==========================================
      rotate(currentRad3);
      // ==========================================

      fill('#ffbbb7')
      scale(1)
      noStroke()
      beginShape()
      vertex(0, 40)
      bezierVertex(0, 20, -20, 0, -40, 0)
      bezierVertex(-20, 0, 0, -20, 0, -40)
      bezierVertex(0, -20, 20, 0, 40, 0)
      bezierVertex(20, 0, 0, 20, 0, 40)
      endShape()

      pop();

    }
  }
}