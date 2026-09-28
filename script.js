const textDisplay = document.getElementById("text-display");
const typingInput = document.getElementById("typing-input");

const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const progressBar = document.getElementById("progress");
const restartButton = document.getElementById("restart-button");
const resultDisplay = document.getElementById("result");

const texts = [
    "The quick brown fox jumps over the lazy dog while the sun shines brightly above the quiet forest.",
    "Programming is the process of creating instructions that allow computers to solve problems and perform useful tasks.",
    "Computer engineering combines hardware and software to create systems that are efficient reliable and useful.",
    "Learning to code takes patience practice and curiosity because every mistake provides another opportunity to understand how things work.",
    "Technology continues to change the way people communicate work learn and solve problems in their everyday lives."
];

let currentText = "";
let startTime = null;
let timerInterval = null;
let testFinished = false;


// Generate random sentence
function generateText() {
    const randomIndex = Math.floor(Math.random() * texts.length);

    currentText = texts[randomIndex];

    displayText();
}


// Display sentence
function displayText() {
    textDisplay.innerHTML = "";

    for (let i = 0; i < currentText.length; i++) {
        const span = document.createElement("span");

        span.textContent = currentText[i];

        if (i === 0) {
            span.classList.add("current");
        }

        textDisplay.appendChild(span);
    }
}


// Start a new test
function startTest() {

    clearInterval(timerInterval);

    startTime = null;
    testFinished = false;

    timeDisplay.textContent = "0.0s";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";

    progressBar.style.width = "0%";

    resultDisplay.textContent = "";

    typingInput.value = "";

    // IMPORTANT:
    // Enable the typing box
    typingInput.disabled = false;

    // Generate sentence
    generateText();

    // Focus typing box
    typingInput.focus();
}


// Start timer
function startTimer() {

    if (startTime !== null) {
        return;
    }

    startTime = Date.now();

    timerInterval = setInterval(updateStats, 100);
}


// Update everything
function updateStats() {

    if (startTime === null) {
        return;
    }

    const elapsedMilliseconds = Date.now() - startTime;

    const elapsedSeconds = elapsedMilliseconds / 1000;

    timeDisplay.textContent =
        `${elapsedSeconds.toFixed(1)}s`;

    calculateWPM(elapsedSeconds);

    calculateAccuracy();

    updateProgress();
}


// Calculate WPM
function calculateWPM(elapsedSeconds) {

    const typedText = typingInput.value;

    if (elapsedSeconds <= 0) {
        return;
    }

    const words = typedText.length / 5;

    const minutes = elapsedSeconds / 60;

    const wpm = words / minutes;

    wpmDisplay.textContent = Math.round(wpm);
}


// Calculate accuracy
function calculateAccuracy() {

    const typedText = typingInput.value;

    if (typedText.length === 0) {
        accuracyDisplay.textContent = "100%";
        return;
    }

    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === currentText[i]) {
            correctCharacters++;
        }
    }

    const accuracy =
        (correctCharacters / typedText.length) * 100;

    accuracyDisplay.textContent =
        `${Math.round(accuracy)}%`;
}


// Highlight characters
function updateTextHighlighting() {

    const typedText = typingInput.value;

    const characters =
        textDisplay.querySelectorAll("span");

    characters.forEach((span, index) => {

        span.classList.remove(
            "correct",
            "incorrect",
            "current"
        );

        if (index < typedText.length) {

            if (typedText[index] === currentText[index]) {
                span.classList.add("correct");
            } else {
                span.classList.add("incorrect");
            }

        } else if (index === typedText.length) {

            span.classList.add("current");
        }
    });
}


// Update progress bar
function updateProgress() {

    const typedLength = typingInput.value.length;

    const progress =
        (typedLength / currentText.length) * 100;

    progressBar.style.width =
        `${Math.min(progress, 100)}%`;
}


// Finish test
function finishTest() {

    if (testFinished) {
        return;
    }

    testFinished = true;

    clearInterval(timerInterval);

    typingInput.disabled = true;

    updateStats();

    resultDisplay.textContent =
        `Finished! ${wpmDisplay.textContent} WPM with ${accuracyDisplay.textContent} accuracy.`;
}


// Listen for typing
typingInput.addEventListener("input", function () {

    if (testFinished) {
        return;
    }

    // Start timer on first character
    if (
        typingInput.value.length === 1 &&
        startTime === null
    ) {
        startTimer();
    }

    updateTextHighlighting();

    updateProgress();

    calculateAccuracy();

    if (
        typingInput.value.length >= currentText.length
    ) {

        typingInput.value =
            typingInput.value.substring(
                0,
                currentText.length
            );

        finishTest();
    }
});


// New Test button
restartButton.addEventListener(
    "click",
    startTest
);


// Start automatically when page loads
startTest();