import { ImageAssets } from "./image-Assets.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {
  width = 1041 / 3;
  height = 1216 / 3;

  offset = {
    top: 200,
    right: 30,
    bottom: 80,
    left: 20,
  };

  y = 0;

  minSpeedLeft = 0.25;

  constructor(levelLength) {
    super();
    this.loadImage(ImageAssets.BOSS_SWIMMING[0]);
    this.loadImages(ImageAssets.BOSS_SWIMMING);
    this.x = levelLength - 450;
    this.animate();
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(ImageAssets.BOSS_SWIMMING);
    }, this.speedImgChange);
  }
}
