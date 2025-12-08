import { ImageAssets } from "./image-Assets.class.js";
import { ThrowableObjects } from "./throwable-objects.class.js";

/**
 * Represents a normal bubble used as a throwable object.
 * Causes standard damage on impact.
 *
 * @class
 * @extends ThrowableObjects
 */
export class nomalBubbleAttake extends ThrowableObjects {
  /**
   * The height of the normal bubble.
   * @type {number}
   */
  height = 41;

  /**
   * The width of the normal bubble.
   * @type {number}
   */
  width = 40.5;

  /**
   * Offset for collision detection.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * The damage dealt by the normal bubble.
   * @type {number}
   */
  damage = 10;

  /**
   * Creates a new normal bubble.
   * @param {object} world - The current game world.
   * @param {number} x - The x position of the bubble.
   * @param {number} y - The y position of the bubble.
   * @param {string} viewDirection - The viewing direction of the bubble.
   */
  constructor(world, x, y, viewDirection) {
    super(world, x, y, viewDirection, ImageAssets.BUBBLE_SHOT);
  }
}
