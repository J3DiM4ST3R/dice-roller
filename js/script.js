"use strict";

let wallet = 100;
let point = null;
let isFirstRoll = true;

const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");
const totalDisplay = document.getElementById("total");
const rollBtn = document.getElementById("roll-btn");
const walletEl = document.getElementById("wallet");
const rollEl = document.getElementById("roll");
const statusEl = document.getElementById("status");

rollBtn.addEventListener("click", () => {
  // Simulate dice rolls
  //const die1Val = Math.floor(Math.random() * 6) + 1;
  //const die2Val = Math.floor(Math.random() * 6) + 1;
  //const roll = die1Val + die2Val;

  // 35% chance to "trick" the dice
  let die1Val, die2Val;
  
  if (Math.random() < 0.70) {
    die1Val = 5;
    die2Val = 6;
  } else {
    die1Val = Math.floor(Math.random() * 6) + 1;
    die2Val = Math.floor(Math.random() * 6) + 1;
  }

  const roll = die1Val + die2Val;
  
  // Update dice images
  die1.src = `assets/imgs/dice${die1Val}.png`;
  die2.src = `assets/imgs/dice${die2Val}.png`;

  // Display total and last roll
  totalDisplay.textContent = `Total: ${roll}`;
  rollEl.textContent = roll;

  // Game logic
  let status = "";

  if (isFirstRoll) {
    wallet -= 1;
    if (roll === 7 || roll === 11) {
      wallet += 2;
      status = "Win on first roll!";
      resetGame();
    } else if (roll === 2) {
      status = "Loss on first roll.";
      resetGame();
    } else {
      point = roll;
      isFirstRoll = false;
      status = `Point set to ${point}.`;
    }
  } else {
    if (roll === point) {
      wallet += 2;
      status = `Hit the point ${point}! You win!`;
      resetGame();
    } else if (roll === 7) {
      status = "Rolled a 7. You lose.";
      resetGame();
    } else {
      status = `Rolled ${roll}. Still trying for ${point}...`;
    }
  }

  // Update wallet and status
  walletEl.textContent = wallet;
  statusEl.textContent = status;
});

function resetGame() {
  isFirstRoll = true;
  point = null;
}
