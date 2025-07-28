let randomNumber = Math.floor(Math.random() * 11);
let attempts = 0;
const maxAttempts = 3;

function startGame() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  const compteur = document.getElementById("compteur");
  const solution = document.getElementById("solution");
  const winVideo = document.getElementById("winVideo");
  const loseVideo = document.getElementById("loseVideo");

  if (isNaN(guess) || guess < 0 || guess > 10) {
    message.textContent = "Le cristal ne répond qu'aux nombres entre 0 et 10 !";
    return;
  }

  attempts++;

  if (guess === randomNumber) {
    // Victoire
    document.getElementById("soundCorrect").play();
    message.textContent = "🌟 Le sort est brisé !";
    winVideo.classList.remove("hidden-video");
    winVideo.play();
    endGame();
  } else {
    // Échec
    document.getElementById("soundWrong").play();
    message.textContent = "L'incantation a échoué...";
    compteur.textContent = `Essais : ${attempts}/3`;
    document.querySelector(".game").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".game").classList.remove("shake");
    }, 500);

    if (attempts >= maxAttempts) {
      loseVideo.classList.remove("hidden-video");
      loseVideo.play();
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
  document.getElementById("winVideo").classList.add("hidden-video");
  document.getElementById("loseVideo").classList.add("hidden-video");
  document.getElementById("winVideo").pause();
  document.getElementById("loseVideo").pause();
}

document.getElementById("guessInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});
console.log(randomNumber)