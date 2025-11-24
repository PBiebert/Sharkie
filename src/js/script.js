"use strict";
/** @type {HTMLCanvasElement} */ // Typdefinition für das Canvas-Element

let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas"); // Holt das Canvas-Element aus dem DOM
  world = new World(canvas, keyboard);

  console.log("Mein Charakter ist:", world.character); // Gibt die Charakter-Instanz in der Konsole aus
}

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
  }
});
