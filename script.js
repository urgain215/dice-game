"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//Initial Condition
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const changePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//Rolling Event
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generating random dice roll.
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Checking for 1 on dice.
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }

    //Display the dice.
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");
  }
});

//Holding Event
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Winner
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      alert(`Congrats Player ${activePlayer + 1}. You're a natural winner.`);
    } else {
      changePlayer();
    }
  }
});

//Challenge
btnNew.addEventListener("click", init);
