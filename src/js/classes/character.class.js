// Fertig

import { AudioHub } from "./audio-hub.class.js";
import { ImageAssets } from "./image-Assets.class.js";
import { MovableObject } from "./movable-object.class.js";
import { ThrowableObjects } from "./throwable-objects.class.js";

export class Character extends MovableObject {
  isCharacter = true;
  height = 1000 / 4;
  width = 815 / 4;
  shotKeyPressed = false;
  isReadyToSleep = false;
  viewDirektion = "right";
  energy = 100;
  offset = {
    top: 130,
    right: 40,
    bottom: 60,
    left: 40,
  };
  x = 7000;
  hasHitbox = false;

  constructor() {
    super();
    this.loadAllCharacterImages();
    this.y = this.groundY;
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.startMovementLoop();

    setInterval(() => {
      if (this.hasShot) {
        this.handleBubbleAttackState();
        return;
      }

      if (this.isDead()) {
        this.handleDeadState();
        return;
      }

      if (this.isHurt()) {
        this.handleHurtState();
        return;
      }

      if (this.isMovingHorizontally()) {
        this.handleSwimmingState();
        return;
      }

      if (this.isSleep) {
        this.handleSleepState();
        return;
      }

      if (this.isTimeToGetTired()) {
        this.handleTiredState();
        return;
      }

      if (this.isTransitioningToSleep()) {
        this.handleTransitionToSleepState();
        return;
      }
      this.handleStandingState();
    }, this.speedImgChange);
  }

  loadAllCharacterImages() {
    this.loadImage(ImageAssets.CHARAKTER_STANDING[0]);
    this.loadImages(ImageAssets.CHARAKTER_STANDING);
    this.loadImages(ImageAssets.CHARAKTER_LONG_STANDING);
    this.loadImages(ImageAssets.CHARAKTER_SLEEP);
    this.loadImages(ImageAssets.CHARAKTER_SWIMMING);
    this.loadImages(ImageAssets.CHARAKTER_HURT);
    this.loadImages(ImageAssets.CHARAKTER_DEAD);
    this.loadImages(ImageAssets.CHARAKTER_BUBBLE_ATTACK);
  }

  floatsToTheSurface() {
    if (this.y >= -50) {
      this.y -= 3;
    }
  }

  checkMovementKeys() {
    if (this.isDead()) {
      return;
    }
    if (this.canMoveRight()) {
      this.handleMoveRight();
    }
    if (this.canMoveLeft()) {
      this.handleMoveLeft();
    }
    if (this.canMoveUp()) {
      this.handleMoveUp();
    }
    if (this.canMoveDown()) {
      this.handleMoveDown();
    }

    if (this.canShootBubble()) {
      this.handleShootBubble();
    }
  }

  updateCameraPosition() {
    if (this.isAtLevelStart()) {
      this.world.camera_x = 0;
    } else if (this.isBeforeLevelEnd()) {
      this.world.camera_x = -this.x + 100;
    } else {
      this.world.camera_x = -(this.world.level.levelLength - 720) + 100;
    }
  }

  shot() {
    this.hasShot = true;
    this.currentImage = 0;
    this.resetSleep();
    AudioHub.attackSound(AudioHub.bubbleSound);

    setTimeout(() => {
      this.world.throwableObject.push(
        new ThrowableObjects(this.world, this.x, this.y, this.viewDirektion)
      );
    }, 500);
  }

  resetSleep() {
    this.isSleep = false;
    this.isStand = false;
    this.isReadyToSleep = false;
    this.lastStanding = Date.now();
  }

  handleBubbleAttackAnimation() {
    if (this.isLastBubbleAttackFrame()) {
      this.hasShot = false;
    }
  }

  isLastBubbleAttackFrame() {
    return this.currentImage == ImageAssets.CHARAKTER_BUBBLE_ATTACK.length - 1;
  }

  isMovingHorizontally() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  isTimeToGetTired() {
    return (
      !this.isReadyToSleep && Date.now() >= this.lastStanding + this.timeToSleep
    );
  }

  isTransitioningToSleep() {
    return this.isReadyToSleep && !this.isSleep;
  }

  isLastLongStandingFrame() {
    return this.currentImage === ImageAssets.CHARAKTER_LONG_STANDING.length - 1;
  }

  canMoveRight() {
    return (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.levelLength - this.rWidth - 140
    );
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0 - this.offset.left;
  }

  canMoveUp() {
    return this.world.keyboard.UP;
  }

  canMoveDown() {
    return this.world.keyboard.DOWN && this.y < this.groundY;
  }

  canShootBubble() {
    return this.world.keyboard.H && !this.shotKeyPressed;
  }

  hasBubbleAmmo() {
    return this.world.counterBar.bubbles.count > 0;
  }

  isAtLevelStart() {
    return this.x <= 100;
  }

  isBeforeLevelEnd() {
    return this.x < this.world.level.levelLength - 720;
  }

  startMovementLoop() {
    setInterval(() => {
      this.checkMovementKeys();
      this.sprint();
      this.updateCameraPosition();
    }, 1000 / 60);
  }

  handleBubbleAttackState() {
    this.playAnimation(ImageAssets.CHARAKTER_BUBBLE_ATTACK);
    this.handleBubbleAttackAnimation();
  }

  handleDeadState() {
    this.playAnimation(ImageAssets.CHARAKTER_DEAD);
    this.floatsToTheSurface();
  }

  handleHurtState() {
    this.playAnimation(ImageAssets.CHARAKTER_HURT);
  }

  handleSwimmingState() {
    this.playAnimation(ImageAssets.CHARAKTER_SWIMMING);
    this.resetSleep();
  }

  handleSleepState() {
    this.playAnimation(ImageAssets.CHARAKTER_SLEEP);
  }

  handleTiredState() {
    this.isReadyToSleep = true;
    this.currentImage = 0;
  }

  handleTransitionToSleepState() {
    this.playAnimation(ImageAssets.CHARAKTER_LONG_STANDING);

    if (this.isLastLongStandingFrame()) {
      this.finishLongStandingState();
      return;
    }
  }

  finishLongStandingState() {
    this.isSleep = true;
    this.isReadyToSleep = false;
    this.currentImage = 0;
  }

  handleStandingState() {
    this.playAnimation(ImageAssets.CHARAKTER_STANDING);
  }

  handleMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    this.viewDirektion = "right";
  }

  handleMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.viewDirektion = "left";
  }

  handleMoveUp() {
    this.moveUp();
    this.resetSleep();
  }

  handleMoveDown() {
    this.moveDown();
  }

  handleShootBubble() {
    if (this.hasBubbleAmmo()) {
      this.shotKeyPressed = true;
      this.shot();
      this.world.counterBar.bubbles.count -= 1;
      setTimeout(() => {
        this.shotKeyPressed = false;
      }, this.cooldownLength);
    }
  }
}
