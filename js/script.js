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

  // Always force 7 or 11 on the first roll
  if (isFirstRoll) {
  if (Math.random() < 0.90) {
    // Roll adds up to 7
    const possibleSevens = [
      [1, 6],
      [2, 5],
      [3, 4],
      [4, 3],
      [5, 2],
      [6, 1]
    ];
    [die1Val, die2Val] = possibleSevens[Math.floor(Math.random() * possibleSevens.length)];
  } else {
    // Roll adds up to 11
    const possibleElevens = [
      [5, 6],
      [6, 5]
    ];
    [die1Val, die2Val] = possibleElevens[Math.floor(Math.random() * possibleElevens.length)];
  }
} else {
    // Normal rolls after the first
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
