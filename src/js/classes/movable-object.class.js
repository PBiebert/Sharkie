import { DrawableObject } from "./drawable-object.class.js";
import { Character } from "./character.class.js";
import { AudioHub } from "./audio-hub.class.js";

export class MovableObject extends DrawableObject {
  otherDirection = false;
  speedImgChange = 100;
  world;
  moveUpDownToggle = true;
  speedDefault = 2;
  speedBoost = 4;
  speedX = 2;
  speedY = 0;
  groundY = 285;
  minSpeedLeft = 0.25;
  graphiteValue = 0.15;
  graphiteSpeed = 30;
  energy = 100;
  lastHit = 0;
  cooldownActive = false;
  cooldownLength = 1000;
  lastStanding = Date.now();
  timeToSleep = 10000;
  isSleep = false;
  hasShot = false;
  characterData = { "x": 0, "y": 0 };
  seeCharacter = false;
  contactWithCharacter = false;
  visibility = 500;
  isEndboss = false;

  constructor() {
    super();
  }

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  moveUp() {
    this.speedY = this.speedDefault * 2;
  }

  moveDown() {
    this.speedY = 0;
    this.y += this.speedDefault;
  }

  sprint() {
    if (this.world.keyboard.SPACE) {
      this.speedX = this.speedBoost;
    } else {
      this.speedX = this.speedDefault;
    }
  }

  playAnimation(imageArray) {
    let i = this.currentImage % imageArray.length;
    let path = imageArray[i];
    this.img = this.imageCache[path];

    // Prüfe, ob Death-Animation abgespielt werden soll
    if (
      (this.isCharacter && this.isDead()) ||
      (this.isEndboss && this.isDead()) ||
      (this.isFish && this.isDead())
    ) {
      if (this.currentImage < imageArray.length - 1) {
        this.currentImage++;
      } else {
        // Bleibe auf letztem Bild stehen
        this.currentImage = imageArray.length - 1;
      }
    } else {
      this.currentImage++;
      if (this.currentImage == imageArray.length) {
        this.currentImage = 0;
      }
    }
  }

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

  isAboveGround() {
    return this.y < this.groundY;
  }

  hit() {
    this.energy -= 10;

    AudioHub.hurtSound(AudioHub.hurt);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  cooldown() {
    this.cooldownActive = true;
    setTimeout(() => {
      this.cooldownActive = false;
    }, this.cooldownLength);
  }

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
