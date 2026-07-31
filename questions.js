<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ACE-EM Revision</title>

  <style>
    :root {
      --navy: #0b2d42;
      --blue: #1769aa;
      --light: #f4f7fa;
      --white: #ffffff;
      --dark: #1f2933;
      --grey: #607080;
      --green: #1b7f3a;
      --red: #b00020;
      --amber: #8a5a00;
      --border: #d8e0e8;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: var(--light);
      color: var(--dark);
      line-height: 1.5;
    }

    header {
      background: var(--navy);
      color: var(--white);
      padding: 28px 18px;
      text-align: center;
    }

    header h1 {
      margin: 0 0 8px;
      font-size: 2rem;
    }

    header p {
      margin: 0;
      font-size: 1rem;
    }

    main {
      max-width: 1000px;
      margin: 24px auto;
      padding: 0 16px 40px;
    }

    .panel {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 18px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr auto;
      gap: 12px;
      align-items: end;
    }

    label {
      font-weight: bold;
      display: block;
      margin-bottom: 6px;
    }

    select,
    button {
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-size: 1rem;
    }

    button {
      background: var(--blue);
      color: var(--white);
      border: none;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover {
      background: #0f4f82;
    }

    button.secondary {
      background: #405566;
    }

    button.secondary:hover {
      background: #2f3f4c;
    }

    .quiz-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: space-between;
      color: var(--grey);
      font-size: 0.95rem;
      margin-bottom: 12px;
    }

    .tag {
      display: inline-block;
      background: #e8f1f8;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 0.85rem;
      color: #174b72;
      margin-right: 6px;
      margin-bottom: 6px;
    }

    h2 {
      margin-top: 0;
    }

    .stem {
      font-size: 1.15rem;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .option {
      display: block;
      background: #f0f4f7;
      border: 1px solid #d8e0e8;
      padding: 12px;
      border-radius: 10px;
      margin: 10px 0;
      cursor: pointer;
    }

    .option:hover {
      background: #e7eff5;
    }

    .option input {
      margin-right: 10px;
    }

    .feedback {
      margin-top: 16px;
      padding: 14px;
      border-radius: 10px;
      background: #f6f8fa;
      border-left: 6px solid var(--grey);
    }

    .feedback.correct {
      border-left-color: var(--green);
    }

    .feedback.incorrect {
      border-left-color: var(--red);
    }

    .source {
      margin-top: 10px;
      font-size: 0.95rem;
      color: #334;
      background: #eef3f7;
      padding: 10px;
      border-radius: 8px;
    }

    .score-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .score-box {
      background: #f0f4f7;
      padding: 12px;
      border-radius: 10px;
      text-align: center;
    }

    .score-box strong {
      display: block;
      font-size: 1.4rem;
    }

    .hidden {
      display: none;
    }

    .warning {
      background: #fff7e6;
      border-left: 6px solid var(--amber);
      padding: 12px;
      border-radius: 10px;
      margin-top: 12px;
    }

    @media (max-width: 800px) {
      .controls {
        grid-template-columns: 1fr;
      }

      .score-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  </style>
</head>

<body>
  <header>
    <h1>ACE-EM Revision</h1>
    <p>Emergency Medicine exam revision using Rosen and Tintinalli only.</p>
  </header>

  <main>
    <section class="panel">
      <h2>Start a revision session</h2>

      <div class="controls">
        <div>
          <label for="bookFilter">Book</label>
          <select id="bookFilter">
            <option value="all">All books</option>
          </select>
        </div>

        <div>
          <label for="topicFilter">Topic</label>
          <select id="topicFilter">
            <option value="all">All topics</option>
          </select>
        </div>

        <div>
          <label for="typeFilter">Question type</label>
          <select id="typeFilter">
            <option value="all">All types</option>
            <option value="mcq">MCQ</option>
            <option value="multi">Multiple response</option>
          </select>
        </div>

        <div>
          <label>&nbsp;</label>
          <button id="startBtn" type="button">Start</button>
        </div>
      </div>

      <div class="warning">
        This page is the quiz engine. Questions are loaded from questions.js, so index.html can now stay stable.
      </div>
    </section>

    <section id="quizPanel" class="panel hidden">
      <div class="quiz-meta">
        <span id="questionCounter"></span>
        <span id="questionDetails"></span>
      </div>

      <div id="questionTags"></div>

      <p id="questionStem" class="stem"></p>

      <div id="answerArea"></div>

      <button id="submitBtn" type="button">Submit answer</button>
      <button id="nextBtn" type="button" class="secondary hidden">Next question</button>

      <div id="feedback" class="feedback hidden"></div>
    </section>

    <section class="panel">
      <h2>Session score</h2>
      <div class="score-grid">
        <div class="score-box">
          <strong id="correctCount">0</strong>
          Correct
        </div>
        <div class="score-box">
          <strong id="incorrectCount">0</strong>
          Incorrect
        </div>
        <div class="score-box">
          <strong id="answeredCount">0</strong>
          Answered
        </div>
        <div class="score-box">
          <strong id="accuracyRate">0%</strong>
          Accuracy
        </div>
      </div>
    </section>
  </main>

  questions.jsscript>
  <script>
    let activeQuestions = [];
    let currentIndex = 0;
    let correct = 0;
    let incorrect = 0;
    let answered = 0;

    const bookFilter = document.getElementById("bookFilter");
    const topicFilter = document.getElementById("topicFilter");
    const typeFilter = document.getElementById("typeFilter");
    const startBtn = document.getElementById("startBtn");
    const quizPanel = document.getElementById("quizPanel");
    const questionCounter = document.getElementById("questionCounter");
    const questionDetails = document.getElementById("questionDetails");
    const questionTags = document.getElementById("questionTags");
    const questionStem = document.getElementById("questionStem");
    const answerArea = document.getElementById("answerArea");
    const submitBtn = document.getElementById("submitBtn");
    const nextBtn = document.getElementById("nextBtn");
    const feedback = document.getElementById("feedback");
    const correctCount = document.getElementById("correctCount");
    const incorrectCount = document.getElementById("incorrectCount");
    const answeredCount = document.getElementById("answeredCount");
    const accuracyRate = document.getElementById("accuracyRate");

    function getQuestionTypeLabel(type) {
      if (type === "mcq") {
        return "MCQ";
      }

      if (type === "multi") {
        return "Multiple response";
      }

      return String(type).toUpperCase();
    }

    function getQuestions() {
      if (!Array.isArray(window.QUESTIONS)) {
        alert("questions.js did not load correctly. Check that questions.js exists in the repository root and contains window.QUESTIONS = [...];");
        return [];
      }

      return window.QUESTIONS;
    }

    function initialiseFilters() {
      const questions = getQuestions();
      const books = [...new Set(questions.map(question => question.book))].sort();
      const topics = [...new Set(questions.map(question => question.topic))].sort();

      books.forEach(book => {
        const option = document.createElement("option");
        option.value = book;
        option.textContent = book;
        bookFilter.appendChild(option);
      });

      topics.forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicFilter.appendChild(option);
      });
    }

    function startQuiz() {
      const questions = getQuestions();
      const selectedBook = bookFilter.value;
      const selectedTopic = topicFilter.value;
      const selectedType = typeFilter.value;

      activeQuestions = questions.filter(question => {
        const bookMatch = selectedBook === "all" || question.book === selectedBook;
        const topicMatch = selectedTopic === "all" || question.topic === selectedTopic;
        const typeMatch = selectedType === "all" || question.type === selectedType;
        return bookMatch && topicMatch && typeMatch;
      });

      activeQuestions = shuffle(activeQuestions);
      currentIndex = 0;
      correct = 0;
      incorrect = 0;
      answered = 0;

      updateScore();

      if (activeQuestions.length === 0) {
        alert("No questions match those filters.");
        return;
      }

      quizPanel.classList.remove("hidden");
      showQuestion();
    }

    function showQuestion() {
      const question = activeQuestions[currentIndex];

      questionCounter.textContent = `Question ${currentIndex + 1} of ${activeQuestions.length}`;
      questionDetails.textContent = getQuestionTypeLabel(question.type);

      questionTags.innerHTML = `
        <span class="tag">${question.topic}</span>
        <span class="tag">${question.chapter}</span>
        <span class="tag">${question.book}</span>
      `;

      questionStem.textContent = question.stem;
      answerArea.innerHTML = "";
      feedback.className = "feedback hidden";
      feedback.innerHTML = "";

      submitBtn.classList.remove("hidden");
      nextBtn.classList.add("hidden");

      if (question.type === "mcq") {
        renderSingleBestAnswer(question);
      }

      if (question.type === "multi") {
        renderMultipleResponse(question);
      }
    }

    function renderSingleBestAnswer(question) {
      question.options.forEach((optionText, index) => {
        const label = document.createElement("label");
        label.className = "option";
        label.innerHTML = `
          <input type="radio" name="answer" value="${index}">
          ${optionText}
        `;
        answerArea.appendChild(label);
      });
    }

    function renderMultipleResponse(question) {
      question.options.forEach((optionText, index) => {
        const label = document.createElement("label");
        label.className = "option";
        label.innerHTML = `
          <input type="checkbox" name="answer" value="${index}">
          ${optionText}
        `;
        answerArea.appendChild(label);
      });
    }

    function submitAnswer() {
      const question = activeQuestions[currentIndex];
      let isCorrect = false;

      if (question.type === "mcq") {
        const selected = document.querySelector("input[name='answer']:checked");

        if (!selected) {
          alert("Choose an answer first.");
          return;
        }

        isCorrect = Number(selected.value) === question.correctAnswer;
      }

      if (question.type === "multi") {
        const selectedValues = [...document.querySelectorAll("input[name='answer']:checked")]
          .map(input => Number(input.value))
          .sort((a, b) => a - b);

        if (selectedValues.length === 0) {
          alert("Choose at least one answer first.");
          return;
        }

        const correctValues = [...question.correctAnswers].sort((a, b) => a - b);
        isCorrect = JSON.stringify(selectedValues) === JSON.stringify(correctValues);
      }

      answered += 1;

      if (isCorrect) {
        correct += 1;
        feedback.className = "feedback correct";
        feedback.innerHTML = `
          <strong>Correct.</strong>
          <p>${question.explanation}</p>
          <div class="source"><strong>Source:</strong> ${question.source}</div>
        `;
      } else {
        incorrect += 1;
        feedback.className = "feedback incorrect";
        feedback.innerHTML = `
          <strong>Incorrect.</strong>
          <p>${question.explanation}</p>
          <div class="source"><strong>Source:</strong> ${question.source}</div>
        `;
      }

      updateScore();
      submitBtn.classList.add("hidden");
      nextBtn.classList.remove("hidden");
    }

    function nextQuestion() {
      currentIndex += 1;

      if (currentIndex >= activeQuestions.length) {
        quizPanel.classList.add("hidden");
        alert(`Session complete. Correct: ${correct}. Incorrect: ${incorrect}.`);
        return;
      }

      showQuestion();
    }

    function updateScore() {
      correctCount.textContent = correct;
      incorrectCount.textContent = incorrect;
      answeredCount.textContent = answered;

      const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);
      accuracyRate.textContent = `${accuracy}%`;
    }

    function shuffle(array) {
      const copy = [...array];

      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }

      return copy;
    }

    startBtn.addEventListener("click", startQuiz);
    submitBtn.addEventListener("click", submitAnswer);
    nextBtn.addEventListener("click", nextQuestion);

    initialiseFilters();
  </script>
</body>
</html>
