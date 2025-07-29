let randomNumber = Math.floor(Math.random() * 11);
let attempts = 0;
const maxAttempts = 3;
let score = 0;

function startGame() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  updateScore();
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  const compteur = document.getElementById("compteur");
  const solution = document.getElementById("solution");
  const victoryEffect = document.getElementById("victoryEffect");
  const defeatEffect = document.getElementById("defeatEffect");

  victoryEffect.classList.add("hidden");
  defeatEffect.classList.add("hidden");

  if (isNaN(guess) || guess < 0 || guess > 10) {
    message.textContent = "Le cristal ne répond qu'aux nombres entre 0 et 10 !";
    return;
  }

  attempts++;

  if (guess === randomNumber) {
    document.getElementById("soundCorrect").play();
    message.textContent = "🌟 Le sort est brisé !";
    victoryEffect.classList.remove("hidden");
    score++;
    updateScore();
    endGame();
  } else {
    document.getElementById("soundWrong").play();
    message.textContent = "L'incantation a échoué...";
    compteur.textContent = `Essais : ${attempts}/3`;
    document.querySelector(".game").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".game").classList.remove("shake");
    }, 500);

    if (attempts >= maxAttempts) {
      defeatEffect.classList.remove("hidden");
      message.textContent = "💀 Le cristal s'est obscurci...";
      solution.textContent = `Le nombre était : ${randomNumber}`;
      endGame();
    }
  }
}

function endGame() {
  document.getElementById("guessInput").disabled = true;
  document.querySelector("button").disabled = true;
  document.getElementById("restartBtn").style.display = "inline-block";
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 11);
  attempts = 0;
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  document.querySelector("button").disabled = false;
  document.getElementById("message").textContent = "";
  document.getElementById("compteur").textContent = "";
  document.getElementById("solution").textContent = "";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("victoryEffect").classList.add("hidden");
  document.getElementById("defeatEffect").classList.add("hidden");
}

function updateScore() {
  document.getElementById("score").textContent = `Score magique : ${score}`;
}

document.getElementById("guessInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

console.log("Nombre magique :", randomNumber);
