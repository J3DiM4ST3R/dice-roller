const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

let wallet = 100;
let point = null;
let isFirstRoll = true;

// Serve static files (frontend) from public folder
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// API route to handle dice roll
app.post("/api/roll", (req, res) => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const roll = die1 + die2;
    
    let status = "";

    // Game Logic
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

    // Send result back to client
    res.json({
        die1,
        die2,
        roll,
        wallet,
        point,
        status
    });
});

// Reset for a new game
function resetGame() {
    isFirstRoll = true;
    point = null;
}

// Start the server
app.listen(PORT, () => {
    console.log(`🎲 Server running on http://localhost:${PORT}`);
});