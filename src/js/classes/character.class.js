import { ImageAssets } from "./image-Assets.class.js";
import { MovableObject } from "./movable-object.class.js";
import { ThrowableObjects } from "./throwable-objects.class.js";

export class Character extends MovableObject {
  height = 1000 / 4; //Bildgröße durch 4
  width = 815 / 4; //Bildgröße durch 4
  offset = {
    top: 130,
    right: 40,
    bottom: 60,
    left: 40,
  };

  hasHitbox = true;
  shotKeyPressed = false;
  viewDirektion = "right";

  constructor() {
    super();
    this.loadImage(ImageAssets.CHARAKTER_STANDING[0]);
    this.loadImages(ImageAssets.CHARAKTER_STANDING);
    this.loadImages(ImageAssets.CHARAKTER_HURT);
    this.loadImages(ImageAssets.CHARAKTER_DEAD);
    this.y = this.groundY;
    this.applyGravity();
    this.animate();
  }
  animate() {
    // setInterval(() => {
    //   console.clear();
    //   console.log("X = " + this.x);
    //   console.log("rX = " + this.rX);
    //   console.log("Y = " + this.y);
    //   console.log("rY = " + this.rY);
    // }, 2000);

    setInterval(() => {
      this.checkMovementKeys();
      this.sprint();
      this.updateCameraPosition();
    }, 1000 / 60); //60 fps

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(ImageAssets.CHARAKTER_DEAD);
        this.floatsToTheSurface();
      } else if (this.isHurt()) {
        this.playAnimation(ImageAssets.CHARAKTER_HURT);
      } else {
        this.playAnimation(ImageAssets.CHARAKTER_STANDING);
      }
    }, this.speedImgChange);
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
    if (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.levelLength - this.rWidth - 140
    ) {
      this.moveRight();
      this.otherDirection = false;
      this.viewDirektion = "right";
    }
    if (this.world.keyboard.LEFT && this.x > 0 - this.offset.left) {
      this.moveLeft();
      this.otherDirection = true;
      this.viewDirektion = "left";
    }
    if (this.world.keyboard.UP) {
      this.moveUp();
    }
    if (this.world.keyboard.DOWN && this.y < 480 - this.groundY) {
      this.moveDown();
    }

    if (this.world.keyboard.H && !this.shotKeyPressed) {
      if (this.world.counterBar.bubbles.count > 0) {
        this.shotKeyPressed = true; // Sofort blockieren
        this.shot();
        this.world.counterBar.bubbles.count -= 1;
        setTimeout(() => {
          this.shotKeyPressed = false;
        }, this.cooldownLength);
      }
    }
  }

  updateCameraPosition() {
    if (this.x <= 100) {
      this.world.camera_x = 0;
    } else if (this.x < this.world.level.levelLength - 720) {
      this.world.camera_x = -this.x + 100;
    } else {
      this.world.camera_x = -(this.world.level.levelLength - 720) + 100;
    }
  }

  shot() {
    this.world.throwableObject.push(
      new ThrowableObjects(this.world, this.x, this.y, this.viewDirektion)
    );
  }
}
