import { Fish } from "./fish.class.js";
import { ImageAssets } from "./image-Assets.class.js";

/**
 * Represents a green fish enemy in the game.
 * Inherits from Fish.
 *
 * @class
 * @extends Fish
 */
export class GreenFish extends Fish {
  /**
   * Creates a new green fish instance.
   *
   * @param {number} x - The x-coordinate of the fish.
   * @param {number} y - The y-coordinate of the fish.
   */
  constructor(x, y) {
    super(
      ImageAssets.FISH_GREEN_SWIMMING,
      ImageAssets.FISH_GREEN_TRANSITION,
      ImageAssets.FISH_GREEN_BUBBLE_SWIMMING,
      ImageAssets.FISH_GREEN_DEAD,
      x,
      y
    );
  }
}
