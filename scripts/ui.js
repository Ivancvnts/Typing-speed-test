const passageEl = document.querySelector("#passage");
const overlayEl = document.querySelector(".typing-test__overlay");
const contentEl = document.querySelector(".typing-test__content");
const timeEl = document.querySelector("#time");
const wpmEl = document.querySelector("#wpm");
const accuracyEl = document.querySelector("#accuracy");

const difficultyBtns = document
  .querySelector("#difficulty")
  .querySelectorAll(".settings__option");
const modeBtns = document
  .querySelector("#mode")
  .querySelectorAll(".settings__option");

export function renderPassage(text) {
  passageEl.innerHTML = "";

  [...text].forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("char");
    passageEl.appendChild(span);
  });
}

export function hideOverlay() {
  overlayEl.classList.add("typing-test__overlay--hidden");
  contentEl.classList.add("typing-test__content--active");
}

export function showOverlay() {
  overlayEl.classList.remove("typing-test__overlay--hidden");
  contentEl.classList.remove("typing-test__content--active");
}

export function setCharState(index, state) {
  const chars = passageEl.children;
  switch (state) {
    case "correct":
      chars[index].classList.add("char--correct");
      chars[index].classList.remove("char--current");
      break;

    case "incorrect":
      chars[index].classList.add("char--incorrect");
      chars[index].classList.remove("char--current");
      break;

    case "current":
      chars[index].classList.add("char--current");
      break;
  }
  chars[index];
}

export function setActiveBtn(setting, buttonToActivate) {
  if (setting === "difficulty") {
    difficultyBtns.forEach((button) => {
      button.classList.remove("settings__option--active");
    });
  } else {
    modeBtns.forEach((button) => {
      button.classList.remove("settings__option--active");
    });
  }

  buttonToActivate.classList.add("settings__option--active");
}

export function updateTimer(totalSeconds) {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  timeEl.textContent = `${min.toString().padStart(1, "0")}:${sec.toString().padStart(2, "0")}`;
}

export function updateStats(wpm, accuracy) {
  wpmEl.textContent = wpm.toString();
  accuracyEl.textContent = accuracy.toString() + "%";
}
