"use strict";

// selecting elements // And storing them into a variable
const score0EL = document.getElementById("score--0"); // no need to use the # selector when selecting with get element by ID
const score1EL = document.getElementById("score--1"); // get element by ID is another way of selecting elements but this one will one select the IDs
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
//
const diceEL = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
// player 1 is player 0 && player 2 is player 1

// variables // Starting Conditions
let scores = [0, 0],
  playing,
  activePlayer,
  currentScore;
// (playing) state variable, when true game will execute when false i.e when a player has won game will not execute

// functions

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
// Starting Conditions
init();

// Rolling dice functionality

btnRoll.addEventListener("click", () => {
  if (playing) {
    // state variable if-check
    let dice = Math.trunc(Math.random() * 6) + 1; // generating random dice roll
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`; // dynamically load the image of the dice in respect to the number that was rolled at random

    if (dice !== 1) {
      // checking if dice is equal to 1 or not equal to 1
      currentScore += dice; // adding dice to current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // selecting the score dynamically based on which is the active player right now
    } else {
      //switching to next player
      //
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // player0EL.classList.toggle("player--active"); /// the toggle method checks whether the give class is assigned to it, if it is, the class will be removed if its not, the class will be added, ?? returns a boolean ???, it is it better to use instead of using .contains() the .add() and then .remove() like we did the modal window project
      // player1EL.classList.toggle("player--active");

      switchPlayer();
    }
  }
});

// holding scores functionality

btnHold.addEventListener("click", () => {
  if (playing) {
    // state variable if-check
    // adding current score to active player's score

    scores[activePlayer] += currentScore;
    //   scores[0] = scores[0] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //   scores[activePlayer] = 0;

    // checking if score is greater or equal to 100

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`) // NB when we use querySelector we need and actually CSS selector
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
