import { Character } from "./character.class.js";
import { Coin } from "./coin.class.js";
import { createLevel1 } from "../levels/level1.js";
import { Bubble } from "./bubble.class.js";
import { HealthBar } from "./healthBar.class.js";
import { CoinCounter } from "./coin-counter.class.js";
import { BubbleCounter } from "./bubble-counter.class.js";
import { ImageAssets } from "./image-Assets.class.js";
import { Endboss } from "./endboss.class.js";
import { AudioHub } from "./audio-hub.class.js";

/**
 * Represents the game world.
 * Manages the main game loop, rendering, collisions, and game state.
 *
 * @class
 */
export class World {
  /**
   * The main character instance.
   * @type {Character}
   */
  character;

  /**
   * The current level instance.
   * @type {Level}
   */
  level;

  /**
   * The canvas element for rendering.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The 2D rendering context for the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * The keyboard input handler.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * The camera's x position (for scrolling).
   * @type {number}
   */
  camera_x = 0;

  /**
   * The health bar for the main character.
   * @type {HealthBar}
   */
  statusBarCharacter = new HealthBar(0, -10);

  /**
   * The health bar for the endboss.
   * @type {HealthBar}
   */
  statusBarEndboss = new HealthBar(400, -10, "Fredy");

  /**
   * The counter bars for coins and bubbles.
   * @type {{coins: CoinCounter, bubbles: BubbleCounter}}
   */
  counterBar = { "coins": new CoinCounter(), "bubbles": new BubbleCounter() };

  /**
   * Array of throwable objects (e.g. bubbles).
   * @type {Array}
   */
  throwableObject = [];

  /**
   * Indicates if the character is currently taking damage.
   * @type {boolean}
   */
  currentCharacterDamage = false;

  /**
   * Indicates if an enemy is currently taking damage.
   * @type {boolean}
   */
  currentEnemyDamage = false;

  /**
   * Indicates if the endboss health bar should be shown.
   * @type {boolean}
   */
  showEndbossHealthBar = false;

  /**
   * Creates a new game world.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.character = new Character();
    this.character.world = this;
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.characterPosition();
    this.checkEndbossSpawn();
  }

  /**
   * Starts the collision detection loops for character, objects, and bubbles.
   */
  checkCollisions() {
    setInterval(() => {
      this.handleCharacterEnemyCollisions();
      this.handleCharacterObjectCollisions();
      this.handleBubbleEnemyCollisions();
    }, 1000 / 60);
  }

  /**
   * Handles collisions between the character and enemies.
   */
  handleCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.shouldCharacterTakeDamage(enemy)) {
        this.applyCharacterDamage(enemy);
      } else {
        this.currentCharacterDamage = false;
      }
    });
  }

  /**
   * Determines if the character should take damage from an enemy.
   * @param {Object} enemy - The enemy to check collision with.
   * @returns {boolean}
   */
  shouldCharacterTakeDamage(enemy) {
    return this.character.isColliding(enemy) && !this.character.cooldownActive;
  }

  /**
   * Applies damage to the character from an enemy.
   * @param {Object} enemy - The enemy causing the damage.
   */
  applyCharacterDamage(enemy) {
    this.character.hit(enemy.damage);
    this.character.cooldown();
    this.updateCharacterHealthBar();
    this.character.resetSleep();
    this.currentCharacterDamage = true;
  }

  /**
   * Updates the character's health bar based on current energy.
   */
  updateCharacterHealthBar() {
    this.statusBarCharacter.setPercentage(
      this.character.energy,
      ImageAssets.LIFE_BAR
    );
  }

  /**
   * Handles collisions between the character and collectable objects.
   */
  handleCharacterObjectCollisions() {
    this.level.objects.forEach((object, index) => {
      if (this.character.isCollidingCollectableObjects(object)) {
        this.handleObjectCollection(object, index);
      }
    });
  }

  /**
   * Handles the collection of an object by the character.
   * @param {Object} object - The collected object.
   * @param {number} index - The index of the object in the array.
   */
  handleObjectCollection(object, index) {
    if (object instanceof Coin) {
      this.collectCoin(index);
    }
    if (object instanceof Bubble) {
      this.collectBubble(index);
    }
  }

  /**
   * Collects a coin and updates the counter.
   * @param {number} index - The index of the coin in the objects array.
   */
  collectCoin(index) {
    this.level.objects.splice(index, 1);
    this.counterBar.coins.count++;
    AudioHub.collectSound(AudioHub.collect);
  }

  /**
   * Collects a bubble and updates the counter.
   * @param {number} index - The index of the bubble in the objects array.
   */
  collectBubble(index) {
    this.level.objects.splice(index, 1);
    this.counterBar.bubbles.count++;
    AudioHub.collectSound(AudioHub.blubbCollect);
  }

  /**
   * Handles collisions between throwable bubbles and enemies.
   */
  handleBubbleEnemyCollisions() {
    this.throwableObject.forEach((bubble, bubbleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (this.shouldBubbleDamageEnemy(bubble, enemy)) {
          this.applyBubbleDamage(bubbleIndex, enemy, enemyIndex, bubble);
        }
      });
    });
  }

  /**
   * Determines if a bubble should damage an enemy.
   * @param {Object} bubble - The bubble object.
   * @param {Object} enemy - The enemy object.
   * @returns {boolean}
   */
  shouldBubbleDamageEnemy(bubble, enemy) {
    return bubble.isColliding(enemy) && !enemy.cooldownActive;
  }

  /**
   * Applies damage to an enemy from a bubble and removes the bubble.
   * @param {number} bubbleIndex - The index of the bubble in the array.
   * @param {Object} enemy - The enemy object.
   * @param {number} enemyIndex - The index of the enemy in the array.
   * @param {Object} bubble - The bubble object.
   */
  applyBubbleDamage(bubbleIndex, enemy, enemyIndex, bubble) {
    this.throwableObject.splice(bubbleIndex, 1);
    enemy.energy -= bubble.damage;
    enemy.cooldown();
    AudioHub.hurtSound(AudioHub.hurt);
    if (enemy.isDead()) {
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1);
      }, 500);
    }
  }

  /**
   * Updates the character position data for all enemies.
   */
  characterPosition() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        enemy.characterData = {
          x: this.character.x,
          y: this.character.y,
          width: this.character.rWidth,
          height: this.character.rHeight,
          energy: this.character.energy,
        };
      });
    }, 1000 / 60);
  }

  /**
   * Checks if the endboss should spawn and updates its health bar.
   */
  checkEndbossSpawn() {
    setInterval(() => {
      const boss = this.filterBoss();
      if (boss && boss.introPlayed) {
        this.showEndbossHealthBar = true;
        this.statusBarEndboss.setPercentage(boss.energy, ImageAssets.LIFE_BAR);
      }
    }, 1000 / 60);
  }
 
  /**
   * Main draw loop for rendering all objects and UI elements.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.lightBeams);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.objects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarCharacter);
    this.addToMap(this.counterBar.coins);
    this.addToMap(this.counterBar.bubbles);

    if (this.showEndbossHealthBar) {
      this.addToMap(this.statusBarEndboss);
    }

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**
   * Adds an array of objects to the map (canvas).
   * @param {Array} objects - The objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the map (canvas), handling direction and hitbox.
   * @param {Object} object - The object to add.
   */
  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
      object.getRealFrame();
    }

    object.getRealFrame();
    object.draw(this.ctx);
    object.drawFrame(this.ctx);

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  /**
   * Restores the canvas context after flipping an image.
   * @param {Object} object - The object whose image was flipped.
   */
  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  /**
   * Flips the image horizontally for objects facing the other direction.
   * @param {Object} object - The object to flip.
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  /**
   * Sets the world reference for the character and all enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Finds and returns the endboss instance from the enemies array.
   * @returns {Endboss|undefined}
   */
  filterBoss() {
    let endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    return endboss;
  }

  /**
   * Returns the game result ("gameOver", "win", or undefined).
   * @returns {string|undefined}
   */
  gameResult() {
    if (this.character.energy == 0) {
      return "gameOver";
    }

    const boss = this.filterBoss();
    if (boss && boss.energy == 0) {
      return "win";
    }
  }
}
