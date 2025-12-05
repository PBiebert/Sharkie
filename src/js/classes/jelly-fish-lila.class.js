import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

/**
 * Represents a purple (lila) jellyfish enemy in the game.
 * Inherits from JellyFish.
 *
 * @class
 * @extends JellyFish
 */
export class JellyFishLila extends JellyFish {
  /**
   * Creates a new purple jellyfish instance.
   *
   * @param {number} x - The x-coordinate of the jellyfish.
   * @param {number} y - The y-coordinate of the jellyfish.
   */
  constructor(x, y) {
    super(
      ImageAssets.JELLY_FISH_LILA_SWIMMING,
      ImageAssets.JELLY_FISH_LILA_DEAD,
      x,
      y
    );
  }
}
