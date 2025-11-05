const quizData = [
    {
        question: "Which language runs in a web browser?",
        choices: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheet"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which HTML tag is used for headings?",
        choices: ["<head>", "<h1>", "<heading>", "<title>"],
        answer: "<h1>"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    choicesEl.innerHTML = "";
    current.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.classList.add("choice");
        btn.addEventListener("click", () => selectAnswer(choice, btn));
        choicesEl.appendChild(btn);
    });
}

function selectAnswer(choice, btn) {
    const current = quizData[currentQuestion];
    if (choice === current.answer) {
        score++;
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
        // Highlight correct answer
        Array.from(choicesEl.children).forEach(b => {
            if (b.textContent === current.answer) b.classList.add("correct");
        });
    }
    // Disable all buttons
    Array.from(choicesEl.children).forEach(b => b.disabled = true);
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quiz.style.display = "none";
    resultEl.classList.remove("hidden");
    scoreEl.textContent = `${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add("hidden");
    quiz.style.display = "block";
    loadQuestion();
});

// Initialize
loadQuestion();
