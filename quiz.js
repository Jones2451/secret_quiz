const questions = [
  // Fase 1
  {
    phase: 1,
    question: "Quando foi nosso primeiro beijo?",
    answers: ["2 de dezembro", "3 de dezembro", "4 de dezembro"],
    correct: 1
  },
  {
    phase: 1,
    question: "Onde foi nosso primeiro beijo?",
    answers: ["Shopping", "Escola", "Quadra"],
    correct: 2
  },
  {
    phase: 1,
    question: "Qual foi a data que começou o namoro oficial?",
    answers: ["18 de março", "19 de março", "20 de março"],
    correct: 0
  },

  // Fase 2
  {
    phase: 2,
    question: "Qual seu estilo de música preferido?",
    answers: ["Indie Pop", "Funk", "KPOP/sertanejo"],
    correct: 2
  },
  {
    phase: 2,
    question: "Qual o estilo de música preferido do seu namorado?",
    answers: ["Metal/Rock", "MPB", "Trap"],
    correct: 0
  },
  {
    phase: 2,
    question: "O que você mais gosta de fazer?",
    answers: ["Ver filme", "Ler Livros", "Viajar"],
    correct: 1
  },

  // Fase 3
  {
    phase: 3,
    question: "Quem é mais carinhoso?",
    answers: ["Ela", "Ele", "Os dois"],
    correct: 0
  },
  {
    phase: 3,
    question: "Quem é mais ciumento?",
    answers: ["Ela", "Ele", "Igual"],
    correct: 1
  },
  {
    phase: 3,
    question: "Quem é mais 'mimado'?",
    answers: ["Ela", "Ele", "Empate"],
    correct: 0
  },

  // Fase 4
  {
    phase: 4,
    question: "O que vocês dois mais gostam?",
    answers: ["Sair pra comer", "Assistir séries", "Ficar Agarradinhos Conversando"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <div class="question-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
      <h2>Fase ${q.phase}</h2>
      <p class="question-text" style="font-size: 20px;">${q.question}</p>
      <div class="answers" style="display: flex; flex-direction: column; gap: 18px; margin-top: 20px; width: 100%; max-width: 400px;">
        ${q.answers.map((a, i) => `<button class="answer-btn" style="padding: 18px 28px; font-size: 20px; border-radius: 12px; background-color: #222; color: white; border: 2px solid #555; cursor: pointer; width: 100%;" onclick="checkAnswer(${i})">${a}</button>`).join("")}
      </div>
    </div>
  `;
  updateProgressBar();
}

function checkAnswer(selected) {
  const question = questions[currentQuestion];
  const isCorrect = selected === question.correct;

  if (isCorrect) {
    score++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showFinalPage();
    }
  } else {
    showSadMessage();
  }
}

function showSadMessage() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <div class="sad-message" style="text-align: center;">
      <h2>Com você errando, eu fico triste 😭</h2>
      <button class="retry-btn" style="margin-top: 30px; padding: 18px 30px; font-size: 20px; background-color: #444; color: white; border: none; border-radius: 12px; cursor: pointer;" onclick="loadQuestion()">Tentar novamente</button>
    </div>
  `;
  updateProgressBar();
}

function updateProgressBar() {
  const progress = ((currentQuestion) / questions.length) * 100;
  const progressBar = document.getElementById("progress");
  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
}

function showFinalPage() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <div class="final-page" style="text-align: center;">
      <h1>Parabéns, meu amor! 💖</h1>
      <p>Você concluiu todas as fases!</p>
      <div class="decorations">🌹💗🌸💖🌼💘🌷</div>
      <p class="timer" id="timer">Calculando tempo juntos...</p>
      <div class="quote-final" style="margin-top: 30px; font-size: 18px; line-height: 1.8; max-width: 700px; margin-left: auto; margin-right: auto;">
        "Eu te amo não só pelo que você é, mas pelo que eu sou quando estou com você.<br><br>
        Você desperta em mim o que há de mais profundo e belo, como os versos eternos dos grandes poetas.<br><br>
        Nossos dias são como páginas escritas com alma, e nossas noites, capítulos de um livro onde o amor nunca dorme.<br>
        Em cada instante, sinto que nossa alma dança numa melodia única, onde cada batida é um suspiro de eternidade."<br><br>
        <small>— Inspirado em Pablo Neruda, Rumi e Nicholas Sparks</small>
      </div>
    </div>
  `;

  startRelationshipTimer();
  updateProgressBar();
}

function startRelationshipTimer() {
  const timerEl = document.getElementById("timer");
  const startDate = new Date("2025-03-19T00:00:00");

  function updateTimer() {
    const now = new Date();
    let diff = now - startDate;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerEl.textContent = `Estamos juntos há ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos! 🥰`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

document.addEventListener("DOMContentLoaded", loadQuestion);
