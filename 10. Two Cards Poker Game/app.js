
// Declare variables in global to reuse in all function

const cardTypes = ["Spade", "Diamond", "Heart", "Clover"];

let spade;
let diamond;
let heart;
let clover;

let cards;

let userFirstCard;
let userSecondCard;
let dealerFirstCard;
let dealerSecondCard;

let userScore;
let dealerScore;

// Initialise cards && shuffle && deal && set score
function initialise() {
	spade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	diamond = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	heart = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	clover = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

	cards = [spade, diamond, heart, clover];
	cards.forEach(cardType => shuffle(cardType));

	userFirstCard = deal();
	userSecondCard = deal();
	dealerFirstCard = deal();
	dealerSecondCard = deal();

	userScore = score(userFirstCard, userSecondCard);
	dealerScore = score(dealerFirstCard, dealerSecondCard);

	firstCardDOM.textContent = userFirstCard;
	secondCardDOM.textContent = userSecondCard;
	firstDealerCardDOM.textContent = "";
	secondDealerCardDOM.textContent = "";
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Randomly select a card type
// Take out and return the first card in that card type array
function deal() {
	let randNum = Math.floor(Math.random() * 4);
	let cardType = cardTypes[randNum];
	let card = cards[randNum].slice(0, 1)[0];
	cards[randNum].shift();
	return [cardType, card];
}


// Score logic
// card[0] is card type (suit)
// card[1] is card number (rank)
function score(firstCard, secondCard) {
	if(firstCard[0] === secondCard[0]) {
		// straight flush
		if(Math.abs(firstCard[1] - secondCard[1]) === 1) {
			return 1;
		}
		// flush
		return 2;
	}
	if(Math.abs(firstCard[1] - secondCard[1]) === 1) {
		// straight
		return 3;
	}
	if(firstCard[1] === secondCard[1]) {
		// 1 pair
		return 4;
	}
	return 5;
}

// decide winner
let winner;

function checkScore(userScore, dealerScore) {
	if(userScore < dealerScore) {
		return "user";
	}
	if(userScore > dealerScore) {
		return "dealer";
	}
	// compare cards when score is the same
	if(userScore === dealerScore) {
		compareCard(userFirstCard, userSecondCard, dealerFirstCard, dealerSecondCard);
	}
}

function compareCard(userFirstCard, userSecondCard, dealerFirstCard, dealerSecondCard) {
	let userHigherCard = userFirstCard[1] > userSecondCard[1] ? userFirstCard[1] : userSecondCard[1];
	let delearHigherCard = dealerFirstCard[1] > dealerSecondCard[1] ? dealerFirstCard[1] : dealerSecondCard[1];
	if(userHigherCard > delearHigherCard) {
		return "user";
	} else {
		return "dealer";
	}
}


// DOM manipulation


// Expand and collapse rulebook
let expandButton = document.querySelector(".expand-button");
let ruleBook = document.querySelector(".rulebook__rules");

expandButton.addEventListener("click", function() {
	if(ruleBook.style.display === "none") {
		ruleBook.style.display = "block";
		expandButton.textContent = "-";
	} else {
		ruleBook.style.display = "none";
		expandButton.textContent = "+";
	}

});

// Select card content
let firstCardDOM = document.querySelectorAll(".user-card-text")[0];
let secondCardDOM = document.querySelectorAll(".user-card-text")[1];
let firstDealerCardDOM = document.querySelectorAll(".dealer-card-text")[0];
let secondDealerCardDOM = document.querySelectorAll(".dealer-card-text")[1];

// Initialise and Select chips
let userChipAmount = 1000;
let userChips = document.querySelector(".user-chips");

let dealerChipAmount = 5000;
let dealerChips = document.querySelector(".dealer-chips");

let bettingChipAmount = 0;
let bettingChips = document.querySelector(".betting-chips");

// Betting button
let betButton = document.querySelector(".bet-button");
betButton.addEventListener("click", function() {
	if(userChipAmount === 0) {
		status.textContent = "You Don't Have Enough Chips";
		status.style.visibility = "visible";
		return;
	}
	userChipAmount -= 50;
	dealerChipAmount -= 50;
	bettingChipAmount += 100;
	userChips.textContent = userChipAmount;
	dealerChips.textContent = dealerChipAmount;
	bettingChips.textContent = bettingChipAmount;
});


// Open card logic
let status = document.querySelector(".winner-status");

let openButton = document.querySelector(".open-button");
openButton.addEventListener("click", function() {
	firstDealerCardDOM.textContent = dealerFirstCard;
	secondDealerCardDOM.textContent = dealerSecondCard;
	winner = checkScore(userScore, dealerScore);
	if(winner === "user") {
		userChipAmount += bettingChipAmount;
		bettingChipAmount = 0;
		status.textContent = "YOU WON!!!";
	} else {
		dealerChipAmount += bettingChipAmount;
		bettingChipAmount = 0;
		status.textContent = "DEALER WON"
	}
	userChips.textContent = userChipAmount;
	dealerChips.textContent = dealerChipAmount;
	bettingChips.textContent = bettingChipAmount;
	status.style.visibility = "visible";
	setTimeout(function(){
		status.style.visibility = "hidden";
		initialise();
	}, 2000)
})

initialise();