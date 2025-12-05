import { Fish } from "./fish.class.js";
import { ImageAssets } from "./image-Assets.class.js";

/**
 * Represents a red fish enemy in the game.
 * Inherits from Fish.
 *
 * @class
 * @extends Fish
 */
export class RedFish extends Fish {
  /**
   * Creates a new red fish instance.
   *
   * @param {number} x - The x-coordinate of the fish.
   * @param {number} y - The y-coordinate of the fish.
   */
  constructor(x, y) {
    super(
      ImageAssets.FISH_RED_SWIMMING,
      ImageAssets.FISH_RED_TRANSITION,
      ImageAssets.FISH_RED_BUBBLE_SWIMMING,
      ImageAssets.FISH_RED_DEAD,
      x,
      y
    );
  }
}
