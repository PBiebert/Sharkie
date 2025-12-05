import { Fish } from "./fish.class.js";
import { ImageAssets } from "./image-Assets.class.js";

/**
 * Represents a pink fish enemy in the game.
 * Inherits from Fish.
 *
 * @class
 * @extends Fish
 */
export class PinkFish extends Fish {
  /**
   * Creates a new pink fish instance.
   *
   * @param {number} x - The x-coordinate of the fish.
   * @param {number} y - The y-coordinate of the fish.
   */
  constructor(x, y) {
    super(
      ImageAssets.FISH_PINK_SWIMMING,
      ImageAssets.FISH_PINK_TRANSITION,
      ImageAssets.FISH_PINK_BUBBLE_SWIMMING,
      ImageAssets.FISH_PINK_DEAD,
      x,
      y
    );
  }
}
