import { ImageAssets } from "./image-Assets.class.js";
import { StatusBar } from "./status-bar.class.js";

/**
 * Represents the health bar in the user interface.
 * Displays the player's current health.
 * Inherits from StatusBar.
 *
 * @class
 * @extends StatusBar
 */
export class HealthBar extends StatusBar {
  /**
   * The width of the health bar.
   * @type {number}
   */
  width = 595 / 3;

  /**
   * The height of the health bar.
   * @type {number}
   */
  height = 158 / 3;

  /**
   * Creates a new health bar.
   *
   * @param {number} x - The x-coordinate of the health bar.
   * @param {number} y - The y-coordinate of the health bar.
   * @param {string} name - The name identifier for the status bar.
   */
  constructor(x, y, name) {
    super(name);
    this.x = x;
    this.y = y;
    this.loadImage(ImageAssets.LIFE_BAR[0]);
    this.loadImages(ImageAssets.LIFE_BAR);
  }
}
