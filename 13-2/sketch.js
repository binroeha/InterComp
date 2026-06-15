let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/yvXTfqyvS/';

let video;
let label = "";
let confidenceScore = 0; 
let isModelReady = false; 
let isClassifying = false; 

let alphabetString = "qwertyuiopasdfghjklzxcvbnm";
let particles = [];

let globalColor;

function loadLatestMl5() {
	let tfConfig = document.createElement('script');
	tfConfig.text = "window.ENV = { 'tfjs-core': { 'HAS_WEBGPU': false } };";
	document.head.appendChild(tfConfig);

	let script = document.createElement('script');
	script.src = "https://unpkg.com/ml5@1.0.1/dist/ml5.min.js";
	document.head.appendChild(script);
	
	script.onload = () => {
		if (window.ml5 && window.ml5.tf) {
			ml5.tf.setBackend('webgl').catch(() => ml5.tf.setBackend('cpu'));
		}

		classifier = ml5.imageClassifier(imageModelURL + 'model.json', {
			flipped: true, 
		}, () => {
			isModelReady = true; 
		});
	};
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 200, 100); 
	globalColor = color(0, 0, 100); 

	loadLatestMl5();

	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();

	for (let i = 0; i < alphabetString.length; i++) {
		particles.push(new AlphabetParticle(alphabetString[i], i));
	}
}

function draw() {
	background(0); 

	if (isModelReady && !isClassifying && video && video.elt.readyState === 4) { 
		isClassifying = true; 
		classifier.classify(video, gotResult); 
	}

	push();
	translate(160, 0); 
	scale(-1, 1);      
	image(video, 0, 0, 160, 120); 
	pop();

	stroke(0, 0, 20);
	noFill();
	rect(0, 0, 160, 120);

	noStroke();
	textAlign(LEFT, TOP);
	textFont('Courier New');
	
	fill(0, 0, 8, 0.8);
	rect(0, 120, 160, 55);
	
	fill(0, 0, 80);
	textSize(12);
	text("This is a " + label + "!", 8, 142); 

	let currentHue = hue(globalColor);
	let currentSat = saturation(globalColor);
	let currentBright = brightness(globalColor);
	
	if (currentSat > 0) {
		globalColor = color(currentHue, max(0, currentSat - 4), min(100, currentBright + 1));
	}

	for (let p of particles) {
		p.update(label);
		p.display(globalColor); 
	}

	textAlign(CENTER, TOP);
	fill(0, 0, 100);
	textSize(22);
	text("리모컨, 마우스, 키보드 인식 가능!\n클릭해서 반짝이기!", width / 2, 30);

	textAlign(CENTER, CENTER);
	fill(0, 0, 60);
	textSize(16);
	let currentMode = (label === "idle" || label === "") ? "자유 유영 (Idle)" : label.toUpperCase() + " 모드";
	text("현재 화면 연출 상태: " + currentMode, width / 2, height - 30);
}

function mousePressed() {
	let randomHue = random(360); 
	globalColor = color(randomHue, 200, 100); 
}

function gotResult(results) {
	if (results && results[0]) {
		let topResult = results[0];
		confidenceScore = topResult.probability; 

		if (topResult.probability < 0.65) {
			label = "idle";
		} else {
			label = topResult.label.toLowerCase().trim(); 
		}
	}
	isClassifying = false; 
}

class AlphabetParticle {
	constructor(char, index) {
		this.char = char;
		this.index = index;
		this.pos = createVector(random(width), random(height));
		this.tx = random(100);
		this.ty = random(100);
		this.textSize = 28; 
	}

	update(state) {
		let target = createVector(this.pos.x, this.pos.y);

		if (state === 'mouse') {
			let mouseShape = getMouseOffset(this.index);
			target.set(mouseX + mouseShape.x, mouseY + mouseShape.y);
		} else if (state === 'remote') {
			let remoteShape = getRemoteOffset(this.index);
			target.set(mouseX + remoteShape.x, mouseY + remoteShape.y);
		} else if (state === 'keyboard') {
			target = getKeyboardPosition(this.char);
		} else {
			target.x = map(noise(this.tx), 0, 1, 0, width);
			target.y = map(noise(this.ty), 0, 1, 0, height);
			this.tx += 0.002;
			this.ty += 0.002;
		}

		this.pos.x = lerp(this.pos.x, target.x, 0.05);
		this.pos.y = lerp(this.pos.y, target.y, 0.05);
	}

	display(col) {
		fill(col); 
		textSize(this.textSize);
		textAlign(CENTER, CENTER); 
		text(this.char, this.pos.x, this.pos.y);
	}
}

function getMouseOffset(index) {
	let x = 0, y = 0;
	let s = 1.6; 
	
	if (index < 8) {
		x = 0;
		y = index * 22 * s;
	} else if (index < 15) {
		let pct = (index - 8) / 6;
		x = lerp(0, 130, pct) * s;
		y = lerp(0, 130, pct) * s;
	} else if (index < 19) {
		let pct = (index - 15) / 4;
		x = lerp(130, 50, pct) * s;
		y = lerp(130, 110, pct) * s;
	} else {
		let pct = (index - 19) / 6;
		let stemX = lerp(0, 45, pct);
		x = (50 + stemX) * s;
		y = (110 + stemX) * s;
	}
	return createVector(x, y);
}

function getRemoteOffset(index) {
	let x = 0, y = 0;
	let stepX = 65; 
	let stepY = 45; 
	
	if (index < 9) {
		x = -stepX;
		y = (index - 4) * stepY;
	} else if (index < 11) {
		x = (index - 9 === 0) ? 0 : stepX;
		y = 4 * stepY;
	} else if (index < 20) {
		x = stepX;
		y = (4 - (index - 11)) * stepY;
	} else {
		let pct = (index - 20) / 5;
		x = lerp(stepX - 25, -stepX + 25, pct);
		y = -4 * stepY;
	}
	
	return createVector(x, y - 50);
}

function getKeyboardPosition(char) {
	let row1 = "qwertyuiop"; let row2 = "asdfghjkl"; let row3 = "zxcvbnm";
	let startX = width / 2;
	let startY = height / 2;
	let spacing = 65; 
	
	if (row1.includes(char)) {
		return createVector(startX - (row1.length * spacing)/2 + row1.indexOf(char) * spacing, startY - spacing);
	} else if (row2.includes(char)) {
		return createVector(startX - (row2.length * spacing)/2 + row2.indexOf(char) * spacing, startY);
	} else if (row3.includes(char)) {
		return createVector(startX - (row3.length * spacing)/2 + row3.indexOf(char) * spacing, startY + spacing);
	}
	return createVector(width/2, height/2);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}