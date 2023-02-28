
const startGame = document.getElementById("start");
const game = document.getElementById("game");
const result = document.getElementById("result");
const countdown = document.getElementById("countdown");

const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const resetScore = document.getElementById("reset");

const selectRock = document.getElementById("select-rock");
const selectPaper = document.getElementById("select-paper");
const selectScissors = document.getElementById("select-scissors");

let isRunning = false;
let selection = null;

const delay = ms => new Promise(res => setTimeout(res, ms));

// returns 0 on tie, 1 on win, -1 on loss
function findWinner(player, computer) {
    if (player === computer) {
        return 0;
    } else if ((player+1)%3 === computer) { // rock < paper < scissors < rock
        return -1;
    } else {
        return 1;
    }
}
function endGame() {
    isRunning = false;
    game.classList.remove("running");
    result.classList.add("show");

    let options = ["Rock", "Paper", "Scissors"];
    // 0 is rock, paper is 1, scissors are 2
    const computerGuess = Math.floor(Math.random()*3);
    let playerGuess = null;

    if (selection === selectRock) {
        playerGuess = 0;
    } else if (selection === selectPaper) {
        playerGuess = 1;
    } else if (selection === selectScissors) {
        playerGuess = 2;
    }

    result.textContent = "The computer guessed " + options[computerGuess] + ", ";
    if (playerGuess === null) {
        result.textContent += "but you didnt do anything!";
    } else {
        selection.classList.remove("selection");
        selection = null;

        result.textContent += "and you guessed " + options[playerGuess] + ". ";
        let gameResult = findWinner(playerGuess, computerGuess);
        
        if (gameResult === 1) {
            result.textContent += "Thats a win for you!";
            playerScore.textContent = parseInt(playerScore.textContent) + 1;
        } else if (gameResult === 0) {
            result.textContent += "Looks like a tie!";
        } else {
            result.textContent += "Game over.";
            computerScore.textContent = parseInt(computerScore.textContent) + 1;
        }
    }
}

startGame.addEventListener("click", async () => {
    if (isRunning) {
        return;
    }
    isRunning = true;
    game.classList.add("running");
    result.classList.remove("show");

    countdown.textContent = "3";
    await delay(1000);
    countdown.textContent = "2";
    await delay(1000);
    countdown.textContent = "1";
    await delay(1000);
    countdown.textContent = "0";

    await delay(1000);
    endGame();
});

function select(option) {
    if (selection) {
        selection.classList.remove("selection");
    }
    selection = option;
    selection.classList.add("selection");
}
selectRock.addEventListener("click", () => { select(selectRock); });
selectPaper.addEventListener("click", () => { select(selectPaper); });
selectScissors.addEventListener("click", () => { select(selectScissors); });

resetScore.addEventListener("click", () => {
    playerScore.textContent = "0";
    computerScore.textContent = "0";
});