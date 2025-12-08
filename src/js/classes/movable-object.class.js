import { DrawableObject } from "./drawable-object.class.js";
import { AudioHub } from "./audio-hub.class.js";

/**
 * Represents a movable object in the game.
 * Provides movement, gravity, collision, and animation logic.
 *
 * @class
 * @extends DrawableObject
 */
export class MovableObject extends DrawableObject {
  /**
   * Indicates if the object is facing the other direction.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * The interval speed for changing images (in ms).
   * @type {number}
   */
  speedImgChange = 100;

  /**
   * Reference to the game world.
   * @type {Object}
   */
  world;
 
  /**
   * Toggle for up/down movement (used by some subclasses).
   * @type {boolean}
   */
  moveUpDownToggle = true;

  /**
   * Default movement speed.
   * @type {number}
   */
  speedDefault = 2;

  /**
   * Boosted movement speed (e.g. sprint).
   * @type {number}
   */
  speedBoost = 4;

  /**
   * Horizontal speed.
   * @type {number}
   */
  speedX = 2;

  /**
   * Vertical speed.
   * @type {number}
   */
  speedY = 0;

  /**
   * The y-coordinate representing the ground.
   * @type {number}
   */
  groundY = 285;

  /**
   * Minimum speed to the left.
   * @type {number}
   */
  minSpeedLeft = 0.25;

  /**
   * Gravity value for vertical movement.
   * @type {number}
   */
  graphiteValue = 0.15;

  /**
   * Gravity interval speed.
   * @type {number}
   */
  graphiteSpeed = 30;

  /**
   * The energy/health of the object.
   * @type {number}
   */
  energy = 100;

  /**
   * Timestamp of the last hit.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Indicates if cooldown is active.
   * @type {boolean}
   */
  cooldownActive = false;

  /**
   * Cooldown duration in milliseconds.
   * @type {number}
   */
  cooldownLength = 1000;

  /**
   * Timestamp of the last standing state.
   * @type {number}
   */
  lastStanding = Date.now();

  /**
   * Time until the object gets tired (in ms).
   * @type {number}
   */
  timeToSleep = 10000;

  /**
   * Indicates if the object is sleeping.
   * @type {boolean}
   */
  isSleep = false;

  /**
   * Indicates if the object has shot (e.g. bubble).
   * @type {boolean}
   */
  hasShot = false;

  /**
   * Data about the character (for AI/enemy logic).
   * @type {{x: number, y: number}}
   */
  characterData = { "x": 0, "y": 0 };

  /**
   * Indicates if the character is within sight.
   * @type {boolean}
   */
  seeCharacter = false;

  /**
   * Indicates if there is contact with the character.
   * @type {boolean}
   */
  contactWithCharacter = false;

  /**
   * Visibility range for detecting the character.
   * @type {number}
   */
  visibility = 500;

  /**
   * Indicates if this object is the endboss.
   * @type {boolean}
   */
  isEndboss = false;

  /**
   * The damage value this object can deal.
   * @type {number}
   */
  damage = 15;

  /**
   * Creates a new movable object.
   */
  constructor() {
    super();
  }

  /**
   * Moves the object to the right by its horizontal speed.
   */
  moveRight() {
    this.x += this.speedX;
  }

  /**
   * Moves the object to the left by its horizontal speed.
   */
  moveLeft() {
    this.x -= this.speedX;
  }

  /**
   * Moves the object up by setting its vertical speed.
   */
  moveUp() {
    this.speedY = this.speedDefault * 2;
  }

  /**
   * Moves the object down by increasing its y-coordinate.
   */
  moveDown() {
    this.speedY = 0;
    this.y += this.speedDefault;
  }

  /**
   * Handles sprinting logic (increases speed if SPACE is pressed).
   */
  sprint() {
    if (this.world.keyboard.SPACE) {
      this.speedX = this.speedBoost;
    } else {
      this.speedX = this.speedDefault;
    }
  }

  /**
   * Plays an animation by cycling through the given image array.
   * Handles special logic for death animations.
   * @param {Array} imageArray - Array of image paths for animation.
   */
  playAnimation(imageArray) {
    let i = this.currentImage % imageArray.length;
    let path = imageArray[i];
    this.img = this.imageCache[path];

    // Check if death animation should be played
    if (
      (this.isCharacter && this.isDead()) ||
      (this.isEndboss && this.isDead()) ||
      (this.isFish && this.isDead())
    ) {
      if (this.currentImage < imageArray.length - 1) {
        this.currentImage++;
      } else {
        // Stay on the last image
        this.currentImage = imageArray.length - 1;
      }
    } else {
      this.currentImage++;
      if (this.currentImage == imageArray.length) {
        this.currentImage = 0;
      }
    }
  }

  /**
   * Applies gravity to the object, affecting its vertical position.
   */
  applyGravity() {
    let gravityInterall = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.graphiteValue;
      }
      if (this.y > this.groundY) {
        this.y = this.groundY;
      }
      if (this.y <= 0 - this.height / 2) {
        this.y = 0 - this.height / 2;
        this.speedY -= this.graphiteValue;
      }

      if (this.isDead()) {
        clearInterval(gravityInterall);
      }
    }, 1000 / this.graphiteSpeed);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean}
   */
  isAboveGround() {
    return this.y < this.groundY;
  }

  /**
   * Reduces the object's energy by the given damage value and triggers hurt sound.
   * @param {number} [damageValue=this.damage] - The amount of damage to apply.
   */
  hit(damageValue = this.damage) {
    this.energy -= damageValue;

    AudioHub.hurtSound(AudioHub.hurt);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt (recently hit).
   * @returns {boolean}
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (energy is zero).
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Activates a cooldown period during which certain actions are disabled.
   */
  cooldown() {
    this.cooldownActive = true;
    setTimeout(() => {
      this.cooldownActive = false;
    }, this.cooldownLength);
  }

  /**
   * Periodically checks if the character is within sight.
   */
  checkCharacterWithinSight() {
    setInterval(() => {
      const characterX = this.characterData.x + this.characterData.width;
      if (characterX >= this.x - this.visibility) {
        this.seeCharacter = true;
      } else {
        this.seeCharacter = false;
      }
    }, 1000 / 60);
  }

  /**
   * Moves the object towards the character's position.
   */
  moveToCharacter() {
    const character = this.characterData;
    if (this.x > character.x + character.width + 20) {
      this.x -= this.speedX;
      if (this.x <= character.x + character.width + 40) {
        this.contactWithCharacter = true;
      } else if (
        character.energy == 0 ||
        this.x > character.x + character.width + 40
      ) {
        this.contactWithCharacter = false;
      }
    }
    if (this.y > character.y - this.rHeight + 10) {
      this.y--;
    } else if (this.y < character.y + this.rHeight + 10) {
      this.y++;
    }
  }
}
