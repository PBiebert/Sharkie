import { MovableObject } from "./movable-object.class.js";

export class Fish extends MovableObject {
  isFish = true;
  width = 241 / 3; //Bildgröße durch 2
  height = 198 / 3; //Bildgröße durch 2
  IMAGES_SWIMMING;
  IMAGES_TRANSITION;
  IMAGE_BUBBLE_SWIMMING;
  IMAGE_DEAD;

  speedX = 0.2;
  minSpeedLeft = 0.25;
  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };
  hasHitbox = true;
  visibility = 600;
  transitionPlayed = false;
  energy = 40;

  constructor(
    IMAGES_SWIMMING,
    IMAGES_TRANSITION,
    IMAGE_BUBBLE_SWIMMING,
    IMAGE_DEAD,
    x,
    y
  ) {
    super();
    this.loadImage(IMAGES_SWIMMING[0]);
    this.loadImages(IMAGES_SWIMMING);
    this.loadImages(IMAGES_TRANSITION);
    this.loadImages(IMAGE_BUBBLE_SWIMMING);
    this.loadImages(IMAGE_DEAD);

    this.IMAGES_SWIMMING = IMAGES_SWIMMING;
    this.IMAGES_TRANSITION = IMAGES_TRANSITION;
    this.IMAGE_BUBBLE_SWIMMING = IMAGE_BUBBLE_SWIMMING;
    this.IMAGE_DEAD = IMAGE_DEAD;
    this.x = x;
    this.y = y;
    this.speedX = this.minSpeedLeft + Math.random() * 0.75;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (
        this.characterData.x + this.characterData.width >=
        this.x - this.visibility
      ) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGE_DEAD);
        return;
      }

      if (
        this.characterData.x + this.characterData.width >=
        this.x - (this.visibility - 300)
      ) {
        if (!this.transitionPlayed) {
          this.playAnimation(this.IMAGES_TRANSITION);
          if (this.currentImage === this.IMAGES_TRANSITION.length - 1) {
            this.transitionPlayed = true;
            this.currentImage = 0;
          }
        } else {
          this.playAnimation(this.IMAGE_BUBBLE_SWIMMING);
        }
      } else {
        this.transitionPlayed = false;

        if (this.characterData.x > this.x) {
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }
    }, this.speedImgChange);
  }
}
