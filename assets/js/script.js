document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-btn");
  const mainContainer = document.getElementById("start");
  const quizContainer = document.getElementById("quiz-container");
  const endContainer = document.getElementById("end-container");
  const timerElement = document.getElementById("timer");
  const viewScoresLink = document.getElementById("view-scores");
  const initialsForm = document.getElementById("initials-form");
  const finalScoreElement = document.getElementById("final-score");

  let timeLeft = 60;
  let timerInterval;
  let currentScore = 0;

  startButton.addEventListener("click", startQuiz);
  viewScoresLink.addEventListener("click", viewHighScores);
  initialsForm.addEventListener("submit", saveHighScore);

  function startQuiz() {
    timeLeft = 60;
    currentScore = 0;
    timerInterval = setInterval(updateTimer, 1000);

    mainContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
  }

  function viewHighScores() {
    clearInterval(timerInterval);
    mainContainer.classList.add("hidden");
    quizContainer.classList.add("hidden");
    endContainer.classList.add("hidden");

    const highScoresList = document.getElementById("high-scores-list");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScoresList.innerHTML = "";
    highScores.forEach((score, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
      highScoresList.appendChild(listItem);
    });
    highScoresList.parentElement.classList.remove("hidden");
  }

  function updateTimer() {
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    } else {
      timeLeft--;
    }
  }

  function endQuiz() {
    clearInterval(timerInterval);
    endContainer.classList.remove("hidden");
    quizContainer.classList.add("hidden");

    finalScoreElement.textContent = currentScore;
  }

  function saveHighScore(event) {
    event.preventDefault();

    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value.toUpperCase();
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.push({ initials, score: currentScore });
    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "index.html";
  }
});
