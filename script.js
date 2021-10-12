"use strict";

const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

const diceEL = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
// player 1 is player 0 && player 2 is player 1

let scores = [0, 0],
  playing,
  activePlayer,
  currentScore;

const init = () => {
  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  diceEL.classList.add("hidden");
  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

init();

btnRoll.addEventListener("click", () => {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      playing = false;
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      btnHold.classList.add("hidden");
      btnRoll.classList.add("hidden");
      diceEL.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
