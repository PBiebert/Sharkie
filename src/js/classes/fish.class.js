import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a fish enemy in the game.
 * Handles movement, animations, and state transitions.
 *
 * @class
 * @extends MovableObject
 */
export class Fish extends MovableObject {
  /**
   * Indicates this is a fish object.
   * @type {boolean}
   */
  isFish = true;

  /**
   * The width of the fish.
   * @type {number}
   */
  width = 241 / 3;

  /**
   * The height of the fish.
   * @type {number}
   */
  height = 198 / 3;

  /**
   * Array of swimming images.
   * @type {Array}
   */
  IMAGES_SWIMMING;

  /**
   * Array of transition images.
   * @type {Array}
   */
  IMAGES_TRANSITION;

  /**
   * Array of bubble swimming images.
   * @type {Array}
   */
  IMAGE_BUBBLE_SWIMMING;

  /**
   * Array of dead images.
   * @type {Array}
   */
  IMAGE_DEAD;

  /**
   * The horizontal speed of the fish.
   * @type {number}
   */
  speedX = 0.2;

  /**
   * The minimum speed to the left.
   * @type {number}
   */
  minSpeedLeft = 0.25;

  /**
   * Offset for collision detection.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };

  /**
   * Indicates whether the fish has a hitbox.
   * @type {boolean}
   */
  hasHitbox = false;

  /**
   * The visibility range for detecting the character.
   * @type {number}
   */
  visibility = 600;

  /**
   * Indicates whether the transition animation has been played.
   * @type {boolean}
   */
  transitionPlayed = false;

  /**
   * The energy of the fish.
   * @type {number}
   */
  energy = 40;

  /**
   * Creates a new fish instance.
   *
   * @param {Array} IMAGES_SWIMMING - Array of swimming images.
   * @param {Array} IMAGES_TRANSITION - Array of transition images.
   * @param {Array} IMAGE_BUBBLE_SWIMMING - Array of bubble swimming images.
   * @param {Array} IMAGE_DEAD - Array of dead images.
   * @param {number} x - The x-coordinate of the fish.
   * @param {number} y - The y-coordinate of the fish.
   */
  constructor(
    IMAGES_SWIMMING,
    IMAGES_TRANSITION,
    IMAGE_BUBBLE_SWIMMING,
    IMAGE_DEAD,
    x,
    y
  ) {
    super();
    this.IMAGES_SWIMMING = IMAGES_SWIMMING;
    this.IMAGES_TRANSITION = IMAGES_TRANSITION;
    this.IMAGE_BUBBLE_SWIMMING = IMAGE_BUBBLE_SWIMMING;
    this.IMAGE_DEAD = IMAGE_DEAD;
    this.x = x;
    this.y = y;
    this.speedX = this.minSpeedLeft + Math.random() * 0.75;
    this.loadAllImages();
    this.animate();
  }

  /**
   * Loads all images for the fish animations.
   */
  loadAllImages() {
    this.loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_TRANSITION);
    this.loadImages(this.IMAGE_BUBBLE_SWIMMING);
    this.loadImages(this.IMAGE_DEAD);
  }

  /**
   * Starts the animation loops for movement and state changes.
   */
  animate() {
    setInterval(() => {
      if (this.isCharacterInVisibilityRange()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.handleDeadState();
        return;
      }

      if (this.isCharacterInTransitionRange()) {
        if (!this.transitionPlayed) {
          this.handleTransitionAnimation();
        } else {
          this.handleBubbleSwimmingState();
        }
      } else {
        this.handleNormalSwimming();
      }
    }, this.speedImgChange);
  }

  /**
   * Checks if the character is within the fish's visibility range.
   * @returns {boolean}
   */
  isCharacterInVisibilityRange() {
    return (
      this.characterData.x + this.characterData.width >=
      this.x - this.visibility
    );
  }

  /**
   * Handles the dead state animation.
   */
  handleDeadState() {
    this.playAnimation(this.IMAGE_DEAD);
  }

  /**
   * Checks if the character is within the transition range.
   * @returns {boolean}
   */
  isCharacterInTransitionRange() {
    return (
      this.characterData.x + this.characterData.width >=
      this.x - (this.visibility - 300)
    );
  }

  /**
   * Handles the transition animation and sets the transition state.
   */
  handleTransitionAnimation() {
    this.playAnimation(this.IMAGES_TRANSITION);
    if (this.currentImage === this.IMAGES_TRANSITION.length - 1) {
      this.transitionPlayed = true;
      this.currentImage = 0;
    }
  }

  /**
   * Handles the bubble swimming state animation.
   */
  handleBubbleSwimmingState() {
    this.playAnimation(this.IMAGE_BUBBLE_SWIMMING);
  }

  /**
   * Handles the normal swimming animation and resets transition state.
   */
  handleNormalSwimming() {
    this.transitionPlayed = false;

    if (this.characterData.x > this.x) {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }
}
