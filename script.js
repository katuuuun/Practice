const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Dublin", correct: false }
        ]
    },
    {
        question: "How many planets are in the solar system?",
        answers: [
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "10", correct: false }
        ]
    },
    {
        question: "What is the freezing point of water?",
        answers: [
            { text: "0", correct: true },
            { text: "-5", correct: false },
            { text: "-6", correct: false }
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Nile", correct: true },
            { text: "Amazon", correct: false },
            { text: "Yangtze", correct: false }
        ]
    },
    {
        question: "How many chromosomes are in the human genome?",
        answers: [
            { text: "42", correct: false },
            { text: "44", correct: false },
            { text: "46", correct: true }
        ]
    },
    {
        question: "Which of these characters are friends with Harry Potter?",
        answers: [
            { text: "Ron Weasley", correct: true },
            { text: "Draco Malfoy", correct: false },
            { text: "Hermione Granger", correct: true }
        ]
    },
    {
        question: "What is the capital of Canada?",
        answers: [
            { text: "Toronto", correct: false },
            { text: "Ottawa", correct: true },
            { text: "Vancouver", correct: false }
        ]
    },
    {
        question: "What is the Jewish New Year called?",
        answers: [
            { text: "Hanukkah", correct: false },
            { text: "Yom Kippur", correct: false },
            { text: "Kwanzaa", correct: false },
            { text: "Rosh Hashanah", correct: true }
        ]
    }
];

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const multiAnswerNotificationElement = document.getElementById('multi-answer-notification');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultsElement = document.getElementById('results');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const totalTimeElement = document.getElementById('total-time');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let correctAnswersCount = 0;
let startTime;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    resultsElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    nextButton.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `Score: ${score}`;
    startTime = new Date();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    selectedAnswers = [];
    correctAnswersCount = question.answers.filter(answer => answer.correct).length;
    if (correctAnswersCount > 1) {
        multiAnswerNotificationElement.innerText = `Select ${correctAnswersCount} answers`;
        multiAnswerNotificationElement.classList.remove('hide');
    } else {
        multiAnswerNotificationElement.classList.add('hide');
    }
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(button) {
    if (selectedAnswers.includes(button)) {
        selectedAnswers = selectedAnswers.filter(b => b !== button);
        button.classList.remove('selected');
    } else {
        if (correctAnswersCount === 1) {
            selectedAnswers.forEach(b => b.classList.remove('selected'));
            selectedAnswers = [button];
            button.classList.add('selected');
        } else {
            if (selectedAnswers.length < correctAnswersCount) {
                selectedAnswers.push(button);
                button.classList.add('selected');
            } else {
                const lastSelected = selectedAnswers.pop();
                lastSelected.classList.remove('selected');
                selectedAnswers.push(button);
                button.classList.add('selected');
            }
        }
    }
    if (selectedAnswers.length === correctAnswersCount) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
    element.classList.remove('selected');
}

function showResults() {
    questionContainerElement.classList.add('hide');
    resultsElement.classList.remove('hide');
    finalScoreElement.innerText = `Your score: ${score}`;
    const endTime = new Date();
    const totalTime = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    totalTimeElement.innerText = `Total time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
}

nextButton.addEventListener('click', () => {
    const currentQuestion = questions[currentQuestionIndex];
    let correctSelections = 0;
    selectedAnswers.forEach(button => {
        const correct = button.dataset.correct === "true";
        setStatusClass(button, correct);
        if (correct) {
            correctSelections++;
        }
    });
    if (correctSelections === correctAnswersCount) {
        score += 2;
    } else if (correctSelections > 0) {
        score += 1;
    }
    scoreElement.innerText = `Score: ${score}`;
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            showQuestion(questions[currentQuestionIndex]);
            nextButton.classList.add('hide');
        }, 670);
    } else {
        setTimeout(showResults, 500);
    }
});

restartButton.addEventListener('click', startQuiz);
score = score ^ score;
startQuiz();
