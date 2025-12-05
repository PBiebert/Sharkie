/**
 * Represents a game level.
 * Contains all enemies, objects, and background elements for the level.
 *
 * @class
 */
export class Level {
  /**
   * Array of enemy objects in the level.
   * @type {Array}
   */
  enemies;

  /**
   * Array of light beam objects in the level.
   * @type {Array}
   */
  lightBeams;

  /**
   * Array of background objects in the level.
   * @type {Array}
   */
  backgroundObjects;

  /**
   * The total length of the level.
   * @type {number}
   */
  levelLength;

  /**
   * Array of other objects in the level.
   * @type {Array}
   */
  objects;

  /**
   * Creates a new level instance.
   *
   * @param {Array} enemies - The enemies in the level.
   * @param {Array} lightBeams - The light beams in the level.
   * @param {Array} backgroundObjects - The background objects in the level.
   * @param {number} levelLength - The length of the level.
   * @param {Array} objects - Other objects in the level.
   */
  constructor(enemies, lightBeams, backgroundObjects, levelLength, objects) {
    this.enemies = enemies;
    this.lightBeams = lightBeams;
    this.backgroundObjects = backgroundObjects;
    this.levelLength = levelLength;
    this.objects = objects;
  }
}
