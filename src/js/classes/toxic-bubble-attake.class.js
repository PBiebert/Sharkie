import { ImageAssets } from "./image-Assets.class.js";
import { ThrowableObjects } from "./throwable-objects.class.js";

/**
 * Represents a toxic bubble used as a throwable object.
 * Causes additional damage on impact.
 *
 * @class
 * @extends ThrowableObjects
 */
export class toxicBubbleAttake extends ThrowableObjects {
  height = 204 / 4;
  width = 202 / 4;
  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };
  damage = 20;

  /**
   * Creates a new toxic bubble.
   * @param {object} world - The current game world.
   * @param {number} x - The x position of the bubble.
   * @param {number} y - The y position of the bubble.
   * @param {string} viewDirection - The viewing direction of the bubble.
   */
  constructor(world, x, y, viewDirection) {
    super(world, x, y, viewDirection, ImageAssets.TOXIC_BUBBLE_SHOT);
  }
}
