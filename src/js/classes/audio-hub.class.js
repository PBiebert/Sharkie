/**
 * Central class for managing and controlling all audio effects in the game.
 * Provides methods for playing and stopping sounds.
 */
export class AudioHub {
  /**
   * Background music of the game.
   * @type {HTMLAudioElement}
   */
  static backgroundMusic = new Audio("src/audio/background.mp3");

  /**
   * Sound effect for bubbles.
   * @type {HTMLAudioElement}
   */
  static bubbleSound = new Audio("src/audio/bubble.mp3");

  /**
   * Sound effect for clicks.
   * @type {HTMLAudioElement}
   */
  static click = new Audio("src/audio/click.mp3");

  /**
   * Sound effect for taking damage.
   * @type {HTMLAudioElement}
   */
  static hurt = new Audio("src/audio/hurt.mp3");

  /**
   * Sound effect for collecting items.
   * @type {HTMLAudioElement}
   */
  static collect = new Audio("src/audio/collect.mp3");

  /**
   * Sound effect for collecting bubble objects.
   * @type {HTMLAudioElement}
   */
  static blubbCollect = new Audio("src/audio/blubb_collect.mp3");

  /**
   * Sound effect for dangerous situations.
   * @type {HTMLAudioElement}
   */
  static dangerous = new Audio("src/audio/dangerous.mp3");

  /**
   * Indicates whether sounds should be played.
   * @type {boolean}
   */
  static playSounds = false;

  /**
   * Plays a background sound if enabled.
   * @param {HTMLAudioElement} sound - The audio element to be played.
   */
  static backgroundSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.5;
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Plays a hover sound if enabled.
   * @param {HTMLAudioElement} sound - The audio element to be played.
   */
  static hoverSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 1;
      sound.currentTime = 0.06;
      sound.play();
    }
  }

  /**
   * Plays a hurt sound if enabled.
   * @param {HTMLAudioElement} sound - The audio element to be played.
   */
  static hurtSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.8;
      sound.currentTime = 0.3;
      sound.play();
    }
  }

  /**
   * Plays an attack sound if enabled.
   * @param {HTMLAudioElement} sound - The audio element to be played.
   */
  static attackSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.8;
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Plays a collect sound if enabled.
   * @param {HTMLAudioElement} sound - The audio element to be played.
   */
  static collectSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.4;
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Stops the given audio element.
   * @param {HTMLAudioElement} sound - The audio element to be stopped.
   */
  static stop(sound) {
    sound.pause();
  }
}
