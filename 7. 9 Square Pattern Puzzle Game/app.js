

// checking answers!
$(".outer-square").on("click", function(){
	let selectedId = "#" + correctAnswer;
	let selectedSquare = $(selectedId);
	if($(this)[0].id == correctAnswer){
		selectedSquare.addClass("run-colorin");
		$("#status").text("Correct!");
	} else {
		$("#status").text("Wrong!");
		setTimeout(function(){
			$("#status").text("Correct Answer is");
			selectedSquare.addClass("run-colorin");
		},1000);
	}
	setTimeout(function(){
		selectedSquare.removeClass("run-colorin");
		$("#status").text("Guess The Answer")
	},3000);
});

// initial
let selected = setAnswer();
setHint(selected);
giveClue();
let correctAnswer = selected;
// play button
$("button").on("click", function(){
	$(this).prop("disabled", true);
	// 1. set an answer
	selected = setAnswer();
	// 2. set clue css
	setHint(selected);
	// 3. give clues
	giveClue();
	// 4. check answer
	correctAnswer = selected;
});

function setAnswer() {
	let randNum = Math.floor(Math.random() * 9) + 1;
	let selectedId = "#" + randNum;
	let selectedSquare = $(selectedId);

	return randNum;
}

function setHint(square) {
	let signals = document.querySelectorAll(".signal")
	if (square == 1) {
		signals.forEach(signal => {
			signal.style.marginLeft = "0%";
			signal.style.marginTop = "0%";
		})
	}
	if (square == 2) {
		signals.forEach(signal => {
			signal.style.marginLeft = "30%";
			signal.style.marginTop = "0%";
		})
	}
	if (square == 3) {
		signals.forEach(signal => {
			signal.style.marginLeft = "60%";
			signal.style.marginTop = "0%";
		})
	}
	if (square == 4) {
		signals.forEach(signal => {
			signal.style.marginLeft = "0%";
			signal.style.marginTop = "30%";
		})
	}
	if (square == 5) {
		signals.forEach(signal => {
			signal.style.marginLeft = "30%";
			signal.style.marginTop = "30%";
		})
	}
	if (square == 6) {
		signals.forEach(signal => {
			signal.style.marginLeft = "60%";
			signal.style.marginTop = "30%";
		})
	}
	if (square == 7) {
		signals.forEach(signal => {
			signal.style.marginLeft = "0%";
			signal.style.marginTop = "60%";
		})
	}
	if (square == 8) {
		signals.forEach(signal => {
			signal.style.marginLeft = "30%";
			signal.style.marginTop = "60%";
		})
	}
	if (square == 9) {
		signals.forEach(signal => {
			signal.style.marginLeft = "60%";
			signal.style.marginTop = "60%";
		})
	}
}

function giveClue() {
	let randLength = Math.floor(Math.random()*3) + 2;
	for (let i = 0; i < randLength; i++) {
		let randNum = Math.floor(Math.random()*9) + 1;
		let selectedId = "#" + randNum + " > div";
		let selectedSquare = $(selectedId);
		let animationIn = "3s fadein " + i + "s forwards";
		selectedSquare.addClass("run-fadein");
		setTimeout(function(){
			selectedSquare.removeClass("run-fadein");
		},3000)
	};
	setTimeout(function(){
		$("button").prop("disabled", false);
	}, 3000)
}