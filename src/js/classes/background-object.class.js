import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a background object in the game world.
 * Inherits movement functionality from MovableObject.
 */
export class BackgroundObject extends MovableObject {
  /**
   * The width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new background object.
   * @param {string} imagePath - The path to the image file.
   * @param {number} x - The x-coordinate where the object is placed.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    /**
     * The x-coordinate of the background object.
     * @type {number}
     */
    this.x = x;
    /**
     * The y-coordinate of the background object.
     * @type {number}
     */
    this.y = 480 - this.height;
  }
}
