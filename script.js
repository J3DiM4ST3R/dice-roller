"use strict";

const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");
const totalDisplay = document.getElementById("total");
const rollBtn = document.getElementById("roll-btn");

function rollDice() {
  const roll1 = Math.floor(Math.random() * 6) + 1;
  const roll2 = Math.floor(Math.random() * 6) + 1;

  die1.src = `https://upload.wikimedia.org/wikipedia/commons/${getDieImage(roll1)}.svg`;
  die2.src = `https://upload.wikimedia.org/wikipedia/commons/${getDieImage(roll2)}.svg`;

  totalDisplay.textContent = `Total: ${roll1 + roll2}`;
}

function getDieImage(roll) {
  // SVG file naming pattern for dice 1–6
  const patterns = {
    1: "1/1b/Dice-1-b",
    2: "5/5f/Dice-2-b",
    3: "2/2c/Dice-3-b",
    4: "8/8d/Dice-4-b",
    5: "5/55/Dice-5-b",
    6: "f/f4/Dice-6-b"
  };
  return patterns[roll];
}

rollBtn.addEventListener("click", rollDice);
