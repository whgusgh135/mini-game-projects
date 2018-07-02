const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// keyboard action
document.addEventListener("keydown", e => {
	if (e.which === 37 && snake.dx === 0) {
		snake.dx = -block;
		snake.dy = 0;
	} 
	if (e.which === 38 && snake.dy === 0) {
		snake.dy = -block;
		snake.dx = 0;
	} 
	if (e.which === 39 && snake.dx === 0) {
		snake.dx = block;
		snake.dy = 0;
	} 
	if (e.which === 40 && snake.dy === 0) {
		snake.dy = block;
		snake.dx = 0;
	}
});

// defining grid
const block = 10;

// defining animation time
let fps = 40;

// defining game score
let score = 0;
let scoreBoard = document.querySelector("span");


// Snake class
class Snake {
	constructor(x, y, dx, dy, cells) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.cells = cells;
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;

		// draws new snake body block every frame
		this.cells.unshift({x: this.x, y: this.y});
		// removes last snake body block every frame
		this.cells.pop();

		// if snake head hits the canvas border
		if (this.x < 0 || this.x >= canvas.width
			||this.y < 0 || this.y >= canvas.height)
		{
			restart();
		}

		// if snake head hits any snake body block
		for (let i = 1; i < this.cells.length; i++) {
			if(this.cells[i].x === this.cells[0].x && this.cells[i].y === this.cells[0].y) {
				restart();
			}
		}

		this.draw();
	}

	draw() {
		c.fillStyle = "#3BDE04";
		this.cells.forEach((cell, index) => {
			c.fillRect(cell.x, cell.y, block, block);
		})
	}
}

// Food class
class Food {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	update() {
		// when snake head touches the food
		if(snake.cells[0].x === this.x && snake.cells[0].y === this.y) {
			fps++;
			score++;
			// add one more snake body block to the snake tail
			snake.cells.push({});
			// generate new random loacation for new food block
			this.x = Math.floor(Math.random() * 40) * block;
			this.y = Math.floor(Math.random() * 40) * block;
		}
		this.draw();
	}

	draw() {
		c.fillStyle = "red";
		c.fillRect(this.x, this.y, block, block);
	}
}

// initial variables
let initialBody = [{x:0, y:0}, {}, {}, {}]
let snake = new Snake(0, 0, block, 0, initialBody);
let food = new Food(100, 100);

// restart all variables
function restart() {
	initialBody = [{x:0, y:0}, {}, {}, {}]
	
	snake = new Snake(0, 0, block, 0, initialBody);
	food = new Food(100, 100);
	score = 0;
	fps = 40;
}


// animate
function animate() {
	c.clearRect(0,0, canvas.width, canvas.height);
	snake.update();
	food.update();
	scoreBoard.textContent = score;
	setTimeout(function() {
		window.requestAnimationFrame(animate);
	}, 4000/fps)
}

animate();