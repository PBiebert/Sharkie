export class AudioHub {
  static backgroundMusic = new Audio("src/audio/background.mp3");
  static bubbleSound = new Audio("src/audio/bubble.mp3");
  static click = new Audio("src/audio/click.mp3");
  static hurt = new Audio("src/audio/hurt.mp3");
  static collect = new Audio("src/audio/collect.mp3");
  static blubbCollect = new Audio("src/audio/blubb_collect.mp3");
  static dangerous = new Audio("src/audio/dangerous.mp3");

  static playSounds = false;

  static backgroundSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.2;
      sound.currentTime = 0;
      sound.play();
    }
  }

  static hoverSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.7;
      sound.currentTime = 0.06;
      sound.play();
    }
  }

  static hurtSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.5;
      sound.currentTime = 0.3;
      sound.play();
    }
  }

  static attackSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.5;
      sound.currentTime = 0;
      sound.play();
    }
  }

  static collectSound(sound) {
    if (AudioHub.playSounds) {
      sound.volume = 0.1;
      sound.currentTime = 0;
      sound.play();
    }
  }

  static stop(sound) {
    sound.pause();
  }
}
