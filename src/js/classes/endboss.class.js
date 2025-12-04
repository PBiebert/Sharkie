import { AudioHub } from "./audio-hub.class.js";
import { ImageAssets } from "./image-Assets.class.js";
import { MovableObject } from "./movable-object.class.js";
// fertig
export class Endboss extends MovableObject {
  isEndboss = true;
  width = 1041 / 3;
  height = 1216 / 3;
  speedX = 1;
  damage = 40;
  energy = 100;

  offset = {
    top: 200,
    right: 30,
    bottom: 80,
    left: 20,
  };

  y = -350;

  hasHitbox = false;
  // introActive = false;
  introPlayed = false;
  visibility = 290;

  constructor(levelLength) {
    super();
    this.loadAllImages();
    this.x = levelLength - 450;
    this.checkCharacterWithinSight(this.visibility);
    this.animate();
  }

  loadAllImages() {
    this.loadImage(ImageAssets.BOSS_SWIMMING[0]);
    this.loadImages(ImageAssets.BOSS_INTRO);
    this.loadImages(ImageAssets.BOSS_SWIMMING);
    this.loadImages(ImageAssets.BOSS_ATTACK);
    this.loadImages(ImageAssets.BOSS_HURT);
    this.loadImages(ImageAssets.BOSS_DEAD);
  }

  animate() {
    this.startIntroLoop();
    this.startAnimationLoop();
    this.startFollowLoop();
  }

  shouldPlayIntro() {
    return this.seeCharacter && !this.introPlayed;
  }

  startIntroSequence(introInterval) {
    this.y = 0;
    this.introPlayed = true;
    this.introActive = true;
    this.currentImage = 0;
    this.img = this.imageCache[ImageAssets.BOSS_INTRO[0]];

    clearInterval(introInterval);
  }

  handleDeadState() {
    this.playAnimation(ImageAssets.BOSS_DEAD);
  }

  handleHurtState() {
    this.playAnimation(ImageAssets.BOSS_HURT);
  }

  handleIntroAnimation() {
    this.playAnimation(ImageAssets.BOSS_INTRO);
    if (this.currentImage === 0) {
      AudioHub.backgroundSound(AudioHub.dangerous);
      this.introActive = false;
    }
  }

  handleAttakeState() {
    this.playAnimation(ImageAssets.BOSS_ATTACK);
  }

  handleSwimmingState() {
    this.playAnimation(ImageAssets.BOSS_SWIMMING);
  }

  shouldFollowCharacter() {
    return this.seeCharacter && !this.introActive;
  }

  followCharacter() {
    this.visibility = 600;
    this.moveToCharacter();
  }

  startIntroLoop() {
    const introInterval = setInterval(() => {
      if (this.shouldPlayIntro()) {
        this.startIntroSequence(introInterval);
      }
    }, 1000 / 60);
  }

  startAnimationLoop() {
    setInterval(() => {
      if (this.isDead()) {
        this.handleDeadState();
        return;
      }

      if (this.introActive) {
        this.handleIntroAnimation();
        return;
      }

      if (this.isHurt()) {
        this.handleHurtState();
        return;
      }

      if (this.contactWithCharacter) {
        this.handleAttakeState();
        return;
      }
      this.handleSwimmingState();
    }, this.speedImgChange);
  }

  startFollowLoop() {
    setInterval(() => {
      if (this.shouldFollowCharacter()) {
        this.followCharacter();
      }
    }, 1000 / 60);
  }
}
