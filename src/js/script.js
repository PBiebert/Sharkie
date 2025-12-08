import { Keyboard } from "./classes/keyboard.class.js";
import { World } from "./classes/world.class.js";
import { AudioHub } from "./classes/audio-hub.class.js";

let canvas = document.getElementById("canvas");
let world;
let keyboard = new Keyboard();
let fullscreen = false;

/**
 * Initializes the game and sets up all event listeners and UI controls.
 * Called on window load.
 */
window.addEventListener("load", init);

/**
 * Main initialization function for the game.
 * Sets up all UI controls and event listeners.
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
 * Sets up the start screen and controls screen button actions.
 * Handles transition from start screen to intro and from start screen to controls.
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
 * Animates the intro text moving up.
 */
function moveIntroUp() {
  const introText = document.querySelector(".text");
  const btnSkip = document.getElementById("btn-skip");
  let bottomValue = -920;
  btnSkip.innerText = "Skip";

  const interval = setInterval(() => {
    bottomValue += 0.5;
    introText.style.bottom = bottomValue + "px";
    if (bottomValue >= -32) {
      btnSkip.innerText = "Next";
      clearInterval(interval);
    }
  }, 1000 / 60);
}

/**
 * Sets up the skip button in the intro screen to start the game.
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
 * Sets up the controls screen back button action.
 * Allows returning from controls screen to start screen.
 */
function setControllsScreenButtonAction() {
  const btnBack = document.getElementById("back");
  const controlsSite = document.querySelector(".controls");
  const startScreen = document.querySelector(".startScreen");

  btnBack.addEventListener("click", () => openSite(controlsSite, startScreen));
}

/**
 * Sets up the end screen home and replay button actions.
 * Handles navigation from end screen to home or replay.
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
 * Adds keyboard event listeners for controlling the game.
 * Handles keydown and keyup events for movement and actions.
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
 * Sets up the sound and fullscreen toggle buttons in the header.
 * Handles muting/unmuting sound and entering/exiting fullscreen.
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
 * @param {HTMLElement} to - The target screen element to show.
 */
function openSite(from, to) {
  from.classList.remove("active");
  to.classList.add("active");
}

/**
 * Checks the game result at intervals and shows the end screen if the game is over or won.
 * Starts a polling interval to check for win/lose state.
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
 * Useful for cleanup before showing end screen.
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
 * Adds hover sound effect to all buttons except control buttons.
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
 * Disables the right-click context menu on all control buttons.
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
}

/**
 * Enables all game sounds and updates the sound button icon.
 */
function playSound() {
  const btnSound = document.querySelector(".btn-sound");

  AudioHub.playSounds = true;
  AudioHub.backgroundSound(AudioHub.backgroundMusic);
  btnSound.src = "./src/icons/note.png";
}

/**
 * Toggles the touch control panel for mobile devices.
 * Handles showing/hiding the mobile control overlay.
 */
function touchpanelOnOff() {
  const btnTouchPanel = document.querySelector(".btn-touch-panel");
  const controlContainer = document.querySelector(".control-container");
  let touchpanelOn = false;

  if (window.innerWidth < 950) {
    touchpanelOn = true;
    btnTouchPanel.src = "./src/icons/videogame_asset.png";
    controlContainer.classList.add("active");
  }

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

/**
 * Sets the game to fullscreen mode and updates the fullscreen button icon.
 */
function setFullscreen() {
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  const btnScreen = document.querySelector(".btn-screen");

  fullscreenContainer.requestFullscreen();
  btnScreen.src = "./src/icons/fullscreen_exit.png";
  fullscreen = true;
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
  } else {
    btnScreen.src = "./src/icons/fullscreen.png";
    fullscreen = false;
  }
}

/**
 * Sets up the control panel for mobile controls with touch events.
 * Maps touch events to keyboard actions for mobile gameplay.
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
 * Enables mouse control for the mobile control panel.
 * Maps mouse events (mousedown/mouseup) on control buttons to keyboard actions.
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
 * Checks the screen orientation and updates the UI accordingly.
 * Shows a message if the device is in portrait mode.
 */
function checkScreenOrientation() {
  const isDisplayPortrait = document.querySelector(".is-display-portrait");
  const backgroundBody = document.querySelector("body");

  setInterval(() => {
    if (screen.orientation.type == "portrait-primary") {
      isDisplayPortrait.classList.add("active");
      backgroundBody.classList.remove("backgroundBody");
    } else if (isDisplayPortrait.classList.contains("active")) {
      isDisplayPortrait.classList.remove("active");
      backgroundBody.classList.add("backgroundBody");
    }
  }, 500);
}
