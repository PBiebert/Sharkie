import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a throwable object (e.g. bubble) in the game.
 * Handles movement, direction, and collision logic.
 *
 * @class
 * @extends MovableObject
 */
export class ThrowableObjects extends MovableObject {
  /**
   * The height of the throwable object.
   * @type {number}
   */
  height = 204 / 4;

  /**
   * The width of the throwable object.
   * @type {number}
   */
  width = 202 / 4;

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
   * Indicates whether the object has a hitbox.
   * @type {boolean}
   */
  hasHitbox = false;

  /**
   * The horizontal speed of the throwable object.
   * @type {number}
   */
  speedX = 5;

  /**
   * The vertical speed of the throwable object.
   * @type {number}
   */
  speedY = 1;

  /**
   * Reference to the game world.
   * @type {Object}
   */
  world;

  /**
   * The starting x-coordinate of the throw.
   * @type {number}
   */
  startX;

  /**
   * The starting y-coordinate of the throw.
   * @type {number}
   */
  startY;

  /**
   * The maximum distance the object can travel.
   * @type {number}
   */
  maxDistance = 250;

  /**
   * The damage value this object can deal.
   * @type {number}
   */
  damage = 20;

  /**
   * The direction the object is facing ("right" or "left").
   * @type {string}
   */
  viewDirection = "right";

  /**
   * Creates a new throwable object.
   *
   * @param {Object} world - Reference to the game world.
   * @param {number} x - The x-coordinate where the object is thrown.
   * @param {number} y - The y-coordinate where the object is thrown.
   * @param {string} viewDirection - The direction of the throw ("right" or "left").
   */
  constructor(world, x, y, viewDirection, IMAGES) {
    super();
    this.loadImage(IMAGES);
    this.world = world;
    this.viewDirection = viewDirection;
    this.throw(x, y);
  }

  /**
   * Initiates the throw and handles the object's movement.
   *
   * @param {number} x - The starting x-coordinate.
   * @param {number} y - The starting y-coordinate.
   */
  throw(x, y) {
    if (this.viewDirection == "right") {
      this.x = x + 100;
    }
    if (this.viewDirection == "left") {
      this.x = x + 50;
    }
    this.y = y + 135;
    this.startX = this.x;

    setInterval(() => {
      if (this.isFacingRight()) {
        this.x += this.speedX;
        if (this.x >= this.startX + this.maxDistance) {
          this.speedX -= 0.05;
          this.y -= this.speedY;
          if (this.speedX <= 0) this.speedX = 0;
        }
      }
      if (this.isFacingLeft()) {
        this.x -= this.speedX;
        if (this.hasReachedLeftLimit()) {
          this.speedX -= 0.05;
          this.y -= this.speedY;
          if (this.isStopped()) {
            this.speedX = 0;
          }
        }
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the object is facing right.
   * @returns {boolean}
   */
  isFacingRight() {
    return this.viewDirection === "right";
  }

  /**
   * Checks if the object is facing left.
   * @returns {boolean}
   */
  isFacingLeft() {
    return this.viewDirection == "left";
  }

  /**
   * Checks if the object has reached its left movement limit.
   * @returns {boolean}
   */
  hasReachedLeftLimit() {
    return this.x <= this.startX - this.maxDistance;
  }

  /**
   * Checks if the object has stopped moving (speedX <= 0).
   * @returns {boolean}
   */
  isStopped() {
    return this.speedX <= 0;
  }
}
