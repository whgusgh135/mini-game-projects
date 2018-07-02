const canvas = $("canvas")[0];
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
	x: undefined,
	y: undefined
}

$(window).on("resize", function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

canvas.addEventListener("mousemove", function(e){
	mouse.x = e.clientX,
	mouse.y = e.clientY
});


class Star {
	constructor (x, y, dx, dy) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = 2;
		this.color = "white";
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;

		// if Star hits the edge, changes directions and becomes faster
		if(this.x + this.radius > innerWidth) {
			this.dx = this.dx + (Math.random() * 0.4);
			this.dx = -this.dx;
		} ;
		if(this.x - this.radius < 0) {
			this.dx = this.dx -(Math.random() * 0.4);
			this.dx = -this.dx;
		};
		if(this.y + this.radius > innerHeight) {
			this.dy = this.dy + (Math.random() * 0.2);
			this.dy = -this.dy;
		} 
		if(this.y - this.radius < 0) {
			this.dy = this.dy -(Math.random() * 0.2);
			this.dy = -this.dy;
		}

		// if Star hits the mouse
		if (mouse.x - this.x < 3 && mouse.x - this.x > -3
			&& mouse.y - this.y < 3 && mouse.y - this.y > -3)
		{
			alert("DEAD");
			initialiseVar();
		}

		this.draw();
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, Math.abs(this.radius), 0, Math.PI * 2);
		c.fillStyle = this.color;
		c.fill();
	}
}

class Ship {
	constructor (x,y) {
		this.x = x;
		this.y = y;
	}

	update() {
		this.x = mouse.x;
		this.y = mouse.y;

		this.draw();
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, Math.abs(4), 0, Math.PI * 2);
		c.fillStyle = "yellow";
		c.fill();
	}
}

let starsArray = [];
let ship = new Ship(100, 100);

function initialiseVar() {
	starsArray = [];
	for(let i = 1; i < 50; i++){
		const xCor = innerWidth / 50 * i;
		const yCor = 2;
		const xVel = 1/50 * (50-i);
		const yVel = 1/50 * i;
		starsArray.push(new Star(xCor, yCor, xVel, yVel));
	}
	for(let i = 1; i < 50; i++){
		const xCor = innerWidth / 50 * (50-i);
		const yCor = innerHeight - 2;
		const xVel = -1/50 * (50-i);
		const yVel = -1/50 * i;
		starsArray.push(new Star(xCor, yCor, xVel, yVel));
	}
	for(let i = 1; i < 50; i++){
		const xCor = 4;
		const yCor = innerHeight / 50 * i;
		const xVel = -1/50 * (50-i);
		const yVel = 1/50 * i;
		starsArray.push(new Star(xCor, yCor, xVel, yVel));
	}
}

initialiseVar();


function animate() {
	c.clearRect(0,0, innerWidth, innerHeight);
	starsArray.forEach((star) => {
		star.update();
	});
	ship.update();
	window.requestAnimationFrame(animate);
}

animate();