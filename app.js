const gameContainer = document.querySelector('.game-container');
const moves = document.querySelector('#moves-counter');
const time = document.querySelector('#time-counter');
const stopButton = document.querySelector('.stop-button');
const startButton = document.querySelector('.start-button');
const result = document.querySelector('#result');
const controls = document.querySelector('.controls-container');

const cardsWon = [];
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
