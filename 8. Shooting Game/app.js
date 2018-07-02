const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

// canvas size resized by browser size
window.addEventListener("resize", function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 4;
	initialiseVariables();
});

// mousemove x,y variables
let mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
};
let click = {
	x: undefined,
	y: undefined
};

// game status variables
let numOfBullet = 10;
let score = 0;

canvas.addEventListener("mousemove", function(e){
	mouse.x = e.clientX;
	mouse.y = e.clientY;
})

canvas.addEventListener("click", function(e){
	click.x = e.clientX;
	click.y = e.clientY;
	
	console.log(click);
	if(numOfBullet > 0) {
		bullet = new Bullet(click.x,click.y,5,3,"black", gun);
		bullets.push(bullet);
		numOfBullet--;
	}
	console.log(bullet);
})

let desirableAngle = 0;

// define Gun class

class Gun {
	constructor(x, y, width, height, color){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.angle = 0;
	}

	update() {
		this.angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
		this.draw();
	}

	draw() {
		// save the untranslated/unrotated context
		c.save();
		// move to rotation point to the bottom of rectangle
		c.translate(this.x, this.y);
		c.rotate(this.angle)
		c.fillRect(0, -this.height/2, this.width, this.height);
		c.fillStyle = this.color;
		// restore the context to its untranslated/unrotated state
		c.restore();	
	}
}

class Bullet {
	constructor (x, y, speed, radius, color, source) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.dx;
		this.dy;
		this.radius = radius;
		this.color = color;
		this.source = source;
		this.init();
	}

	init() {
		// set the starting point of the bullet depending on gun angle
		this.x = Math.cos(this.source.angle) * this.source.width + (canvas.width/2);
		this.y = Math.sin(this.source.angle) * this.source.width + (canvas.height);
		// set the dx,dy of bullet depending on gun angle
		this.dx = Math.cos(this.source.angle) * this.speed;
		this.dy = Math.sin(this.source.angle) * this.speed;
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}

	draw() {
		c.save();
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}

}

class Enemy {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	draw() {
		c.fillRect(this.x, this.y, this.width, this.height);
		c.fillStyle = this.color;
	}
}

// need this to redraw gun everytime window resizes
function initialiseVariables() {
	gun = new Gun(canvas.width/2, canvas.height, 20, 10, "black");
}

// initialise gun, bullets, enemies
let gun;
let bullets = [];
let enemies = [];
for(let i=0; i < 10; i++) {
	let xCor = canvas.width / 10 * i + canvas.width / 20;
	let enemy = new Enemy(xCor, 100, 10, 10, "black");
	enemies.push(enemy);
}
initialiseVariables();


function animate(){
	c.clearRect(0,0,innerWidth,innerHeight);
	gun.update();
	bullets = bullets.filter(bullet => (
		bullet.x > 0
		&& bullet.x < canvas.width
		&& bullet.y > 0
	));
	bullets.forEach(bullet => bullet.update());


	bullets.forEach(bullet => {
		enemies.forEach(enemy => {
			if(bullet.y < 100 && bullet.y > 95
				&& bullet.x - enemy.x < 15 && bullet.x - enemy.x > 0) 
			{
				score += 10;
			}
		})
	})
		
	

	enemies.forEach(enemy => enemy.draw());

	c.font = "30px Arial";
	c.fillText("Number of Bullets Left: " + numOfBullet, 10, 50);
	c.fillText("Score: " + score, canvas.width - 170, 50)

	window.requestAnimationFrame(animate);
	
}

animate();