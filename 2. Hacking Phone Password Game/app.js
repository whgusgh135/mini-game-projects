$(document).ready(function(){
	// dont allow inputs other than numbers
	$("#guess").keydown(function(e){
		if (e.keyCode == 13){
			checkAnswer($("#guess"));
 			$("input").attr("placeholder", $("input").val());
			$("input").val("");
			$("input").focus();
		};
		if (e.keyCode == 8){
			return;
		};
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        };
	})
})

$("#submit-button").on("click", function(){
	checkAnswer($("#guess"));
	$("input").attr("placeholder", $("input").val());
	$("input").val("");
	$("input").focus();
});

$("#start-button").on("click", function(){
	gameStart();
})

var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var password = [];
var tempPass = [];
var guesses = [];
var correctVal = 0;
var correctPos = 0;
var maxAttempt = 10;

for(var i = 0; i < 4; i++){
	var index = Math.floor(Math.random() * 10) - i;
	var ranNum = numbers.splice(index, 1);
	password.push(Number(ranNum[0]));
};

function gameStart() {
	$(".background").css("animation", "1.4s fade 0.1s forwards")
	setTimeout(function(){
		$(".background").css("display", "none");
	}, 1500);
}

function checkAnswer(value) {
	correctVal = 0;
	correctPos = 0;
	password.forEach(val => tempPass.push(val));
	guesses = value.val().split("");
	for(var i = 0; i < guesses.length; i++) {
		if (guesses[i] == tempPass[i]) {
			correctPos++;
			tempPass[i] = null;
		}
	};
	for(var i = 0; i < guesses.length; i++) {
		if (tempPass.indexOf(Number(guesses[i])) > -1){
			correctVal++;
			tempPass[tempPass.indexOf(Number(guesses[i]))] = null;
		}
	};
	maxAttempt--;
	$("#attempts").text(maxAttempt);
	tempPass = [];
	showCorrect();
	if(correctPos == 4) {
		wonGame();
	}
	if(maxAttempt == 0) {
		lostGame();
	}
}

function showCorrect() {
	$(".answer-status").css("background-color", "grey")
	for(var i = 1; i <= correctPos; i++){
		var sign = "#span-" + i;
		$(sign).css("background-color", "red")
	}
	for(var k = correctPos + 1; k <= correctPos + correctVal; k++){
		var sign = "#span-" + k;
		$(sign).css("background-color", "green")
	}
	$("#correct-position").text(correctPos + " numbers are in correct positions.")
	$("#correct-value").text(correctVal + " numbers are contained in the password, but not in correct position.")
}

function wonGame() {
	$(".game-screen").css("display", "none");
	$(".won-screen").css("display", "block");
	$(".won-screen").css("opacity", "1");
	$(".game-outro").css("display", "block");
	$(".game-outro").css("animation", "1s fadein 0.5s forwards")
}

function lostGame() {
	$(".game-screen").css("display", "none");
	$(".lose-screen").css("display", "block");
	$(".lose-screen").css("opacity", "1");
	$(".game-outro").css("display", "block");
	$(".game-outro").css("animation", "1s fadein 0.5s forwards")
}