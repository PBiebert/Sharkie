/**
 * Central class for managing and controlling all audio effects in the game.
 * Provides methods for playing and stopping sounds.
 */
export class AudioHub {
  /**
   * Background music of the game.
   * @type {HTMLAudioElement}
   * @static
   */
  static backgroundMusic = new Audio("src/audio/background.mp3");

  /**
   * Sound effect for bubbles.
   * @type {HTMLAudioElement}
   * @static
   */
  static bubbleSound = new Audio("src/audio/bubble.mp3");

  /**
   * Sound effect for clicks.
   * @type {HTMLAudioElement}
   * @static
   */
  static click = new Audio("src/audio/click.mp3");

  /**
   * Sound effect for taking damage.
   * @type {HTMLAudioElement}
   * @static
   */
  static hurt = new Audio("src/audio/hurt.mp3");

  /**
   * Sound effect for collecting items.
   * @type {HTMLAudioElement}
   * @static
   */
  static collect = new Audio("src/audio/collect.mp3");

  /**
   * Sound effect for collecting bubble objects.
   * @type {HTMLAudioElement}
   * @static
   */
  static blubbCollect = new Audio("src/audio/blubb_collect.mp3");

  /**
   * Sound effect for dangerous situations.
   * @type {HTMLAudioElement}
   * @static
   */
  static dangerous = new Audio("src/audio/dangerous.mp3");

  /**
   * Indicates whether sounds should be played.
   * @type {boolean}
   * @static
   */
  static playSounds = false;

  /**
   * Plays a background sound if enabled.
   * @static
   * @param {HTMLAudioElement} sound - The audio element to be played.
   * @returns {void}
   */
  static backgroundSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.25;
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Plays a hover sound if enabled.
   * @static
   * @param {HTMLAudioElement} sound - The audio element to be played.
   * @returns {void}
   */
  static hoverSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.5;
      sound.currentTime = 0.06;
      sound.play();
    }
  }

  /**
   * Plays a hurt sound if enabled.
   * @static
   * @param {HTMLAudioElement} sound - The audio element to be played.
   * @returns {void}
   */
  static hurtSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.4;
      sound.currentTime = 0.3;
      sound.play();
    }
  }

  /**
   * Plays an attack sound if enabled.
   * @static
   * @param {HTMLAudioElement} sound - The audio element to be played.
   * @returns {void}
   */
  static attackSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.4;
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Plays a collect sound if enabled.
   * @static
   * @param {HTMLAudioElement} sound - The audio element to be played.
   * @returns {void}
   */
  static collectSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.2;
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Stops the given audio element.
   * @static
   * @param {HTMLAudioElement} sound - The audio element to be stopped.
   * @returns {void}
   */
  static stop(sound) {
    sound.pause();
  }
}
