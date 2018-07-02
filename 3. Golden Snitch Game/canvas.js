var startBtn = document.querySelector("#startBtn");
var replayBtn = document.querySelector("#replayBtn");

// Game Screen toggle

startBtn.addEventListener("click", function(){
	document.querySelector(".game-intro").style.display = "none";
	document.querySelector("canvas").style.display = "block";
	document.querySelector("canvas").style.animation = "3s fadein 0s forwards";
});

replayBtn.addEventListener("click", function(){
	document.querySelector(".game-end").style.display = "none";
	document.querySelector("canvas").style.display = "block";
});

function gameEnd(){
	document.querySelector(".game-end").style.display = "block";
	document.querySelector("canvas").style.display = "none";
}


// canvas logic

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
	x: undefined,
	y: undefined
}
let click = {
	x: undefined,
	y: undefined
}

// canvas resizing

window.addEventListener("resize", function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

// mousemove event

canvas.addEventListener("mousemove", function(e){
	mouse.x = e.clientX,
	mouse.y = e.clientY
});

// mouse click event

canvas.addEventListener("click", function(e){
	click.x = e.clientX
	click.y = e.clientY
	if(click.x - goldenSnitch.x < 50 
		&& click.x - goldenSnitch.x > - 50 
		&& click.y - goldenSnitch.y < 50 
		&& click.y - goldenSnitch.y > -50) {
		alert("Caught!");
		gameEnd();
	}
});

// flying balls class

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;	
	this.dx = dx;
	this.dy = dy;	
	this.radius = radius;

	this.fillColor = colors[Math.floor(Math.random() * 4)];

	this.update = function(){
		this.x += this.dx;
		this.y += this.dy;
		const originalRadius = radius;

		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}
		

		if (mouse.x - this.x < 50 
			&& mouse.x - this.x > -50 
			&& mouse.y - this.y < 50 
			&& mouse.y - this.y > -50
			&& this.radius < 40) 
		{
			this.radius += 1;	
		} else if (this.radius > originalRadius) {
			this.radius -= 1;
		}
		this.draw();
	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, Math.abs(this.radius), 0, Math.PI * 2)
		c.fillStyle = this.fillColor;
		c.fill();
	}
}


const colors=["#F8FC6A", "#FCBE68", "#FC9C68", "#CEFF63"];
const myCircle = new Circle(30, 80, 10);
let circleArray = [];

for (let i = 0; i < 500; i++) {
	const randomX = Math.random() * (innerWidth - 10 * 2) + 10;
	const randomY = Math.random() * (innerHeight - 10 * 2) + 10;
	const randomDx = Math.random() * 3 + 2;
	const randomDy = Math.random() * 3 + 2;
	const randomRadius = Math.random() * 8 + 2;
	circleArray.push(new Circle(randomX, randomY, randomDx, randomDy, randomRadius));
}

let goldenSnitch = new Circle(100,100,5,5,5);
goldenSnitch.fillColor = "gold";
circleArray.push(goldenSnitch);

function animate(){
	c.clearRect(0,0,innerWidth,innerHeight);
	myCircle.update();
	for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
	window.requestAnimationFrame(animate);
}

animate();