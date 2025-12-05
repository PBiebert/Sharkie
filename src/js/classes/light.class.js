import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a light beam in the game background.
 * Inherits from MovableObject.
 *
 * @class
 * @extends MovableObject
 */
export class LightBeam extends MovableObject {
  /**
   * The y-coordinate of the light beam.
   * @type {number}
   */
  y = 0;

  /**
   * The height of the light beam.
   * @type {number}
   */
  height = 480;

  /**
   * The width of the light beam.
   * @type {number}
   */
  width = 720;

  /**
   * The horizontal speed of the light beam.
   * @type {number}
   */
  speedX = 0.5;

  /**
   * Creates a new light beam instance.
   *
   * @param {number} x - The x-coordinate of the light beam.
   */
  constructor(x) {
    super().loadImage("src/img/3. Background/Layers/1. Light/1.png");
    this.x = x;
    this.animate();
  }

  /**
   * Starts the animation loop for moving the light beam to the left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
