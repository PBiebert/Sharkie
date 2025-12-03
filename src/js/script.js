import { Keyboard } from "./classes/keyboard.class.js";
import { World } from "./classes/world.class.js";
import { AudioHub } from "./classes/audio-hub.class.js";

let canvas = document.getElementById("canvas");
let world;
let keyboard = new Keyboard();
let fullscreen = false;

window.addEventListener("load", init);

function init() {
  controlPanelForMobilecontrole();
  touchpanelOnOff();
  setKeyEventsToControle();
  setStartScreenButtonAction();
  setEndScreenButtonAction();
  setControllsScreenButtonAction();
  setHeadLineButtonAction();
  setHoverSound();
}

function setStartScreenButtonAction() {
  const btnControls = document.getElementById("btn-controls");
  const controlsSite = document.querySelector(".controls");
  const startScreen = document.querySelector(".startScreen");
  const btnStart = document.getElementById("btn-start");

  btnControls.addEventListener("click", () =>
    openSite(startScreen, controlsSite)
  );

  btnStart.addEventListener("click", () => {
    startScreen.classList.remove("active");

    world = new World(canvas, keyboard);
    checkResult();
  });
}

function setControllsScreenButtonAction() {
  const btnBack = document.getElementById("back");
  const controlsSite = document.querySelector(".controls");
  const startScreen = document.querySelector(".startScreen");

  btnBack.addEventListener("click", () => openSite(controlsSite, startScreen));
}

function setEndScreenButtonAction() {
  const btmHome = document.getElementById("home");
  const btmReplay = document.getElementById("replay");
  const startScreen = document.querySelector(".startScreen");
  const endScreen = document.querySelector(".endScreen");
  const overlay = document.querySelector(".overlay");

  btmHome.addEventListener("click", () => {
    openSite(endScreen, startScreen);
  });

  btmReplay.addEventListener("click", () => {
    endScreen.classList.remove("active");
    overlay.style.backgroundImage = "none";

    world = new World(canvas, keyboard);
    checkResult();
  });
}

function setKeyEventsToControle() {
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

      case "Escape":
        break;
    }
  });
}

function setHeadLineButtonAction() {
  const btnSound = document.querySelector(".btn-sound");
  const btnScreen = document.querySelector(".btn-screen");

  btnSound.addEventListener("click", () => {
    if (AudioHub.playSounds) {
      muteSound();
    } else {
      playSound();
    }
  });

  btnScreen.addEventListener("click", () => {
    if (!fullscreen) {
      setFullscreen();
    } else {
      exitFullscreen();
    }
  });
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
  const endScreen = document.querySelector(".endScreen");
  const resultText = document.getElementById("result-text");

  endScreen.classList.add("active");

  if (gameResult == "win") {
    resultText.innerText = "You Win!";
  }
  if (gameResult == "gameOver") {
    resultText.innerText = "Game Over";
  }
}

function setHoverSound() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    if (!button.classList.contains("control-button")) {
      button.addEventListener("mouseover", () =>
        AudioHub.hoverSound(AudioHub.click)
      );
    }
  });
}

function muteSound() {
  const btnSound = document.querySelector(".btn-sound");

  AudioHub.playSounds = false;
  AudioHub.stop(AudioHub.backgroundMusic);
  btnSound.src = "./src/icons/mute.png";
}

function playSound() {
  const btnSound = document.querySelector(".btn-sound");

  AudioHub.playSounds = true;
  AudioHub.backgroundSound(AudioHub.backgroundMusic);
  btnSound.src = "./src/icons/note.png";
}

function touchpanelOnOff() {
  const btnTouchPanel = document.querySelector(".btn-touch-panel");
  const controlContainer = document.querySelector(".control-container");
  let touchpanelOn = false;

  btnTouchPanel.addEventListener("click", () => {
    if (!touchpanelOn) {
      btnTouchPanel.src = "./src/icons/videogame_asset.png";
      controlContainer.classList.add("active");
      touchpanelOn = true;
    } else {
      btnTouchPanel.src = "./src/icons/videogame_asset_off.png";
      controlContainer.classList.remove("active");
      touchpanelOn = false;
    }
  });
}

function setFullscreen() {
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  const btnScreen = document.querySelector(".btn-screen");

  fullscreenContainer.requestFullscreen();
  btnScreen.src = "./src/icons/fullscreen_exit.png";
  fullscreen = true;
}

function exitFullscreen() {
  const btnScreen = document.querySelector(".btn-screen");

  if (document.fullscreenElement) {
    document.exitFullscreen();
    btnScreen.src = "./src/icons/fullscreen.png";
    fullscreen = false;
  } else {
    btnScreen.src = "./src/icons/fullscreen.png";
    fullscreen = false;
  }
}

function controlPanelForMobilecontrole() {
  const btnUpLeft = document.getElementById("btn-control-up-left");
  const btnUp = document.getElementById("btn-control-up");
  const btnUpRight = document.getElementById("btn-control-up-right");
  const btnLeft = document.getElementById("btn-control-left");
  const btnRight = document.getElementById("btn-control-right");
  const btnDownLeft = document.getElementById("btn-control-down-left");
  const btnDown = document.getElementById("btn-control-down");
  const btnDownRight = document.getElementById("btn-control-down-right");
  const btnSprint = document.getElementById("btn-control-sprint");
  const btnAttack = document.getElementById("btn-control-attack");

  btnUpLeft.addEventListener("touchstart", () => {
    keyboard.UP = true;
    keyboard.LEFT = true;
  });

  btnUpLeft.addEventListener("touchend", () => {
    keyboard.UP = false;
    keyboard.LEFT = false;
  });

  btnUp.addEventListener("touchstart", () => {
    keyboard.UP = true;
  });

  btnUp.addEventListener("touchend", () => {
    keyboard.UP = false;
  });

  btnUpRight.addEventListener("touchstart", () => {
    keyboard.UP = true;
    keyboard.RIGHT = true;
  });

  btnUpRight.addEventListener("touchend", () => {
    keyboard.UP = false;
    keyboard.RIGHT = false;
  });

  btnLeft.addEventListener("touchstart", () => {
    keyboard.LEFT = true;
  });

  btnLeft.addEventListener("touchend", () => {
    keyboard.LEFT = false;
  });

  btnRight.addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
  });

  btnRight.addEventListener("touchend", () => {
    keyboard.RIGHT = false;
  });

  btnDownLeft.addEventListener("touchstart", () => {
    keyboard.DOWN = true;
    keyboard.LEFT = true;
  });

  btnDownLeft.addEventListener("touchend", () => {
    keyboard.DOWN = false;
    keyboard.LEFT = false;
  });

  btnDown.addEventListener("touchstart", () => {
    keyboard.DOWN = true;
  });

  btnDown.addEventListener("touchend", () => {
    keyboard.DOWN = false;
  });

  btnDownRight.addEventListener("touchstart", () => {
    keyboard.DOWN = true;
    keyboard.RIGHT = true;
  });

  btnDownRight.addEventListener("touchend", () => {
    keyboard.DOWN = false;
    keyboard.RIGHT = false;
  });

  btnSprint.addEventListener("touchstart", () => {
    keyboard.SPACE = true;
  });

  btnSprint.addEventListener("touchend", () => {
    keyboard.SPACE = false;
  });

  btnAttack.addEventListener("touchstart", () => {
    keyboard.H = true;
  });

  btnAttack.addEventListener("touchend", () => {
    keyboard.H = false;
  });
}
