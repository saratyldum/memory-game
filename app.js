const gameContainer = document.querySelector('.game-container');
const moves = document.querySelector('#moves-counter');
const time = document.querySelector('#time-counter');
const stopButton = document.querySelector('.stop-button');
const startButton = document.querySelector('.start-button');
const result = document.querySelector('#result');
const controls = document.querySelector('.controls-container');

let cardsWon = [];
let cardChosen = [];
let cardsChosenID = [];
let cards;
let timerID;
//Starter time
let seconds = 0;
let minutes = 0;
//starter moves
let moveCounter = 0;

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
}

function handleStopButtonClick() {
	stopGame();
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

	cardsArray.sort(() => 0.5 - Math.random());
	createBoard();
}

function stopGame() {
	cardsWon = [];
	controls.classList.remove('hide');
	startButton.classList.remove('hide')
	stopButton.classList.add('hide');
	clearInterval(timerID);
}

 function createBoard() {
	for (let index = 0; index < cardsArray.length; index++) {
		const cardContainer = document.createElement('div');
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
}

 function flipCard() {
	console.log(this);
	const cardID = this.getAttribute('data-id');	
	cardChosen.push(cardsArray[cardID].name);
	cardsChosenID.push(cardID);

	this.classList.add('flipCard')
	
	if (cardChosen.length === 2) {
		setTimeout(checkMatch, 500)
	}
}

function checkMatch() {
	 firstCard = cardsChosenID[0];
	 secondCard = cardsChosenID[1];

	 if (firstCard === secondCard) {
		cards[firstCard].classList.remove('flipCard');
		cards[secondCard].classList.remove('flipCard');  
	 }

	 if (cardChosen[0] === cardChosen[1]) {
		cardsWon.push(cardChosen)
		movesCounter()
	 } else  {
		cards[firstCard].classList.remove('flipCard');
		cards[secondCard].classList.remove('flipCard');  
		movesCounter()
	 }
	
	cardChosen = [];
	cardsChosenID = [];

	if(cardsWon.length == cardsArray.length/2) {		
		result.innerHTML = `<h2>You Won</h2> <h4>Moves: ${moveCounter}</h4>`
		stopGame();
	}
}
