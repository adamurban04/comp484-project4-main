const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originTextElement = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wpmElement = document.querySelector("#wpm");
const errorsElement = document.querySelector("#errors");
const originTextOptions = [
    "The Empire might have demanded that they sacrifice their souls, but at one point, the majority of those people had been no worse than any others.",
    "Although Ciena would have liked to have gone down to Cloud City, perhaps to meet Jude's parents, she remained aboard the Executor.",
    "On Imperial ships, officers were encouraged to drink nutritive beverages instead of consuming food. It was more efficient in terms of both ship resources and officer time, and the medics insisted the nutritives were healthier, too.",
    "Then they turned away from each other to walk into the crowd, meet new people, and become the citizens of the Empire they were always meant to be.",
    "Obviously, the Rebel Alliance was no better. But one wrong didn't excuse another. She had probably thought about abandoning her post even before he had."
];

let timer = [0, 0, 0];
let intervalId = null;
let timerRunning = false;
let errorCount = 0;
let isCurrentlyMismatch = false;

function setRandomOriginText() {
    const randomIndex = Math.floor(Math.random() * originTextOptions.length);
    originTextElement.textContent = originTextOptions[randomIndex];
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        return `0${time}`;
    }

    return `${time}`;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    timer[2] += 1;

    if (timer[2] >= 100) {
        timer[2] = 0;
        timer[1] += 1;
    }

    if (timer[1] >= 60) {
        timer[1] = 0;
        timer[0] += 1;
    }

    const minutes = leadingZero(timer[0]);
    const seconds = leadingZero(timer[1]);
    const hundredths = leadingZero(timer[2]);
    theTimer.textContent = `${minutes}:${seconds}:${hundredths}`;
    updateWpm(testArea.value.length);
}

function getElapsedSeconds() {
    return (timer[0] * 60) + timer[1] + (timer[2] / 100);
}

function updateWpm(totalCharacters) {
    const elapsedSeconds = getElapsedSeconds();

    if (elapsedSeconds <= 0 || totalCharacters <= 0) {
        wpmElement.textContent = "0.00";
        return;
    }

    const wpm = (totalCharacters / 5) / (elapsedSeconds / 60);
    wpmElement.textContent = wpm.toFixed(2);
}

function updateErrorCount() {
    errorsElement.textContent = `${errorCount}`;
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    const typedText = testArea.value;
    const originText = originTextElement.textContent;
    const textMatch = originText.substring(0, typedText.length);

    if (typedText.length === 0) {
        testWrapper.style.borderColor = "grey";
        isCurrentlyMismatch = false;
        return;
    }

    if (typedText === originText) {
        // Completion trigger: timer stops only when the full typed content exactly equals the full prompt text.
        testWrapper.style.borderColor = "green";
        clearInterval(intervalId);
        intervalId = null;
        timerRunning = false;
        isCurrentlyMismatch = false;
        updateWpm(typedText.length);
    } else if (typedText === textMatch) {
        testWrapper.style.borderColor = "blue";
        isCurrentlyMismatch = false;
    } else {
        testWrapper.style.borderColor = "#E95D0F";

        if (!isCurrentlyMismatch) {
            errorCount += 1;
            updateErrorCount();
        }

        isCurrentlyMismatch = true;
    }
}

// Start the timer:
function start() {
    if (!timerRunning && testArea.value.length > 0) {
        intervalId = setInterval(runTimer, 10);
        timerRunning = true;
    }
}

// Reset everything:
function reset() {
    clearInterval(intervalId);
    intervalId = null;
    timer = [0, 0, 0];
    timerRunning = false;
    errorCount = 0;
    isCurrentlyMismatch = false;

    testArea.value = "";
    theTimer.textContent = "00:00:00";
    testWrapper.style.borderColor = "grey";
    wpmElement.textContent = "0.00";
    updateErrorCount();
    setRandomOriginText();
}

function handleTyping() {
    start();
    spellCheck();
    updateWpm(testArea.value.length);
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("input", handleTyping);
resetButton.addEventListener("click", reset);
setRandomOriginText();
