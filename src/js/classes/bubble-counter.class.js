import { CounterBar } from "./counter-bar.class.js";
import { ImageAssets } from "./image-Assets.class.js";

/**
 * Represents the bubble counter in the user interface.
 * Displays the number of available bubbles.
 * Inherits from CounterBar.
 */
export class BubbleCounter extends CounterBar {
  /**
   * The x-coordinate of the display.
   * @type {number}
   */
  x = 10;

  /**
   * The y-coordinate of the display.
   * @type {number}
   */
  y = 90;

  /**
   * The current number of bubbles.
   * @type {number}
   */
  count = 0;

  /**
   * Creates a new bubble counter.
   */
  constructor() {
    super(ImageAssets.BUBBLE_IMAGES);
  }
}
