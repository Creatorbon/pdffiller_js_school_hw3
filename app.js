const RESET_VALUE = 2;
const GAME_LIMIT = 100;
const firstDiceElement = document.querySelector('#dice-1');
const secondDiceElement = document.querySelector('#dice-2');

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
let gameLimitValue = 0;
let firstPlayer;
let secondPlayer;

function Gamer(name, score) {
  this.name = name;
  this.score = score || 0;
}

Gamer.prototype.getScore = function () {
  return this.score
}
Gamer.prototype.setScore = function () {
  return this.score++
}
Gamer.prototype.resetScore = function () {
  return this.score = 0
}

const initPlayer = () => {
  let name = prompt('What is your name?', 'Player');

  if (name === null) {
    name = 'Player#' + Math.floor(Math.random() * 100);
  }

  if (localStorage.getItem(name) !== null) {
    let isPlayer = confirm(`${name} is you?`);

    if (!isPlayer) {
      name = name + '#' + Math.floor(Math.random() * 100);
      return new Gamer(name);
    } else {
      return new Gamer(name, localStorage.getItem(name));
    }
  }
  return new Gamer(name);
}

const disabledButton = () => {
  document.querySelector('.btn-roll').toggleAttribute('disabled')
  document.querySelector('.btn-hold').toggleAttribute('disabled')
}

const initGame = () => {
  firstPlayer = initPlayer();
  secondPlayer = initPlayer();
  document.querySelector('#name-0').textContent = firstPlayer.name;
  document.querySelector('#name-1').textContent = secondPlayer.name;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  gameLimitValue = parseInt(document.querySelector('input').value);
  firstDiceElement.style.display = 'none';
  secondDiceElement.style.display = 'none';
  disabledButton();

  if (isNaN(gameLimitValue)) {
    gameLimitValue = GAME_LIMIT;
  }
}

// Roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
  let firstDice = Math.floor(Math.random() * 6) + 1;
  let secondDice = Math.floor(Math.random() * 6) + 1;
  let diceSum = firstDice + secondDice;

  firstDiceElement.src = `./img/dice-${firstDice}.png`;
  firstDiceElement.style.display = 'inline-block';

  secondDiceElement.src = `./img/dice-${secondDice}.png`;
  secondDiceElement.style.display = 'inline-block';

  if (firstDice !== RESET_VALUE && secondDice !== RESET_VALUE && firstDice !== secondDice) {
    current += diceSum;
    document.getElementById('current-' + activePlayer).textContent = current;

    if (scores[activePlayer] + current >= gameLimitValue) {
      if (activePlayer === 0) {
        firstPlayer.setScore();
        localStorage.setItem(firstPlayer.name, firstPlayer.score);
        disabledButton();
        alert(`${firstPlayer.name} won!!!!!!!!`);
      } else {
        secondPlayer.setScore();
        localStorage.setItem(secondPlayer.name, secondPlayer.score);
        disabledButton();
        alert(`${secondPlayer.name} won!!!!!!!!`);
      }
    }
  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-' + activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  firstDiceElement.style.display = 'none';
  secondDiceElement.style.display = 'none';
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

// Save button
document.querySelector('.btn-hold').addEventListener('click', function () {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});

// New game button
document.querySelector('.btn-new').addEventListener('click', function () {
  if (scores[activePlayer] < gameLimitValue) {
    disabledButton();
  }
  initGame();
;});

const sortResult = () => {
  let sortable = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    sortable.push([key, value]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  
  return sortable;
}

// Get result from localStorage
const getResult = () => {
  let ol = document.createElement('ol');
  let sortableResult = sortResult();

  sortableResult.forEach(element => {
    let li = document.createElement('li');
    li.textContent = `${element[0]}: ${element[1]}`;
    ol.appendChild(li);
  });

  document.querySelector('.modal-content').appendChild(ol);
}

// Modal for result
let modal = document.querySelector('#myModal');
let btn = document.querySelector('.btn-leaderboard');
let span = document.querySelector('.close');

btn.onclick = function () {
  getResult();
  modal.style.display = 'block';
}

span.onclick = function () {
  modal.style.display = 'none';
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}