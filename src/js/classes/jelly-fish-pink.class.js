import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

/**
 * Represents a pink jellyfish enemy in the game.
 * Inherits from JellyFish.
 *
 * @class
 * @extends JellyFish
 */
export class JellyFishPink extends JellyFish {
  /**
   * The energy value of the pink jellyfish.
   * @type {number}
   */
  energy = 60;

  /**
   * The damage dealt by the pink jellyfish.
   * @type {number}
   */
  damage = 30;

  /**
   * Creates a new pink jellyfish instance.
   *
   * @param {number} x - The x-coordinate of the jellyfish.
   * @param {number} y - The y-coordinate of the jellyfish.
   */
  constructor(x, y) {
    super(
      ImageAssets.JELLY_FISH_PINK_SWIMMING,
      ImageAssets.JELLY_FISH_PINK_DEAD,
      x,
      y
    );
  }
}
