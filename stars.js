const canvas = document.getElementById("canvas").getContext("2d");
const canvasElement = document.getElementById("canvas");
const canWidthInput = document.getElementById("canvaswidth");
const canHeightInput = document.getElementById("canvasheight");
const framerateInput = document.getElementById("framerate");
const starsCountInput = document.getElementById("starcount");
const starSpeedMinInput = document.getElementById("speedmin");
const starSpeedMaxInput = document.getElementById("speedmax");
const starWidthMinInput = document.getElementById("sizewidthmin");
const starHeightMinInput = document.getElementById("sizeheightmin");
const starWidthMaxInput = document.getElementById("sizewidthmax");
const starHeightMaxInput = document.getElementById("sizeheightmax");
const proportionLengthInput = document.getElementById("proportionlength");
const rminInput = document.getElementById("rmin");
const gminInput = document.getElementById("gmin");
const bminInput = document.getElementById("bmin");
const rmaxInput = document.getElementById("rmax");
const gmaxInput = document.getElementById("gmax");
const bmaxInput = document.getElementById("bmax");

let stars = [];
let time = 0;
let running = true;

let canvasX;
let canvasY;

let starsCount;

let framerate;

let starSpeedMin;
let starSpeedMax;

let starWidthMin;
let starHeightMin;
let starWidthMax;
let starHeightMax;
let starHeightProportion;

let rMin;
let gMin;
let bMin;
let rMax;
let gMax;
let bMax;

function setValuesDefault() {
	canvasX, canWidthInput.value = 800;
	canvasY, canHeightInput.value = 600;
	framerate, framerateInput.value = 16;
	starsCount, starsCountInput.value = 512;
	starSpeedMin, starSpeedMinInput.value = 1;
	starSpeedMax, starSpeedMaxInput.value = 4;
	starWidthMin, starWidthMinInput.value = 1;
	starHeightMin, starHeightMinInput.value = 1;
	starWidthMax, starWidthMaxInput.value = 1;
	starHeightMax, starHeightMaxInput.value = 1;
	starHeightProportion, proportionLengthInput.checked = false;
	rMin, rminInput.value = 255;
	gMin, gminInput.value = 255;
	bMin, bminInput.value = 255;
	rMax, rmaxInput.value = 255;
	gMax, gmaxInput.value = 255;
	bMax, bmaxInput.value = 255;
}

function reset() {
	stars.splice(0, stars.length);
	time = 0;
	canvasX = canWidthInput.value;
	canvasY = canHeightInput.value;
	canvasElement.setAttribute("width",canvasX);
	canvasElement.setAttribute("height",canvasY);
	framerate = framerateInput.value;
	starsCount = starsCountInput.value;
	starSpeedMin = starSpeedMinInput.value;
	starSpeedMax = starSpeedMaxInput.value;
	starWidthMin = starWidthMinInput.value;
	starHeightMin = starHeightMinInput.value;
	starWidthMax = starWidthMaxInput.value;
	starHeightMax = starHeightMaxInput.value;
	starHeightProportion = proportionLengthInput.checked;
	rMin = rminInput.value;
	gMin = gminInput.value;
	bMin = bminInput.value;
	rMax = rmaxInput.value;
	gMax = gmaxInput.value;
	bMax = bmaxInput.value;
}

class star {
	constructor() {
		this.sizeX = random(starWidthMin,starWidthMax);
		this.posX = random(0,canvasX);
		this.fallSpeed = random(parseInt(starSpeedMin),parseInt(starSpeedMax));
		if (starHeightProportion) {
			this.sizeY = random(starHeightMin,starHeightMax)*this.fallSpeed;
		} else {
			this.sizeY = random(starHeightMin,starHeightMax);
		}
		this.posY = random(-350,0)-this.sizeY;
		this.r = random(parseInt(rMin), parseInt(rMax));
		this.g = random(parseInt(gMin), parseInt(gMax));
		this.b = random(parseInt(bMin), parseInt(bMax));
		stars.push(this);
	}
	
	run() {
		this.posY+=this.fallSpeed;
		if (this.posY > canvasY) {
			stars.splice(stars.indexOf(this), 1);
			new star;
		}
		canvas.fillStyle = "rgb(" + this.r +","+this.g+","+this.b+")";
		canvas.fillRect(this.posX,this.posY,this.sizeX,this.sizeY);
	}   
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function run() {
	if (running) {
		if (time == 0) {
			while (stars.length <= starsCount-1) {
				new star;
			}
		}
		canvas.fillStyle = "black";
		canvas.fillRect(0, 0, canvasX, canvasY);
		for (let i = 0; i < stars.length; i++) {
			stars[i].run();
		}
		time++;
	}
	setTimeout(run,framerate);
}

function start() {
	setValuesDefault();
	run();
	reset();
}