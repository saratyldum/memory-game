const gameContainer = document.querySelector('.game-container');
const highScore = document.querySelector('#highscore');
const moves = document.querySelector('#moves-counter');
const time = document.querySelector('#time-counter');
const stopButton = document.querySelector('.stop-button');
const startButton = document.querySelector('.start-button');
const result = document.querySelector('#result');
const controls = document.querySelector('.controls-container');

let cardsWon = [];
let cards;
let firstCard, secondCard, firstCardID, secondCardID;
//Starter time
let timerID;
let currentTime = 30;
//starter moves
let highscore = '';
let moveCounter = 0;
let lockBoard = false;
let hasFlippedCard = false;

const cardsArray = [
	{
		name: 'fox',
		img: 'assets/animals/fox.png',
		category: 'animals',
	},
	{
		name: 'pig',
		img: 'assets/animals/pig.png',
		category: 'animals',
	},
	{
		name: 'rabbit',
		img: 'assets/animals/rabbit.png',
		category: 'animals',
	},
	{
		name: 'racoon',
		img: 'assets/animals/racoon.png',
		category: 'animals',
	},
	{
		name: 'moose',
		img: 'assets/animals/moose.png',
		category: 'animals',
	},
	{
		name: 'cow',
		img: 'assets/animals/cow.png',
		category: 'animals',
	},
	{
		name: 'fox',
		img: 'assets/animals/fox.png',
		category: 'animals',
	},
	{
		name: 'pig',
		img: 'assets/animals/pig.png',
		category: 'animals',
	},
	{
		name: 'rabbit',
		img: 'assets/animals/rabbit.png',
		category: 'animals',
	},
	{
		name: 'racoon',
		img: 'assets/animals/racoon.png',
		category: 'animals',
	},
	{
		name: 'moose',
		img: 'assets/animals/moose.png',
		category: 'animals',
	},
	{
		name: 'cow',
		img: 'assets/animals/cow.png',
		category: 'animals',
	},
];

//start game
startButton.addEventListener('click', handleStartButtonClick);
stopButton.addEventListener('click', handleStopButtonClick);

function handleStartButtonClick() {
	timerID = setInterval(updateTimer, 1000);
	initializeGame();
	shuffleCards();
	createBoard();
}

function handleStopButtonClick() {
	stopGame();
	clearInterval(timerID);
}

function initializeGame() {
	gameContainer.innerHTML = "";
	result.innerHTML = "";
	currentTime = 30;
	moveCounter = 0;
	highscore = highscore;
	controls.classList.add('hide');
	startButton.classList.add('hide')
	stopButton.classList.remove('hide');

	//initial moves
	highScore.innerHTML = `<span>Highscore:</span> ${highscore}`;
	moves.innerHTML = `<span>Moves:</span> ${moveCounter}`;
	time.innerHTML = `<span>Time left:</span> ${currentTime}`;
}

function shuffleCards() {
	cardsArray.sort(() => 0.5 - Math.random());
}

function stopGame() {
	clearInterval(timerID);
	cardsWon = [];
	controls.classList.remove('hide');
	startButton.classList.remove('hide')
	stopButton.classList.add('hide');
}

function createBoard() {
	for (let index = 0; index < cardsArray.length; index++) {
		const cardContainer = document.createElement('button');
		const cardBack = document.createElement('div');
		const cardFront = document.createElement('div');
		const cardImage = document.createElement('img');
		
		cardBack.innerHTML = '?'
		
		cardContainer.classList.add('card-container');
		cardBack.classList.add('card-backside');
		cardFront.classList.add('card-frontside');
		cardImage.classList.add('card-image');
		cardContainer.setAttribute('data-id', index);
		cardImage.setAttribute('src', `${cardsArray[index].img}`);

		gameContainer.appendChild(cardContainer);
		cardContainer.appendChild(cardBack);
		cardContainer.appendChild(cardFront);
		cardFront.appendChild(cardImage);
	}

	cards = document.querySelectorAll('.card-container');
	cards.forEach((card) => {
		card.addEventListener('click', flipCard);
	});
}

 function flipCard() {
	if (lockBoard) return;
	//disable double clicking
	if (this === firstCard) return;

	this.classList.add('flipCard');

	if (!hasFlippedCard) {
		//first click
		hasFlippedCard = true;
		firstCard = this;
		firstCardID = this.getAttribute('data-id');
	} else {
		//second click
		hasFlippedCard = false;
		secondCard = this;
		secondCardID = this.getAttribute('data-id');
		checkMatch()
	}
}

function checkMatch() {
	let isMatch = cardsArray[firstCardID].name=== cardsArray[secondCardID].name;

	isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard)
	secondCard.removeEventListener('click', flipCard)

	checkForWin();
	resetBoard();
}

function checkForWin() {
	cardsWon.push(firstCard);

	if(cardsWon.length == cardsArray.length/2) {		
		result.innerHTML = `<h2>You Won</h2> <h4>Moves: ${moveCounter + 1}</h4>`
		updateHighscore();
		stopGame();
	 }
}

function unFlipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flipCard')
		secondCard.classList.remove('flipCard')
		
		resetBoard();
	}, 1000)
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
	movesCounter();
}

function updateHighscore() {
	if (highscore == '' || (moveCounter < highscore)) {
		highscore = moveCounter + 1;
		highScore.innerHTML = `<span>Highscore:</span> ${highscore}`
	} 
}

//Timer
function updateTimer() {
	currentTime--;
	time.innerHTML = `<span>Time left:</span> ${currentTime}`;

	if(currentTime === 0 ){
		clearInterval(timerID);
		result.innerHTML = '<h2>You lost..</h2>'

		stopGame()
	}
}

//Counting the moves
function movesCounter() {
	moveCounter += 1;
	moves.innerHTML = `<span>Moves:</span> ${moveCounter}`;
};
