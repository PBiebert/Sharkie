import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents a collectable object in the game.
 * Inherits from DrawableObject.
 *
 * @class
 * @extends DrawableObject
 */
export class CollectableObjects extends DrawableObject {
  /**
   * The image of the object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache for loaded images.
   * @type {Object}
   */
  imageCache = {};

  /**
   * The index of the current image.
   * @type {number}
   */
  currentImage = 0;

  /**
   * The x-coordinate of the object.
   * @type {number}
   */
  x = 100;

  /**
   * The y-coordinate of the object.
   * @type {number}
   */
  y = 250;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 100;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 100;

  /**
   * The interval speed for changing images (in ms).
   * @type {number}
   */
  speedImgChange = 125;

  /**
   * Indicates whether the object has a hitbox.
   * @type {boolean}
   */
  hasHitbox = false;

  /**
   * Creates a new collectable object.
   */
  constructor() {
    super();
  }

  /**
   * Starts the animation for the object using the given image array.
   * @param {Array} IMAGE_ARRAY - Array of images for animation.
   */
  animate(IMAGE_ARRAY) {
    setInterval(() => {
      this.playAnimation(IMAGE_ARRAY);
    }, this.speedImgChange);
  }
}
