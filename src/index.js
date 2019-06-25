import * as logic from './components/diceLogic'
import getResult from './components/leaderboardResult'

const {
    rollDice,
    saveScore,
    newGame
} = logic;

let rollButton = document.querySelector('.btn-roll');
let saveButton = document.querySelector('.btn-hold');
let newGameButton = document.querySelector('.btn-new');

rollButton.addEventListener('click', rollDice);
saveButton.addEventListener('click', saveScore);
newGameButton.addEventListener('click', newGame);

// Modal for result
let modal = document.querySelector('#myModal');
let btn = document.querySelector('.btn-leaderboard');
let span = document.querySelector('.close');

btn.addEventListener('click', function () {
    getResult();
    modal.style.display = 'block';
})

span.addEventListener('click', function () {
    modal.style.display = 'none';
})

window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
})