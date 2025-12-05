/**
 * Represents the keyboard input state for the game.
 * Each property indicates whether a specific key is currently pressed.
 *
 * @class
 */
export class Keyboard {
  /**
   * Indicates if the left arrow key is pressed.
   * @type {boolean}
   */
  LEFT = false;

  /**
   * Indicates if the right arrow key is pressed.
   * @type {boolean}
   */
  RIGHT = false;

  /**
   * Indicates if the up arrow key is pressed.
   * @type {boolean}
   */
  UP = false;

  /**
   * Indicates if the down arrow key is pressed.
   * @type {boolean}
   */
  DOWN = false;

  /**
   * Indicates if the space bar is pressed.
   * @type {boolean}
   */
  SPACE = false;

  /**
   * Indicates if the 'H' key is pressed (for shooting bubbles).
   * @type {boolean}
   */
  H = false;
}
