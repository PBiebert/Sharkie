/**
 * Represents a drawable object in the game.
 * Provides basic properties and methods for rendering and animation.
 *
 * @class
 */
export class DrawableObject {
  /**
   * The current image of the object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache for loaded images.
   * @type {Object}
   */
  imageCache = {};

  /**
   * The index of the current image for animation.
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
   * Real x-coordinate for collision frame.
   * @type {number}
   */
  rX;

  /**
   * Real y-coordinate for collision frame.
   * @type {number}
   */
  rY;

  /**
   * Real width for collision frame.
   * @type {number}
   */
  rWidth;

  /**
   * Real height for collision frame.
   * @type {number}
   */
  rHeight;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 100;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 150;

  /**
   * The interval speed for changing images (in ms).
   * @type {number}
   */
  speedImgChange = 100;

  /**
   * Indicates whether the object has a hitbox.
   * @type {boolean}
   */
  hasHitbox = false;

  /**
   * Creates a new drawable object.
   */
  constructor() {}

  /**
   * Loads a single image for the object.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the image cache.
   * @param {Array<string>} array - Array of image paths.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the collision frame (hitbox) if enabled.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this.hasHitbox) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.rX, this.rY, this.rWidth, this.rHeight);
      ctx.stroke();
    }
  }

  /**
   * Calculates the real frame for collision detection.
   */
  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rWidth = this.width - this.offset.left - this.offset.right;
    this.rHeight = this.height - this.offset.top - this.offset.bottom;
  }

  /**
   * Plays the animation by cycling through the given image array.
   * @param {Array<string>} imageArray - Array of image paths for animation.
   */
  playAnimation(imageArray) {
    let i = this.currentImage % imageArray.length;
    let path = imageArray[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    if (this.currentImage == imageArray.length) {
      this.currentImage = 0;
    }
  }

  /**
   * Checks if this object is colliding with another object.
   * @param {DrawableObject} object - The other object to check collision with.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isColliding(object) {
    this.getRealFrame();
    object.getRealFrame();
    return (
      this.rX + this.rWidth > object.rX &&
      this.rY + this.rHeight > object.rY &&
      this.rX < object.rX + object.rWidth &&
      this.rY < object.rY + object.rHeight
    );
  }

  isCollidingCollectableObjects(object) {
    const pickupOffset = -10;
    this.getRealFrame();
    object.getRealFrame();
    return (
      this.rX + this.rWidth + pickupOffset > object.rX - pickupOffset &&
      this.rY + this.rHeight > object.rY &&
      this.rX - pickupOffset < object.rX + object.rWidth + pickupOffset &&
      this.rY < object.rY + object.rHeight
    );
  }
}
