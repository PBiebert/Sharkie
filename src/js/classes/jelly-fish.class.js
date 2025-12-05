import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a jellyfish enemy in the game.
 * Handles movement, animations, and state transitions.
 *
 * @class
 * @extends MovableObject
 */
export class JellyFish extends MovableObject {
  /**
   * The width of the jellyfish.
   * @type {number}
   */
  width = 211 / 2;

  /**
   * The height of the jellyfish.
   * @type {number}
   */
  height = 300 / 2;

  /**
   * Array of swimming images.
   * @type {Array}
   */
  IMAGES_SWIMMING;

  /**
   * Array of dead images.
   * @type {Array}
   */
  IMAGES_DEAD;

  /**
   * The vertical speed of the jellyfish.
   * @type {number}
   */
  speedY = 1;

  /**
   * Offset for collision detection.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 20,
    right: 0,
    bottom: 20,
    left: 0,
  };

  /**
   * Indicates whether the jellyfish has a hitbox.
   * @type {boolean}
   */
  hasHitbox = false;

  /**
   * The energy of the jellyfish.
   * @type {number}
   */
  energy = 40;

  /**
   * Creates a new jellyfish instance.
   *
   * @param {Array} IMAGES_SWIMMING - Array of swimming images.
   * @param {Array} IMAGES_DEAD - Array of dead images.
   * @param {number} x - The x-coordinate of the jellyfish.
   * @param {number} y - The y-coordinate of the jellyfish.
   */
  constructor(IMAGES_SWIMMING, IMAGES_DEAD, x, y) {
    super();
    this.loadImage(IMAGES_SWIMMING[0]);

    this.loadImages(IMAGES_SWIMMING);
    this.loadImages(IMAGES_DEAD);
    this.IMAGES_SWIMMING = IMAGES_SWIMMING;
    this.IMAGES_DEAD = IMAGES_DEAD;
    this.x = x;
    this.y = y;
    this.speedY = this.minSpeedLeft + Math.random() * 0.75;
    this.animate();
  }

  /**
   * Starts the animation loops for movement and state changes.
   */
  animate() {
    setInterval(() => {
      this.moveUpAndDown();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, this.speedImgChange);
  }

  /**
   * Moves the jellyfish up and down within the allowed range.
   */
  moveUpAndDown() {
    if (this.moveUpDownToggle) {
      this.y -= this.speedY;
      if (this.y <= -10) {
        this.moveUpDownToggle = false;
      }
    } else {
      this.y += this.speedY;
      if (this.y >= 480 - this.height + 10) {
        this.moveUpDownToggle = true;
      }
    }
  }
}
