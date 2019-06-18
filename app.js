const RESET_VALUE = 2;
const GAME_LIMIT = 100;
const firstDiceElement = document.querySelector('#dice-1');
const secondDiceElement = document.querySelector('#dice-2');

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
let gameLimitValue = 0;

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('.btn-roll').removeAttribute('disabled')
  document.querySelector('.btn-hold').removeAttribute('disabled')
  gameLimitValue = parseInt(document.querySelector('input').value);
  firstDiceElement.style.display = 'none';
  secondDiceElement.style.display = 'none';

  if (isNaN(gameLimitValue)) {
    gameLimitValue = GAME_LIMIT;
  }
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  let firstDice = Math.floor(Math.random() * 6) + 1;
  let secondDice = Math.floor(Math.random() * 6) + 1;
  let diceSum = firstDice + secondDice;

  firstDiceElement.src = `./img/dice-${firstDice}.png`;
  firstDiceElement.style.display = 'inline-block';

  secondDiceElement.src = `./img/dice-${secondDice}.png`;
  secondDiceElement.style.display = 'inline-block';

  if (firstDice !== RESET_VALUE && secondDice !== RESET_VALUE && firstDice !== secondDice) {
    current += diceSum;
    document.getElementById('current-'+activePlayer).textContent = current;

    if (scores[activePlayer] + current >= gameLimitValue) {
      alert(`Player ${activePlayer} won!!!`);
    } 
  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  firstDiceElement.style.display = 'none';
  secondDiceElement.style.display = 'none';
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
