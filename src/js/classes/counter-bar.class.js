import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents a counter bar in the user interface.
 * Displays a value (e.g. coins or bubbles) with an image and number.
 * Inherits from DrawableObject.
 *
 * @class
 * @extends DrawableObject
 */
export class CounterBar extends DrawableObject {
  /**
   * The width of the counter bar.
   * @type {number}
   */
  width = 99 / 3;

  /**
   * The height of the counter bar.
   * @type {number}
   */
  height = 93 / 3;

  /**
   * The current counter value.
   * @type {number}
   */
  count = 0;

  /**
   * Creates a new counter bar.
   *
   * @param {string} IMAGE - The image for the display.
   */
  constructor(IMAGE) {
    super();
    this.loadImage(IMAGE);
  }

  /**
   * Draws the counter bar on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.count, this.x + 50, this.y + 28);
  }
}
