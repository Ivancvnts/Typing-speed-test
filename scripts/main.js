import { loadPassages, getRandomPassage } from "./passages.js";
import {
  renderPassage,
  showOverlay,
  hideOverlay,
  setCharState,
  setActiveBtn,
  updateTimer,
  updateStats,
} from "./ui.js";

let difficulty = "easy";
let mode;
let currentIndex = 0;
let passage;
let correctChars = 0;
let incorrectChars = 0;
let totalTyped = 0;
let timer = null;
let startTime = null;
let endTime = null;
let personalBest = 0;

const startBtn = document.querySelector("#start-button");
const inputEl = document.querySelector("#test-input");
const restartBtn = document.querySelector("#restart");

const difficultyBtns = document
  .querySelector("#difficulty")
  .querySelectorAll(".settings__option");

const modeBtns = document
  .querySelector("#mode")
  .querySelectorAll(".settings__option");

difficultyBtns.forEach((button) => {
  button.addEventListener("click", () => {
    difficulty = button.textContent.toLowerCase().trim();
    console.log(difficulty);
    setActiveBtn("difficulty", button);
  });
});

modeBtns.forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.textContent.toLowerCase().trim();
    console.log(mode);
    setActiveBtn("mode", button);
  });
});

async function startTest(difficulty) {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  const passages = await loadPassages();
  const text = getRandomPassage(passages, difficulty).text;

  passage = text;
  currentIndex = 0;
  startTime = Date.now();
  correctChars = 0;
  incorrectChars = 0;
  totalTyped = 0;

  renderPassage(text);
  hideOverlay();
  inputEl.value = "";
  inputEl.focus();

  setCharState(currentIndex, "current");
  let seconds = mode === "passage" ? 0 : 60;
  updateTimer(seconds);

  timer = setInterval(() => {
    if (mode === "passage") {
      seconds++;
    } else {
      seconds--;
    }

    updateTimer(seconds);

    if (mode !== "passage" && seconds < 0) {
      endTest();
    }
  }, 1000);
}

function endTest() {
  clearInterval(timer);
  endTime = Date.now();
}

function calculateWPM(correctChars, minutes) {
  if (minutes === 0) return 0;
  return Math.round(correctChars / 5 / minutes);
}

function calculateAccuracy(correctChars, totalTyped) {
  if (totalTyped === 0) return 100;
  return Math.round((correctChars / totalTyped) * 100);
}

startBtn.addEventListener("click", () => {
  startTest(difficulty);
});

inputEl.addEventListener("keyup", (event) => {
  if (event.key.length !== 1 || currentIndex >= passage.length) return;

  totalTyped++;
  const currentChar = passage[currentIndex];
  const typedKey = event.key;

  if (currentChar === typedKey) {
    correctChars++;
    setCharState(currentIndex, "correct");
  } else {
    incorrectChars++;
    setCharState(currentIndex, "incorrect");
  }

  currentIndex++;

  if (currentIndex < passage.length) {
    setCharState(currentIndex, "current");
  } else {
    endTest();
  }
  const elapsedTime = (Date.now() - startTime) / 1000 / 60;
  const wpm = calculateWPM(correctChars, elapsedTime);
  const acc = calculateAccuracy(correctChars, totalTyped);
  updateStats(wpm, acc);
});

restartBtn.addEventListener("click", () => {
  startTest(difficulty);
});
