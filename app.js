const gameContainer = document.querySelector('.game-container');
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
let seconds = 0;
let minutes = 0;
//starter moves
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
	moveCounter = 0;
	seconds = 0;
	minutes = 0;
	controls.classList.add('hide');
	startButton.classList.add('hide')
	stopButton.classList.remove('hide');

	//start timer
	timerID = setInterval(updateTimer, 1000);

	//initial moves
	moves.innerHTML = `<span>Moves:</span> ${moveCounter}`;
	time.innerHTML = `<span>Time:</span> 00:00`;
}

function shuffleCards() {
	cardsArray.sort(() => 0.5 - Math.random());
}

function stopGame() {
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
	card.tabIndex = 0;
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
	cardsWon.push(firstCard);

	firstCard.removeEventListener('click', flipCard)
	secondCard.removeEventListener('click', flipCard)

	 if(cardsWon.length == cardsArray.length/2) {		
		result.innerHTML = `<h2>You Won</h2> <h4>Moves: ${moveCounter}</h4>`
		stopGame();
	 }
	 
	resetBoard();
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

//Timer
function updateTimer() {
	seconds += 1;
	if (seconds >= 60) {
		minutes += 1;
		seconds = 0;
	}
	//formatting the time
	const secondsValue = seconds < 10 ? '0' + seconds : seconds;
	const minutesValue = minutes < 10 ? '0' + minutes : minutes;
	time.innerHTML = `<span>Time:</span> ${minutesValue}:${secondsValue}`;
}

//Counting the moves
function movesCounter() {
	moveCounter += 1;
	moves.innerHTML = `<span>Moves:</span> ${moveCounter}`;
};
