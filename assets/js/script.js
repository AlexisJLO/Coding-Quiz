document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-btn");
  const mainContainer = document.getElementById("start");
  const quizContainer = document.getElementById("quiz-container");
  const endContainer = document.getElementById("end-container");
  const timerElement = document.getElementById("timer");
  const viewScoresLink = document.getElementById("view-scores");
  const initialsForm = document.getElementById("initials-form");
  const finalScoreElement = document.getElementById("final-score");
  const feedbackText = document.getElementById("feedback-text");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");

  let currentQuestionIndex = 0;
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
    showQuestion(questions[currentQuestionIndex]);
  }

  var questions = [
    {
      question: "How can you open a link in a new tab/browser window?",
      answers: [
        { text: "<a href='url' new>", correct: false },
        { text: "<a href='url' new_window>", correct: false },
        { text: "<a href='url' target='_blank'>", correct: true },
        { text: "<a href='url' target='_new'>", correct: false },
      ],
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Creative Style Sheets", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Sheets", correct: false },
      ],
    },
    {
      question: "Array in JavaScript can be used to store ____.",
      answers: [
        { text: "Numbers and strings", correct: false },
        { text: "Other arrays", correct: false },
        { text: "Booleans", correct: false },
        { text: "All of the above", correct: true },
      ],
    },
    {
      question:
        "A very useful tool used in development and debugging for printing content to the debugger is the ____.",
      answers: [
        { text: "JavaScript", correct: false },
        { text: "Terminal/Bash", correct: false },
        { text: "For loops", correct: false },
        { text: "Console.log", correct: true },
      ],
    },
    {
      question: "How do you call a function named 'myFunction'?",
      answers: [
        { text: "call myFunction();", correct: false },
        { text: "myFunction();", correct: true },
        { text: "call to function myFunction();", correct: false },
        { text: "Dial myFunction();", correct: false },
      ],
    },
  ];

  function showQuestion(question) {
    feedbackText.textContent = "";
    questionText.textContent = question.question;
    answerButtons.innerHTML = "";
    question.answers.forEach(function (answer) {
      var button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      button.addEventListener("click", function () {
        selectAnswer(answer);
      });
      answerButtons.appendChild(button);
    });
  }

  function selectAnswer(answer) {
    if (answer.correct) {
      currentScore++;
      feedbackText.textContent = "Correct!";
    } else {
      feedbackText.textContent = "Wrong!";
      decreaseTime();
    }

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        feedbackText.textContent = "";
      } else {
        endQuiz();
      }
    }, 1000);
  }

  function decreaseTime() {
    if (timeLeft >= 10) {
      timeLeft -= 10;
    } else {
      timeLeft = 0;
    }
    updateTimeDisplay();
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

    viewHighScores();
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
});
