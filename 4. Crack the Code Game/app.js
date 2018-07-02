
// disable normal mouse right click behaviour to set up new function
$(document).ready(function(){
	document.oncontextmenu = () => false;

	$("#first-code").on("mousedown", function(e){
		if(e.button == 2) {
			if(firstCode == 0){
				firstCode = 9;
			} else {
				firstCode--;
			}
		} else {
			if(firstCode == 9) {
				firstCode = 0;
			} else {
				firstCode++;
			}	
		}
		$(this).text(firstCode);
		checkAnswer();
	})
	$("#second-code").on("mousedown", function(e){
		if(e.button == 2) {
			if(secondCode == 0){
				secondCode = 9;
			} else {
				secondCode--;
			}
		} else {
			if(secondCode == 9) {
				secondCode = 0;
			} else {
				secondCode++;
			}	
		}
		$(this).text(secondCode);
		checkAnswer();
	})
	$("#third-code").on("mousedown", function(e){
		if(e.button == 2) {
			if(thirdCode == 0){
				thirdCode = 9;
			} else {
				thirdCode--;
			}
		} else {
			if(thirdCode == 9) {
				thirdCode = 0;
			} else {
				thirdCode++;
			}	
		}
		$(this).text(thirdCode);
		checkAnswer();
	})
	$("#fourth-code").on("mousedown", function(e){
		if(e.button == 2) {
			if(fourthCode == 0){
				fourthCode = 9;
			} else {
				fourthCode--;
			}
		} else {
			if(fourthCode == 9) {
				fourthCode = 0;
			} else {
				fourthCode++;
			}	
		}
		$(this).text(fourthCode);
		checkAnswer();
	})
	$("#try").on("click", function(){
		if(tries == 0){
			$("#game-screen").css("animation", "1s fadeout 0.2s forwards");
			setTimeout(function(){
				$("#game-screen").css("display", "none");
				$("#lose-screen").css("display", "block");
			}, 1200);
			$("#lose-screen").css("animation", "1.5s fadein 0.2s forwards");
		}
		if(firstHintBtnColor == "#00FF00" 
			&& secondHintBtnColor == "#00FF00"
			&& thirdHintBtnColor == "#00FF00"
			&& fourthHintBtnColor == "#00FF00") 
		{
			$("img").toggleClass("button-active");
			setTimeout(function(){
				$("img").attr("src", "safe-open.jpg");
			},1000);

			setTimeout(function(){
				$("#game-screen").css("display", "none");
				$("#win-screen").css("display", "block");
			}, 2200);
			$("#win-screen").css("animation", "1.5s fadein 0.2s forwards");
			
		} else {
			$("img").toggleClass("button-active");
			setTimeout(function(){
				$("img").toggleClass("button-active");
			},1000);
		}
		tries--;
		$("span").text(tries);
	});

	$("#start").on("click", function(){
		$("#instruction").css("animation", "1s fadeout 0.2s forwards");
		setTimeout(function(){
			$("#instruction").css("display", "none");
			$("#game-screen").css("display", "block");
		}, 1200);
		$("#game-screen").css("animation", "1.5s fadein 0.2s forwards");
		init();
	});

	$(".replay").on("click", function(){
		$(".end-screen").css("animation", "1s fadeout 0.2s forwards");
		setTimeout(function(){
			$(".end-screen").css("display", "none");
			$("#game-screen").css("display", "block");
			$("img").attr("src", "safe-closed.jpg");
			init();
		}, 1200);
		
		$("#game-screen").css("animation", "1.5s fadein 0.2s forwards");
	})
})

function init(){
	tries = 5;
	$("span").text(tries);
	firstCorrect = Math.floor(Math.random()*10);
	secondCorrect = Math.floor(Math.random()*10);
	thirdCorrect = Math.floor(Math.random()*10);
	fourthCorrect = Math.floor(Math.random()*10);
	checkAnswer();
}

let tries = 5;

let firstCode = 0;
let secondCode = 0;
let thirdCode = 0;
let fourthCode = 0;

let firstCorrect = Math.floor(Math.random()*10);
let secondCorrect = Math.floor(Math.random()*10);
let thirdCorrect = Math.floor(Math.random()*10);
let fourthCorrect = Math.floor(Math.random()*10);

let firstHintBtnColor = "";
let secondHintBtnColor = "";
let thirdHintBtnColor = "";
let fourthHintBtnColor = "";


function checkAnswer() {
	let firstHint = Math.abs(Math.abs(firstCode - secondCode) - Math.abs(firstCorrect - secondCorrect));
	let secondHint = Math.abs(Math.abs(secondCode - thirdCode) - Math.abs(secondCorrect - thirdCorrect));
	let thirdHint = Math.abs(Math.abs(thirdCode - fourthCode) - Math.abs(thirdCorrect - fourthCorrect));
	let fourthHint = 0;
	if(firstCode == firstCorrect){
		fourthHint++;
	};
	if(secondCode == secondCorrect){
		fourthHint++;
	};
	if(thirdCode == thirdCorrect){
		fourthHint++;
	};
	if(fourthCode == fourthCorrect){
		fourthHint++;
	};

	firstHintBtnColor = checkFirstHint(firstHint);
	secondHintBtnColor = checkFirstHint(secondHint);
	thirdHintBtnColor = checkFirstHint(thirdHint);
	fourthHintBtnColor = checkLastHint(fourthHint);
	$("#first-hint").css("background", firstHintBtnColor);
	$("#second-hint").css("background", secondHintBtnColor);
	$("#third-hint").css("background", thirdHintBtnColor);
	$("#fourth-hint").css("background", fourthHintBtnColor);
}

function checkFirstHint(hint){
	if(hint == 0){
		return "#00FF00";
	} else if(hint == 1 || hint == 9) {
		if (Math.floor(Math.random() * 2) == 0){
			return "#00FFA2"
		} else {
			return "#C8FF00"
		}
	} else if(hint == 2 || hint == 8) {
		if (Math.floor(Math.random() * 2) == 0){
			return "#00FFDD"
		} else {
			return "#EAFF00"
		}
	} else if(hint == 3 || hint == 7) {
		if (Math.floor(Math.random() * 2) == 0){
			return "#0040FF"
		} else {
			return "#FF9D00"
		}
	} else if(hint == 4 || hint == 6) {
		return "#FF00DD";
	} else if(hint == 5) {
		return "#FF0000";
	}
}

function checkLastHint(hint){
	if(hint == 0){
		if (Math.floor(Math.random() * 2) == 0){
			return "#FF0000"
		} else {
			return "#FF00DD"
		}
	} else if(hint == 1){
		if (Math.floor(Math.random() * 2) == 0){
			return "#0040FF"
		} else {
			return "#FF9D00"
		}
	} else if(hint == 2){
		if (Math.floor(Math.random() * 2) == 0){
			return "#00FFDD"
		} else {
			return "#EAFF00"
		}
	} else if(hint == 3){
		if (Math.floor(Math.random() * 2) == 0){
			return "#00FFA2"
		} else {
			return "#C8FF00"
		}
	} else if(hint == 4){
		return "#00FF00"
	}
}

