/* Initial values */

const cardContainer = document.querySelector(".container");

const colorList = ["#ECDB54", "#E94B3C", "#6F9FD8", 
					"#00A591", "#EC9787", "#6B5B95", 
					"#DBB1CD", "#EADEDB", "#C0AB8E", 
					"#F0EDE5", "#2E4A62", "#672E3B"];

/*let cardNum;
let colorCards;
let newColorList;
let randomColor;

 Initialise Game

function initialise() {

}*/

let cardNum = 18;

for(let i = 0; i < cardNum; i++) {
	let div = document.createElement("div");
	div.setAttribute("class", "card");
	cardContainer.appendChild(div);

	let innerDiv = document.createElement("div");
	innerDiv.setAttribute("class", "colorCard");
	div.appendChild(innerDiv);
};

// Assigning random colors

let colorCards = document.querySelectorAll(".colorCard");



let newColorList = colorList.slice(0, cardNum/2);
let randomColor = [];

newColorList.forEach(color => {
	randomColor.push(color);
	randomColor.push(color);
});

shuffle(randomColor);


colorCards.forEach((card, index) => {
	card.style.background = randomColor[index];
});


// Fisher-Yates shuffle algorithm

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// game logic on click

const cards = document.querySelectorAll(".card");

let cardFlipped = false;
let anotherCardFlipped = false;
let previousCard;
let mistakeNumber = 0;
let startTime = 5;

cards.forEach(card => {
	card.children[0].style.zIndex = 1;
	cardFlipped = true;
	setTimeout(function(){
		card.children[0].style.zIndex = -1;
		cardFlipped = false;
		document.querySelector("#instant-status").textContent = null;
	}, 5000)
})


cards.forEach(card =>{
	card.addEventListener("click", function(){
		if(anotherCardFlipped) {
			card.children[0].style.zIndex = 1;
			if(card.children[0].style.background == previousCard.children[0].style.background) {
				console.log("ahh")
				cardFlipped = false;
				card.style.zIndex = -1;
				previousCard.style.zIndex = -1;

				document.querySelector("#instant-status").textContent = "CORRECT!";
			} else {
				setTimeout(function(){
					card.children[0].style.zIndex = -1;
					previousCard.children[0].style.zIndex = -1;
					cardFlipped = false;

					document.querySelector("#instant-status").textContent = null;					
				}, 1000)
				mistakeNumber++;
				document.querySelector("#instant-status").textContent = "WRONG!";
				document.querySelector("#mistake-number").textContent = mistakeNumber;
			}

			
			anotherCardFlipped = false;
		} else if(!cardFlipped) {
			previousCard = card
			card.children[0].style.zIndex = 1;
			anotherCardFlipped = true;
			cardFlipped = true;
		}
	})	
})
