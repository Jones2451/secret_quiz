const questions = [
  // Fase 1
  {
    phase: 1,
    question: "Quando foi nosso primeiro beijo?",
    answers: ["2 de dezembro", "4 de dezembro", "3 de dezembro"],
    correct: 2
  },
  {
    phase: 1,
    question: "Onde foi nosso primeiro beijo?",
    answers: ["Quadra", "Escola", "Shopping"],
    correct: 0
  },
  {
    phase: 1,
    question: "Qual foi a data que começou o namoro oficial?",
    answers: ["19 de março", "20 de março", "18 de março"],
    correct: 0
  },

  // Fase 2
  {
    phase: 2,
    question: "Qual seu estilo de música preferido?",
    answers: ["KPOP/Sertanejo", "Funk", "Indie Pop"],
    correct: 0
  },
  {
    phase: 2,
    question: "Qual o estilo de música preferido do seu namorado?",
    answers: ["MPB", "Metal/Rock", "Trap"],
    correct: 1
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
    answers: ["Sair pra comer", "Ficar Agarradinhos Conversando", "Assistir séries"],
    correct: 1
  }
];

let currentQuestion = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <h2>Fase ${q.phase}</h2>
    <p>${q.question}</p>
    <div class="answers">
      ${q.answers.map((a, i) => `<button onclick="checkAnswer(${i})">${a}</button>`).join("")}
    </div>
  `;
  updateProgressBar();
  clearInterval(timerInterval); // para contador se estava rodando (por precaução)
}

function checkAnswer(selected) {
  const question = questions[currentQuestion];
  const isCorrect = selected === question.correct;

  if (isCorrect) {
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
    <h2 class="error-message">Com você errando eu fico triste 😭</h2>
    <button onclick="loadQuestion()">Tentar de novo</button>
  `;
}

function updateProgressBar() {
  const progress = ((currentQuestion) / questions.length) * 100;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = progress > 100 ? "100%" : progress + "%";
}

let timerInterval;

function showFinalPage() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <div class="final-page">
      <h1>Parabéns, meu amor! 💖</h1>
      <div class="decorations">🌹💗🌸💖🌼💘🌷</div>
      <p class="timer" id="timer">Calculando tempo juntos...</p>
      <div class="quote-final">
        "Eu te amo não só pelo que você é, mas pelo que eu sou quando estou com você.  
        Você desperta em mim o que há de mais profundo e belo, como os versos eternos dos grandes poetas.  
        Em cada instante, sinto que nossa alma dança numa melodia única, onde cada batida é um suspiro de eternidade."  
        <small>— Inspirado em trechos de Pablo Neruda e Rumi</small>
      </div>
    </div>
  `;

  // Começa o contador dinâmico
  startRelationshipTimer();
  updateProgressBar(); // garante barra 100%
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

  updateTimer(); // chama já uma vez ao iniciar
  timerInterval = setInterval(updateTimer, 1000);
}

document.addEventListener("DOMContentLoaded", loadQuestion);
