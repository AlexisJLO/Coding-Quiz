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
      question: "What does 'DOM' stand for?",
      answers: [
        { text: "Document Object Model", correct: true },
        { text: "Document Oriented Model", correct: false },
        { text: "Data Object Model", correct: false },
        { text: "Dynamic Object Model", correct: false },
      ],
    },
    {
      question: "Commonly used in data types DO NOT include:",
      answers: [
        { text: "String", correct: false },
        { text: "Number", correct: false },
        { text: "Boolean", correct: false },
        { text: "Function", correct: true },
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
      question:
        "The condition in an if/else statement is enclosed within a ____.",
      answers: [
        { text: "Quotes", correct: false },
        { text: "Curly brackets", correct: true },
        { text: "Parentheses", correct: false },
        { text: "Square brackets", correct: false },
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
      score++;
      feedbackText.textContent = "Correct!";
    } else {
      decreaseTime();
      feedbackText.textContent = "Wrong!";
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      endGame();
    }
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
