const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const resultMessageElement = document.getElementById("result-message");
const resultFace = document.getElementById("result-face"); // Correctly reference the result-face element
const winSound = document.getElementById("win-sound");

document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", function () {
    const userChoice = this.id;
    const computerChoice = getComputerChoice();
    playGame(userChoice, computerChoice);
  });
});

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playGame(userChoice, computerChoice) {
  animateHands(userChoice, computerChoice);

  setTimeout(() => {
    const result = getResult(userChoice, computerChoice);

    if (result === "You win!") {
      playerScore++;
      resultFace.src =
        "https://cdn-icons-mp4.freepik.com/512/11175/11175791.mp4"; 
      winSound.play();
    } else if (result === "You lose!") {
      computerScore++;
      resultFace.src =
        "https://cdn-icons-png.freepik.com/512/4160/4160755.png?ga=GA1.1.1963072017.1723226032"; // Lose face
    } else {
      resultFace.src =
        "https://cdn-icons-png.freepik.com/512/10739/10739930.png"; 
    }

    updateScore();
    resultMessageElement.textContent = `Result: ${result}`;
  }, 1000);
}

function animateHands(userChoice, computerChoice) {
  playerHand.src = `https://img.freepik.com/premium-vector/cheerful-young-individual-with-bright-smile-showcases-lively-personality-flat-design-young-happy-customizable-flat-illustration_538213-138298.jpg`;
  computerHand.src = `https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg`;

  playerHand.classList.add("active");
  computerHand.classList.add("active");

  setTimeout(() => {
    playerHand.classList.remove("active");
    computerHand.classList.remove("active");
  }, 1000);
}

function getResult(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "It's a draw!";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    return "You win!";
  } else {
    return "You lose!";
  }
}

function updateScore() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}
