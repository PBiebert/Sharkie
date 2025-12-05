import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents a status bar in the user interface.
 * Displays a percentage value (e.g. health) and an optional name.
 * Inherits from DrawableObject.
 *
 * @class
 * @extends DrawableObject
 */
export class StatusBar extends DrawableObject {
  /**
   * The width of the status bar.
   * @type {number}
   */
  width = 595 / 3;

  /**
   * The height of the status bar.
   * @type {number}
   */
  height = 158 / 3;

  /**
   * The x-coordinate of the status bar.
   * @type {number}
   */
  x = 0;

  /**
   * The y-coordinate of the status bar.
   * @type {number}
   */
  y = -10;

  /**
   * The current percentage value (e.g. health).
   * @type {number}
   */
  percentage = 100;

  /**
   * The name label displayed on the status bar.
   * @type {string}
   */
  name = "";

  /**
   * Creates a new status bar.
   *
   * @param {string} [name=""] - The name label for the status bar.
   */
  constructor(name = "") {
    super();
    this.name = name;
  }

  /**
   * Sets the percentage value and updates the image accordingly.
   *
   * @param {number} energy - The new percentage value.
   * @param {Array} IMAGES_ARRAY - Array of images for different percentage levels.
   */
  setPercentage(energy, IMAGES_ARRAY) {
    this.percentage = energy;
    let path = IMAGES_ARRAY[this.resoveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage.
   *
   * @returns {number} The index of the image to use.
   */
  resoveImageIndex() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage >= 80) {
      return 1;
    } else if (this.percentage >= 60) {
      return 2;
    } else if (this.percentage >= 40) {
      return 3;
    } else if (this.percentage >= 20) {
      return 4;
    } else if (this.percentage >= 0) {
      return 5;
    }
  }

  /**
   * Draws the status bar on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (this.name) {
      ctx.font = "22px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(this.name, this.x + 110, this.y + 43);
    }
  }
}
