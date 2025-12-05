import { CounterBar } from "./counter-bar.class.js";
import { ImageAssets } from "./image-Assets.class.js";

/**
 * Represents the coin counter in the user interface.
 * Displays the number of collected coins.
 * Inherits from CounterBar.
 *
 * @class
 * @extends CounterBar
 */
export class CoinCounter extends CounterBar {
  /**
   * Array with coin images for the display.
   * @type {Array}
   */
  static COIN_IMAGES = [ImageAssets.COIN[1]];

  /**
   * The x-coordinate of the display.
   * @type {number}
   */
  x = 10;

  /**
   * The y-coordinate of the display.
   * @type {number}
   */
  y = 50;

  /**
   * The current number of coins.
   * @type {number}
   */
  count = 0;

  /**
   * Creates a new coin counter.
   * Initializes the display with the coin image.
   */
  constructor() {
    super(ImageAssets.COIN[1]);
  }
}
