import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

/**
 * Represents a green jellyfish enemy in the game.
 * Inherits from JellyFish.
 *
 * @class
 * @extends JellyFish
 */
export class JellyFishGreen extends JellyFish {
  /**
   * The energy value of the green jellyfish.
   * @type {number}
   */
  energy = 60;

  /**
   * The damage dealt by the green jellyfish.
   * @type {number}
   */
  damage = 30;

  /**
   * Creates a new green jellyfish instance.
   *
   * @param {number} x - The x-coordinate of the jellyfish.
   * @param {number} y - The y-coordinate of the jellyfish.
   */
  constructor(x, y) {
    super(
      ImageAssets.JELLY_FISH_GREEN_SWIMMING,
      ImageAssets.JELLY_FISH_GREEN_DEAD,
      x,
      y
    );
  }
}
