let faceMesh;
let options = { maxFaces: 1, refineLandmarks: true, flipped: true };
let faces = [];
let video;

let leftEyeType  = 0;
let rightEyeType = 0;
let mouthType    = 0;

let leftClosedFrames  = 0;
let rightClosedFrames = 0;
let mouthOpenFrames   = 0;
const TRIGGER = 2; 

const EyeClose = 0.12; 
const MOUTH_OPEN = 0.12;

const L_TOP = 159, L_BOT = 145, L_LEFT = 33,  L_RIGHT = 133;
const R_TOP = 386, R_BOT = 374, R_LEFT = 362, R_RIGHT = 263;

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
}

function gotFaces(results) {
  faces = results;
}


function drawEye(cx, cy, s, type, isLeft) {
  stroke(40);
  strokeWeight(s * 0.08);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  if (type === 0) {
    noFill();
    beginShape();
    if (isLeft) {
      vertex(cx - s * 0.4, cy - s * 0.3);
      vertex(cx + s * 0.2, cy);
      vertex(cx - s * 0.4, cy + s * 0.3);
    } else {
      vertex(cx + s * 0.4, cy - s * 0.3);
      vertex(cx - s * 0.2, cy);
      vertex(cx + s * 0.4, cy + s * 0.3);
    }
    endShape();

  } else if (type === 1) {
    noFill();
    beginShape();
    vertex(cx - s * 0.4, cy - s * 0.2);
    bezierVertex(cx - s * 0.2, cy + s * 0.2, cx + s * 0.2, cy + s * 0.2, cx + s * 0.4, cy - s * 0.2);
    endShape();

  } else if (type === 2) {
    noFill();
    arc(cx, cy + s * 0.1, s * 0.9, s * 0.6, PI, TWO_PI);

  } else if (type === 3) {
    fill(255); 
    rect(cx - s * 0.35, cy - s * 0.4, s * 0.7, s * 0.8, s * 0.3);
    fill(40);
    noStroke();
    ellipse(cx, cy, s * 0.25, s * 0.35);
  }
}


function drawMouth(cx, cy, s, type) {
  stroke(40);
  strokeWeight(s * 0.07);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  if (type === 0) {
    noFill();
    arc(cx, cy + s * 0.3, s * 1.1, s * 0.6, PI, TWO_PI);

  } else if (type === 1) {
    noFill();
    arc(cx, cy - s * 0.1, s * 1.3, s * 0.65, 0, PI);

  } else if (type === 2) {
    fill(255);
    ellipse(cx, cy, s * 0.5, s * 0.6);

  } else if (type === 3) {
    noFill();
    let leftX = cx - s * 0.4;
    let rightX = cx + s * 0.4;
    let midX = cx;
    let bottomY = cy + s * 0.2; 
    let topY = cy - s * 0.1;    

    beginShape();
    vertex(leftX, cy - s * 0.1);
    bezierVertex(leftX + s * 0.1, bottomY, midX - s * 0.1, bottomY, midX, topY);
    bezierVertex(midX + s * 0.1, bottomY, rightX - s * 0.1, bottomY, rightX, cy - s * 0.1);
    endShape();

  } else if (type === 4) {
    noFill();
    let startX = cx - s * 0.15; 
    let midX   = cx - s * 0.15; 
    let edgeX  = cx + s * 0.45; 
    
    let topY    = cy - s * 0.35; 
    let centerY = cy;            
    let bottomY = cy + s * 0.35; 

    beginShape();
    vertex(startX, topY); 
    bezierVertex(midX, topY, edgeX, centerY - s * 0.05, midX, centerY);
    bezierVertex(edgeX, centerY + s * 0.05, midX, bottomY, startX, bottomY);
    endShape();
  }
}

function isEyeClosed(topIdx, botIdx, leftIdx, rightIdx, keypoints) {
  let verticalDist = dist(keypoints[topIdx].x, keypoints[topIdx].y, keypoints[botIdx].x, keypoints[botIdx].y);
  let horizontalDist = dist(keypoints[leftIdx].x, keypoints[leftIdx].y, keypoints[rightIdx].x, keypoints[rightIdx].y);
  
  let opennessRatio = verticalDist / horizontalDist; 
  return opennessRatio < EyeClose;
}

function draw() {
  background(240);

  if (faces.length === 0) return;

  let face = faces[0];
  let key = face.keypoints;

  let leftClosed  = isEyeClosed(L_TOP, L_BOT, L_LEFT, L_RIGHT, key);
  let rightClosed = isEyeClosed(R_TOP, R_BOT, R_LEFT, R_RIGHT, key);

  if (leftClosed) {
    leftClosedFrames++;
    if (leftClosedFrames === TRIGGER) leftEyeType = (leftEyeType + 1) % 4;
  } else {
    leftClosedFrames = 0;
  }

  if (rightClosed) {
    rightClosedFrames++;
    if (rightClosedFrames === TRIGGER) rightEyeType = (rightEyeType + 1) % 4;
  } else {
    rightClosedFrames = 0;
  }


  let hDist = dist(key[33].x, key[33].y, key[263].x, key[263].y);
  let mRatio = dist(key[13].x, key[13].y, key[14].x, key[14].y) / hDist;
  
  if (mRatio > MOUTH_OPEN) { 
    mouthOpenFrames++;
    if (mouthOpenFrames === TRIGGER) mouthType = (mouthType + 1) % 5;
  } else {
    mouthOpenFrames = 0;
  }

  let box  = face.box;
  let fcx  = box.xMin + box.width  * 0.5;
  let fcy  = box.yMin + box.height * 0.5;

  let cx = map(fcx, 0, video.width,  0, width);
  let cy = map(fcy, 0, video.height, 0, (width * video.height) / video.width);
  let r  = map(box.width * 0.6, 0, video.width, 0, width);

  fill(255, 220, 130);
  stroke(40);
  strokeWeight(r * 0.06);
  ellipse(cx, cy, r * 2, r * 2);

  function canvus(point) {
    return {
      x: map(point.x, 0, video.width,  0, width),
      y: map(point.y, 0, video.height, 0, (width * video.height) / video.width)
    };
  }

  let lc = canvus(key[159]);
  let rc = canvus(key[386]);
  let ml = canvus(key[61]);
  let mr = canvus(key[291]);
  let mt = canvus(key[13]);
  let mb = canvus(key[14]);
  let mcx = (ml.x + mr.x) * 0.5;
  let mcy = (mt.y + mb.y) * 0.5;

  let eyeSize   = r * 0.45;
  let mouthSize = r * 0.55;

  drawEye(lc.x, lc.y, eyeSize, leftEyeType, true);
  drawEye(rc.x, rc.y, eyeSize, rightEyeType, false);
  drawMouth(mcx, mcy, mouthSize, mouthType);

  fill(0);
  noStroke();
  textSize(14);
  text("왼쪽 눈 상태: " + (leftClosed ? "감김" : "뜸"), 20, 30);
  text("오른쪽 눈 상태: " + (rightClosed ? "감김" : "뜸"), 20, 50);

	push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  
  fill(255, 255, 255, 200); 
  stroke(40);
  strokeWeight(2);
  rect(width / 2, 40, 420, 40, 10); 
  
  fill(40);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("깜빡여서 눈 변경, 입 벌려서 입 변경", width / 2, 40);
  pop();
}