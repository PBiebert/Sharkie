import { Keyboard } from "./classes/keyboard.class.js";
import { World } from "./classes/world.class.js";
import { AudioHub } from "./classes/audio-hub.class.js";

const overlay = document.querySelector(".overlay");
const btnControls = document.getElementById("btn-controls");
const controlsSite = document.querySelector(".controls");
const btnBack = document.getElementById("back");
const startScreen = document.querySelector(".startScreen");
const btnStart = document.getElementById("btn-start");
const endScreen = document.querySelector(".endScreen");
const resultText = document.getElementById("result-text");
const btmHome = document.getElementById("home");
const btmReplay = document.getElementById("replay");
const btnSound = document.querySelector(".btn-sound");
const buttons = document.querySelectorAll("button");
let canvas = document.getElementById("canvas");
let world;
let keyboard = new Keyboard();

window.addEventListener("load", init);

btnControls.addEventListener("click", () =>
  openSite(startScreen, controlsSite)
);

btnBack.addEventListener("click", () => openSite(controlsSite, startScreen));

btnStart.addEventListener("click", () => {
  startScreen.classList.remove("active");

  world = new World(canvas, keyboard);
  checkResult();
});

btmHome.addEventListener("click", () => {
  openSite(endScreen, startScreen);
});

btmReplay.addEventListener("click", () => {
  endScreen.classList.remove("active");
  overlay.style.backgroundImage = "none";

  world = new World(canvas, keyboard);
  checkResult();
});

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
    case "ArrowUp":
      keyboard.UP = true;
      break;

    case "d":
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;

    case "s":
    case "ArrowDown":
      keyboard.DOWN = true;
      break;

    case "a":
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;

    case " ":
      keyboard.SPACE = true;
      break;

    case "h":
      keyboard.H = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
    case "ArrowUp":
      keyboard.UP = false;

      break;

    case "d":
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;

    case "s":
    case "ArrowDown":
      keyboard.DOWN = false;
      break;

    case "a":
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;

    case " ":
      keyboard.SPACE = false;
      break;

    case "h":
      keyboard.H = false;
      break;
  }
});

btnSound.addEventListener("click", () => {
  if (AudioHub.playSounds) {
    muteSound();
  } else {
    playSound();
  }
});

function init() {
  setHoverSound();
}

function openSite(from, to) {
  from.classList.remove("active");
  to.classList.add("active");
}

function checkResult() {
  let resultInterval = setInterval(() => {
    const result = world.gameResult();
    if (result === "gameOver" || result === "win") {
      clearInterval(resultInterval);
      setTimeout(() => {
        stopAllIntervalls();
        ShowEndscreen(result);
      }, 3000);
    }
  }, 100);
}

function stopAllIntervalls() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function ShowEndscreen(gameResult) {
  endScreen.classList.add("active");

  if (gameResult == "win") {
    resultText.innerText = "You Win!";
  }
  if (gameResult == "gameOver") {
    resultText.innerText = "Game Over";
  }
}

function setHoverSound() {
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () =>
      AudioHub.hoverSound(AudioHub.click)
    );
  });
}

function muteSound() {
  AudioHub.playSounds = false;
  AudioHub.stop(AudioHub.backgroundMusic);
  btnSound.src = "./src/icons/mute.png";
}

function playSound() {
  AudioHub.playSounds = true;
  AudioHub.backgroundSound(AudioHub.backgroundMusic);
  btnSound.src = "./src/icons/note.png";
}
