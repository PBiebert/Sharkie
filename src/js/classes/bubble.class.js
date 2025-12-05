import { CollectableObjects } from "./collectable-objects.class.js";
import { ImageAssets } from "./image-Assets.class.js";

/**
 * Represents a bubble as a collectable object in the game.
 * Inherits from CollectableObjects.
 *
 * @class
 * @extends CollectableObjects
 */
export class Bubble extends CollectableObjects {
  /**
   * The width of the bubble.
   * @type {number}
   */
  width = 178 / 3;

  /**
   * The height of the bubble.
   * @type {number}
   */
  height = 243 / 3;

  /**
   * The offset for the bubble's collision detection.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 40,
    right: 10,
    bottom: 5,
    left: 10,
  };

  /**
   * Creates a new instance of a bubble.
   *
   * @param {number} x - The x-coordinate of the bubble.
   * @param {number} y - The y-coordinate of the bubble.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadAllCharacterImages();
    this.animate(ImageAssets.BUBBLE);
  }

  /**
   * Loads all images for the bubble.
   */
  loadAllCharacterImages() {
    this.loadImage(ImageAssets.BUBBLE[0]);
    this.loadImages(ImageAssets.BUBBLE);
  }
}
