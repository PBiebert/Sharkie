import { CollectableObjects } from "./collectable-objects.class.js";
import { ImageAssets } from "./image-Assets.class.js";

/**
 * Represents a coin as a collectable object in the game.
 * Inherits from CollectableObjects.
 *
 * @class
 * @extends CollectableObjects
 */
export class Coin extends CollectableObjects {
  /**
   * The width of the coin.
   * @type {number}
   */
  width = 99 / 3;

  /**
   * The height of the coin.
   * @type {number}
   */
  height = 93 / 3;

  /**
   * Creates a new instance of a coin.
   *
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadAllCharacterImages();
    this.animate(ImageAssets.COIN);
  }

  /**
   * Loads all images for the coin.
   */
  loadAllCharacterImages() {
    this.loadImage(ImageAssets.COIN[0]);
    this.loadImages(ImageAssets.COIN);
  }
}
