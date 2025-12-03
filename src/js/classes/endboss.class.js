import { AudioHub } from "./audio-hub.class.js";
import { ImageAssets } from "./image-Assets.class.js";
import { MovableObject } from "./movable-object.class.js";

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

    this.loadImage(ImageAssets.BOSS_SWIMMING[0]);
    this.loadImages(ImageAssets.BOSS_INTRO);
    this.loadImages(ImageAssets.BOSS_SWIMMING);
    this.loadImages(ImageAssets.BOSS_ATTACK);
    this.loadImages(ImageAssets.BOSS_HURT);
    this.loadImages(ImageAssets.BOSS_DEAD);
    this.x = levelLength - 450;
    this.checkCharacterWithinSight(this.visibility);
    this.animate();
  }

  animate() {
    const introInterval = setInterval(() => {
      if (this.seeCharacter && !this.introPlayed) {
        // Nur wenn Charakter gesehen und Intro noch nicht gespielt
        this.y = 0; // Endboss wird sichtbar (Y-Position)
        this.introPlayed = true; // Intro wurde jetzt gespielt
        this.introActive = true; // Intro läuft jetzt
        this.currentImage = 0; // Animation startet bei Frame 0
        this.img = this.imageCache[ImageAssets.BOSS_INTRO[0]]; // Erstes Intro-Bild anzeigen

        clearInterval(introInterval); // Dieses Intervall wird nicht mehr benötigt
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(ImageAssets.BOSS_DEAD);
        return;
      }

      if (this.isHurt()) {
        this.playAnimation(ImageAssets.BOSS_HURT);
        return;
      }
      if (this.introActive) {
        this.playAnimation(ImageAssets.BOSS_INTRO);
        if (this.currentImage === 0) {
          AudioHub.backgroundSound(AudioHub.dangerous);
          this.introActive = false;
        }
        return;
      }
      if (this.contactWithCharacter) {
        this.playAnimation(ImageAssets.BOSS_ATTACK);
        return;
      }
      this.playAnimation(ImageAssets.BOSS_SWIMMING);
    }, this.speedImgChange);

    setInterval(() => {
      if (this.seeCharacter && !this.introActive) {
        this.visibility = 700; // Sichtweite erhöhen, damit Endboss länger verfolgt
        console.log(this.visibility);
        // Nur wenn Charakter gesehen und kein Intro läuft
        this.moveToCharacter(); // Bewegung Richtung Charakter
      }
    }, 1000 / 60);
  }
}
