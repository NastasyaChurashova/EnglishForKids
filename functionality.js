import { cardsData, categoryData } from "./cardsData.js";

const container = document.querySelector(".container");
const switcher = document.querySelector(".switch");
const startBtn = document.querySelector(".start-game");
const correctSound = document.querySelector(".audio-correct");
const wrongSound = document.querySelector(".audio-wrong");
const statisticsLink = document.querySelector(".statistics-link");

// 	GLOBAL VARIABLES

let currentCategory = "Wild Animals";
let selectedCardEl = null;
let mode = "train";

const getCardTemplate = (card, type) => `
<div class="flip-container" id=${card.cardName} ontouchstart="this.classList.toggle('hover');">
    <div class="flippable fruits">
    <div class="front">
    <img src=${card.img} alt=${card.cardName}>
   ${type === "category" ? "" : `<audio class="audio"><source src=${card.audio} type="audio/mp3"></audio>`}
    ${
			mode === "play"
				? ""
				: `<img src="./assets/flip_btn.png" class="flip_btn" alt="flip">
        <span class="cardNameSpan">${card.cardName}</span>`
		}
        <i class="fruit"></i>
    </div>
    <div class="back">
      <img src=${card.img} >
      <span class="cardNameSpan">${card.cardNameRu}</span>
      <img src="./assets/flip_btn.png" class="flip_btn" alt="flip">
      </div>
    </div>
  </div>
`;

const addFlipAndAudioEvents = (cardEl, type) => {
	const flipButtons = cardEl.querySelectorAll(".flip_btn");
	const flippable = cardEl.querySelector(".flippable");

	flipButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			flippable.classList.toggle("flipme");
		});
	});

	if (type === "category") {
		cardEl.addEventListener("click", () => {
			renderCards(cardEl.querySelector(".cardNameSpan").innerText);
		});
	} else {
		cardEl.addEventListener("click", () => {
			const audio = cardEl.querySelector(".audio");

			if (audio) {
				audio.play();
			}
		});
	}
};

const renderCards = (category, mode) => {
	currentCategory = category;
	container.innerHTML = "";
	const section = document.createElement("section");
	cardsData[category.toLowerCase()].forEach((card) => {
		const html = getCardTemplate(card);
		section.innerHTML += html;
	});

	container.appendChild(section);

	const allCards = document.querySelectorAll(".flip-container");

	if (mode === "play") {
		allCards.forEach((cardEl) => {
			cardEl.addEventListener("click", (e) => {

const clickedCard = cardsData[category.toLowerCase()].find(el=> el.cardName === cardEl.id)
				console.log("clicjedCard datra", clickedCard)
		clickedCard.attempts = clickedCard.attempts + 1

				if (selectedCardEl.id === cardEl.id) {
					// CORRECT ANSWER
					correctSound.play();
				} else {
					// WRONG ANSWER
					wrongSound.play();
				}

				setTimeout(playRandomSound, 1000);
			});
		});
	} else {
		allCards.forEach((cardEl) => addFlipAndAudioEvents(cardEl));
	}
};

	const renderTable = () => {
		container.innerHTML = "";
		tableCreate()
	}


const categoryNames = document.querySelectorAll(".nav-link");
categoryNames.forEach((el) => {
	el.addEventListener("click", (e) => {
		renderCards(e.target.innerText.toLowerCase());
	});
});

// -----------------MAIN---displays---categoryData

const mainLink = document.querySelector(".main-link");
mainLink.addEventListener("click", (e) => {
	container.innerHTML = "";
	const section = document.createElement("section");
	Object.values(categoryData).forEach((card) => {
		const html = getCardTemplate(card, "category");
		section.innerHTML += html;
	});
	container.appendChild(section);
	const allCards = document.querySelectorAll(".flip-container");
	allCards.forEach((cardEl) => addFlipAndAudioEvents(cardEl, "category"));
});

// ------------START BTN appears
switcher.addEventListener("change", (e) => {
	if (e.target.checked) {
		startBtn.style.display = "block";
		mode = "play";
		const span = startBtn.querySelector(".round-button")
		span.textContent = "Start"
		renderCards(currentCategory);
	} else {
		mode = "train";
		renderCards(currentCategory);
		startBtn.style.display = "none";
	}
});

// -------------PLAY MODE

const playRandomSound = () => {
	const randomNum = Math.floor(Math.random() * cardsData[currentCategory.toLowerCase()].length);

	const selectedCard = cardsData[currentCategory.toLowerCase()][randomNum];

	selectedCardEl = document.querySelector(`#${selectedCard.cardName}`);

	const audio = selectedCardEl.querySelector(".audio");

	audio.play();

};

startBtn.addEventListener("click", () => {
	renderCards(currentCategory, "play");

	const span = startBtn.querySelector(".round-button")

	if(	span.textContent === "Repeat"){
		const audio = selectedCardEl.querySelector(".audio");
		console.log("audi?", audio)
		audio.play();

	} else {
		span.textContent = "Repeat"
		playRandomSound();
	}

});

statisticsLink.addEventListener("click", renderTable)

renderCards("Home Animals");

//  STATISTICS TABLE------START

function tableCreate() {
	const body = document.body,
		tbl = document.createElement("table");
	tbl.innerHTML =
		"<thead><tr><th>Category</th><th>Word</th><th>Translation</th><th>Attempts</th><th>Correct</th><th>Incorrect</th><th>Percentage</th></tr></thead>";
	tbl.style.width = "1000px";
	tbl.style.border = "1px solid black";

	Object.keys(cardsData).forEach((category) => {
		cardsData[category].forEach((wordObj, i) => {
			const tr = tbl.insertRow();
			tr.style.border = "1px solid black";
			for (let j = 0; j < 7; j++) {
				const td = tr.insertCell();

				if (j === 0) {
					td.appendChild(document.createTextNode(category));
				}

				if (j === 1) {
					td.appendChild(document.createTextNode(wordObj.cardName));
				}
				if (j === 2) {
					td.appendChild(document.createTextNode(wordObj.cardNameRu));
				}

				if (j === 3) {
					td.appendChild(document.createTextNode(wordObj.attempts));
				}

				if (j === 4) {
					td.appendChild(document.createTextNode(wordObj.correct));
				}
				if (j === 5) {
					td.appendChild(document.createTextNode(wordObj.incorrect));
				}
				if (j === 6) {
					const percentage = (wordObj.correct / wordObj.attempts) * 100 + "%";

					const text = isNaN(percentage) ? 0 : percentage
					td.appendChild(document.createTextNode(text));
				}

				td.style.border = "1px solid black";
			}
		});
	});

	container.appendChild(tbl);
}



