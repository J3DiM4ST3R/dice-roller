"use strict";

const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");
const totalDisplay = document.getElementById("total");
const rollBtn = document.getElementById("roll-btn");
const walletEl = document.getElementById("wallet");
const rollEl = document.getElementById("roll");
const statusEl = document.getElementById("status");

// Only one event listener, using backend roll
rollBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // Stops any form-related refresh

  try {
    const response = await fetch("/api/roll", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    
    // Update dice images based on backend values
    die1.src = `imgs/dice${data.die1}.png`;
    die2.src = `imgs/dice${data.die2}.png`;

    // Update total and last roll
    totalDisplay.textContent = `Total: ${data.roll}`;
    rollEl.textContent = data.roll;

    // Update wallet
    walletEl.textContent = data.wallet;
    
    // Update game status
    statusEl.textContent = data.status;
    
  } catch (err) {
  statusEl.textContent = "Error connecting to server.";
  console.error("Roll error:", err)
  }
});
