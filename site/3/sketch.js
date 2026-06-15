function setup() {
  createCanvas(1200, 1200);
}

function draw() {
  background(255);


  let gradient3 = drawingContext.createRadialGradient(300, 900, 10, 300, 900, 250)
  gradient3.addColorStop(0.9, '#ff000000') 
  gradient3.addColorStop(0, '#ff0000') 

  drawingContext.fillStyle = gradient3
  ellipse(300,900,500)
  

let gradient1 = drawingContext.createRadialGradient(300, 900, 10, 300, 900, 200)
  gradient1.addColorStop(0, '#180000') 
  gradient1.addColorStop(0.7, '#e40000') 
  
  drawingContext.fillStyle = gradient1
  noStroke()
  beginShape()
  curveVertex(300,693)
  curveVertex(258,812)
  curveVertex(190,791)
  curveVertex(231,857)
  curveVertex(90,898)
  curveVertex(231,935)
  curveVertex(190,1021)
  curveVertex(258,980)
  curveVertex(300,1119)
  curveVertex(342,980)
  curveVertex(410,1021)
  curveVertex(369,935)
  curveVertex(510,898)
  curveVertex(369,857)
  curveVertex(410,791)
  curveVertex(342,812)
  curveVertex(300,693)
  curveVertex(258,812)
  curveVertex(190,791)
  endShape()

  


  let linearGradient1 = drawingContext.createLinearGradient(908, 125-90, 908, 440-90);
  linearGradient1.addColorStop(0.1, '#23c8ffcc');
  linearGradient1.addColorStop(0.45, '#1e57dccc');
  linearGradient1.addColorStop(0.75, '#250081cc');
  linearGradient1.addColorStop(0.9, '#170041cc');

  drawingContext.fillStyle = linearGradient1;
  noStroke()
  beginShape()
  vertex(720,125-90)
  bezierVertex(774,407-90,828,584-90,809,243-90)
  bezierVertex(872,507-90,908,494-90,971,243-90)
  bezierVertex(933,498-90,993,502-90,1083,162-90)
  bezierVertex(981,434-90,912,479-90,908,125-90)
  bezierVertex(803,528-90,837,447-90,720,125-90)
  endShape()



  ellipse(880,430,90,90)
  let lineargradient20 = drawingContext.createLinearGradient(350,0,0,350);
  lineargradient20.addColorStop(0, '#59fff100') 
  lineargradient20.addColorStop(0.33, '#5ec1ffbb') 
  lineargradient20.addColorStop(0.66, '#6b68ffbb') 
  lineargradient20.addColorStop(1, '#925fff00') 
  drawingContext.fillStyle = lineargradient20
  ellipse(300,300,450)

  let lineargradient3 = drawingContext.createLinearGradient(200,200,400,400);
  lineargradient3.addColorStop(0, '#99f3ff00') 
  lineargradient3.addColorStop(0.33, '#a0ffdf') 
  lineargradient3.addColorStop(0.66, '#9effe7') 
  lineargradient3.addColorStop(1, '#92ff6a00') 
  drawingContext.fillStyle = lineargradient3
  ellipse(300,300,300)

  let lineargradient2 = drawingContext.createLinearGradient(200,200,350,350);
  lineargradient2.addColorStop(0, '#e39bff') 
  lineargradient2.addColorStop(0.33, '#ffa5fa') 
  lineargradient2.addColorStop(0.66, '#ff8e8e') 
  lineargradient2.addColorStop(1, '#ff5555') 
  drawingContext.fillStyle = lineargradient2
  ellipse(300,300,175)



  



  let Radialgradient4 = drawingContext.createRadialGradient(600,600,1,600,600,200);
  Radialgradient4.addColorStop(0, '#000000') 
  Radialgradient4.addColorStop(1, '#ffffff00') 
  drawingContext.fillStyle = Radialgradient4
  beginShape()
  vertex(600,600)
  vertex(800,600)
  vertex(900,900)
  vertex(600,800)
  endShape()



  let Radialgradient5 = drawingContext.createRadialGradient(1200,1200,1,1200,1200,400);
  Radialgradient5.addColorStop(0, '#000000') 
  Radialgradient5.addColorStop(1, '#ffffff00') 
  drawingContext.fillStyle = Radialgradient5
  beginShape()
  vertex(1200,1200)
  vertex(800,1200)
  vertex(900,900)
  vertex(1200,800)
  endShape()


  let Radialgradient6 = drawingContext.createRadialGradient(1200,600,1,1200,900,900);
  Radialgradient6.addColorStop(0, '#000000') 
  Radialgradient6.addColorStop(1, '#ffffff00') 
  drawingContext.fillStyle = Radialgradient6
  beginShape()
  vertex(600,600)
  vertex(600,1200)
  vertex(1200,1200)
  vertex(1200,600)
  endShape()


  let Radialgradient7 = drawingContext.createRadialGradient(700,1100,1,700,1100,100);
  Radialgradient7.addColorStop(0, '#000000') 
  Radialgradient7.addColorStop(1, '#ffffff00') 
  drawingContext.fillStyle = Radialgradient7
  ellipse(700,1100,200,200)




}
