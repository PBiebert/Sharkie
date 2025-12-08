import { Keyboard } from "./classes/keyboard.class.js";
import { World } from "./classes/world.class.js";
import { AudioHub } from "./classes/audio-hub.class.js";

/**
 * The canvas element for the game.
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("canvas");

/**
 * The global World instance of the game.
 * @type {World}
 */
let world;

/**
 * The global Keyboard instance for controls.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Indicates whether fullscreen mode is active.
 * @type {boolean}
 */
let fullscreen = false;

/**
 * Indicates whether the touch panel is active.
 * @type {boolean}
 */
let touchpanelOn = false;

/**
 * Indicates whether the settings have been applied after the first click.
 * @type {boolean}
 */
let firstClickDone = false;

/**
 * Initializes the game after the page has loaded.
 * Loads settings from localStorage, sets event listeners, and calls initialization functions.
 */
window.addEventListener("load", () => {
  loadSettingsFromLocalStorage();
  init();
  setupFirstClickHandler();
});

/**
 * Initializes all UI and control functions of the game.
 */
function init() {
  controlPanelForMobilecontrole();
  enableMobileControlPanelWithMouse();
  touchpanelOnOff();
  setKeyEventsToControle();
  setStartScreenButtonAction();
  setSkipScreenButtonAction();
  setEndScreenButtonAction();
  setControllsScreenButtonAction();
  setHeadLineButtonAction();
  setHoverSound();
  disableContextmenuOnControlButtons();
  checkScreenOrientation();
}

/**
 * Loads the settings for sound, fullscreen, and touch panel from localStorage and sets the corresponding variables.
 */
function loadSettingsFromLocalStorage() {
  const soundSetting = localStorage.getItem("playSounds");
  if (soundSetting !== null) {
    AudioHub.playSounds = soundSetting === "true";
  }
  const fullscreenSetting = localStorage.getItem("fullscreen");
  if (fullscreenSetting !== null) {
    fullscreen = fullscreenSetting === "true";
  }
  const touchpanelSetting = localStorage.getItem("touchpanelOn");
  if (touchpanelSetting !== null) {
    touchpanelOn = touchpanelSetting === "true";
  }
}

/**
 * Adds a one-time click event listener that applies the saved settings on the first click.
 */
function setupFirstClickHandler() {
  window.addEventListener("click", () => {
    if (firstClickDone) return;
    firstClickDone = true;
    applySettingsOnFirstClick();
  });
}

/**
 * Applies the saved settings for sound, touch panel, and fullscreen on the first click.
 */
function applySettingsOnFirstClick() {
  if (AudioHub.playSounds) {
    playSound();
  } else {
    muteSound();
  }
  setTouchpanelState(touchpanelOn);
  setFullscreenState(fullscreen);
}

/**
 * Sets the state of the touch panel and updates the UI accordingly.
 * @param {boolean} state - true to activate the touch panel, false to deactivate.
 */
function setTouchpanelState(state) {
  const btnTouchPanel = document.querySelector(".btn-touch-panel");
  const controlContainer = document.querySelector(".control-container");
  if (state) {
    btnTouchPanel.src = "./src/icons/videogame_asset.png";
    controlContainer.classList.add("active");
    touchpanelOn = true;
  } else {
    btnTouchPanel.src = "./src/icons/videogame_asset_off.png";
    controlContainer.classList.remove("active");
    touchpanelOn = false;
  }
}

/**
 * Sets the state of fullscreen mode and updates the UI accordingly.
 * @param {boolean} state - true to activate fullscreen, false to deactivate.
 */
function setFullscreenState(state) {
  const btnScreen = document.querySelector(".btn-screen");
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  if (state && !document.fullscreenElement) {
    fullscreenContainer.requestFullscreen();
    btnScreen.src = "./src/icons/fullscreen_exit.png";
    fullscreen = true;
  } else if (!state && document.fullscreenElement) {
    document.exitFullscreen();
    btnScreen.src = "./src/icons/fullscreen.png";
    fullscreen = false;
  } else {
    btnScreen.src = state
      ? "./src/icons/fullscreen_exit.png"
      : "./src/icons/fullscreen.png";
    fullscreen = state;
  }
}

/**
 * Sets up the actions for the buttons on the start screen and controls screen.
 */
function setStartScreenButtonAction() {
  const btnControls = document.getElementById("btn-controls");
  const controlsSite = document.querySelector(".controls");
  const startScreen = document.querySelector(".startScreen");
  const btnStart = document.getElementById("btn-start");
  const introScreen = document.querySelector(".intro");

  btnControls.addEventListener("click", () =>
    openSite(startScreen, controlsSite)
  );

  btnStart.addEventListener("click", () => {
    startScreen.classList.remove("active");
    introScreen.classList.add("active");
    moveIntroUp();
  });
}

/**
 * Animates the intro text moving upwards.
 */
function moveIntroUp() {
  const introText = document.querySelector(".text");
  const btnSkip = document.getElementById("btn-skip");
  let bottomValue = -920;
  btnSkip.innerText = "Skip";

  const interval = setInterval(() => {
    bottomValue += 0.5;
    introText.style.bottom = bottomValue + "px";
    if (bottomValue >= 0) {
      btnSkip.innerText = "Next";
    }
    if (bottomValue >= 950) {
      clearInterval(interval);
    }
  }, 1000 / 60);
}

/**
 * Sets the action for the skip button on the intro screen to start the game.
 */
function setSkipScreenButtonAction() {
  const btnSkip = document.getElementById("btn-skip");
  const introScreen = document.querySelector(".intro");

  btnSkip.addEventListener("click", () => {
    introScreen.classList.remove("active");

    world = new World(canvas, keyboard);
    checkResult();
    checkScreenOrientation();
  });
}

/**
 * Sets the action for the back button on the controls screen.
 */
function setControllsScreenButtonAction() {
  const btnBack = document.getElementById("back");
  const controlsSite = document.querySelector(".controls");
  const startScreen = document.querySelector(".startScreen");

  btnBack.addEventListener("click", () => openSite(controlsSite, startScreen));
}

/**
 * Sets up the actions for the buttons on the end screen (Home and Replay).
 */
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
    checkScreenOrientation();
  });
}

/**
 * Adds event listeners for keyboard controls.
 * Sets the corresponding keyboard variables on keydown and keyup.
 */
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

/**
 * Sets up the actions for the sound and fullscreen buttons in the header.
 */
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

/**
 * Switches between two UI screens.
 * @param {HTMLElement} from - The current screen element.
 * @param {HTMLElement} to - The target screen element.
 */
function openSite(from, to) {
  from.classList.remove("active");
  to.classList.add("active");
}

/**
 * Regularly checks the game result and shows the end screen on win or game over.
 */
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

/**
 * Stops all running intervals in the game.
 */
function stopAllIntervalls() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Displays the end screen with the game result.
 * @param {string} gameResult - The result of the game ("win" or "gameOver").
 */
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

/**
 * Adds a hover sound effect to all buttons except control buttons.
 */
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

/**
 * Disables the context menu (right-click) on all control buttons.
 */
function disableContextmenuOnControlButtons() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button.classList.contains("control-button")) {
      button.addEventListener("contextmenu", (event) => event.preventDefault());
    }
  });
}

/**
 * Mutes all game sounds and updates the sound button icon.
 */
function muteSound() {
  const btnSound = document.querySelector(".btn-sound");

  AudioHub.playSounds = false;
  AudioHub.stop(AudioHub.backgroundMusic);
  btnSound.src = "./src/icons/mute.png";
  localStorage.setItem("playSounds", "false");
}

/**
 * Enables all game sounds and updates the sound button icon.
 */
function playSound() {
  const btnSound = document.querySelector(".btn-sound");

  AudioHub.playSounds = true;
  AudioHub.backgroundSound(AudioHub.backgroundMusic);
  btnSound.src = "./src/icons/note.png";
  localStorage.setItem("playSounds", "true");
}

/**
 * Toggles the touch control panel for mobile devices and updates the UI.
 */
function touchpanelOnOff() {
  const btnTouchPanel = document.querySelector(".btn-touch-panel");
  const controlContainer = document.querySelector(".control-container");

  if (window.innerWidth < 950) {
    touchpanelOn = true;
    btnTouchPanel.src = "./src/icons/videogame_asset.png";
    controlContainer.classList.add("active");
    localStorage.setItem("touchpanelOn", "true");
  }

  btnTouchPanel.addEventListener("click", () => {
    if (!touchpanelOn) {
      btnTouchPanel.src = "./src/icons/videogame_asset.png";
      controlContainer.classList.add("active");
      touchpanelOn = true;
      localStorage.setItem("touchpanelOn", "true");
    } else {
      btnTouchPanel.src = "./src/icons/videogame_asset_off.png";
      controlContainer.classList.remove("active");
      touchpanelOn = false;
      localStorage.setItem("touchpanelOn", "false");
    }
  });
}

/**
 * Activates fullscreen mode and updates the fullscreen button icon.
 */
function setFullscreen() {
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  const btnScreen = document.querySelector(".btn-screen");

  fullscreenContainer.requestFullscreen();
  btnScreen.src = "./src/icons/fullscreen_exit.png";
  fullscreen = true;
  localStorage.setItem("fullscreen", "true");
}

/**
 * Exits fullscreen mode and updates the fullscreen button icon.
 */
function exitFullscreen() {
  const btnScreen = document.querySelector(".btn-screen");

  if (document.fullscreenElement) {
    document.exitFullscreen();
    btnScreen.src = "./src/icons/fullscreen.png";
    fullscreen = false;
    localStorage.setItem("fullscreen", "false");
  } else {
    btnScreen.src = "./src/icons/fullscreen.png";
    fullscreen = false;
    localStorage.setItem("fullscreen", "false");
  }
}

/**
 * Initializes the control panel for mobile controls.
 * Maps touch events to the corresponding keyboard variables.
 */
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

/**
 * Initializes mouse control for the mobile control panel.
 * Maps mouse events to the corresponding keyboard variables.
 */
function enableMobileControlPanelWithMouse() {
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

  btnUpLeft.addEventListener("mousedown", () => {
    keyboard.UP = true;
    keyboard.LEFT = true;
  });

  btnUpLeft.addEventListener("mouseup", () => {
    keyboard.UP = false;
    keyboard.LEFT = false;
  });

  btnUp.addEventListener("mousedown", () => {
    keyboard.UP = true;
  });

  btnUp.addEventListener("mouseup", () => {
    keyboard.UP = false;
  });

  btnUpRight.addEventListener("mousedown", () => {
    keyboard.UP = true;
    keyboard.RIGHT = true;
  });

  btnUpRight.addEventListener("mouseup", () => {
    keyboard.UP = false;
    keyboard.RIGHT = false;
  });

  btnLeft.addEventListener("mousedown", () => {
    keyboard.LEFT = true;
  });

  btnLeft.addEventListener("mouseup", () => {
    keyboard.LEFT = false;
  });

  btnRight.addEventListener("mousedown", () => {
    keyboard.RIGHT = true;
  });

  btnRight.addEventListener("mouseup", () => {
    keyboard.RIGHT = false;
  });

  btnDownLeft.addEventListener("mousedown", () => {
    keyboard.DOWN = true;
    keyboard.LEFT = true;
  });

  btnDownLeft.addEventListener("mouseup", () => {
    keyboard.DOWN = false;
    keyboard.LEFT = false;
  });

  btnDown.addEventListener("mousedown", () => {
    keyboard.DOWN = true;
  });

  btnDown.addEventListener("mouseup", () => {
    keyboard.DOWN = false;
  });

  btnDownRight.addEventListener("mousedown", () => {
    keyboard.DOWN = true;
    keyboard.RIGHT = true;
  });

  btnDownRight.addEventListener("mouseup", () => {
    keyboard.DOWN = false;
    keyboard.RIGHT = false;
  });

  btnSprint.addEventListener("mousedown", () => {
    keyboard.SPACE = true;
  });

  btnSprint.addEventListener("mouseup", () => {
    keyboard.SPACE = false;
  });

  btnAttack.addEventListener("mousedown", () => {
    keyboard.H = true;
  });

  btnAttack.addEventListener("mouseup", () => {
    keyboard.H = false;
  });
}

/**
 * Regularly checks the screen orientation and shows a message in portrait mode.
 */
function checkScreenOrientation() {
  const isDisplayPortrait = document.querySelector(".is-display-portrait");
  const body = document.querySelector("body");

  setInterval(() => {
    if (CheckAaspectRatio()) {
      isDisplayPortrait.classList.add("active");
      body.classList.remove("backgroundBody");
    } else if (isDisplayPortrait.classList.contains("active")) {
      isDisplayPortrait.classList.remove("active");
      body.classList.add("backgroundBody");
    }
  }, 500);
}

/**
 * Checks if the window is in portrait mode.
 * @returns {boolean} true if portrait, otherwise false.
 */
function CheckAaspectRatio() {
  if (
    screen.orientation.type == "portrait-primary" ||
    window.innerHeight > window.innerWidth
  ) {
    return true;
  }
}
