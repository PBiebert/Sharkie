import { MovableObject } from "./movable-object.class.js";
// fertig
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
    this.IMAGES_SWIMMING = IMAGES_SWIMMING;
    this.IMAGES_TRANSITION = IMAGES_TRANSITION;
    this.IMAGE_BUBBLE_SWIMMING = IMAGE_BUBBLE_SWIMMING;
    this.IMAGE_DEAD = IMAGE_DEAD;
    this.x = x;
    this.y = y;
    this.speedX = this.minSpeedLeft + Math.random() * 0.75;
    this.loadAllImages();
    this.animate();
  }

  loadAllImages() {
    this.loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_TRANSITION);
    this.loadImages(this.IMAGE_BUBBLE_SWIMMING);
    this.loadImages(this.IMAGE_DEAD);
  }

  animate() {
    setInterval(() => {
      if (this.isCharacterInVisibilityRange()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.handleDeadState();
        return;
      }

      if (this.isCharacterInTransitionRange()) {
        if (!this.transitionPlayed) {
          this.handleTransitionAnimation();
        } else {
          this.handleBubbleSwimmingState();
        }
      } else {
        this.handleNormalSwimming();
      }
    }, this.speedImgChange);
  }

  isCharacterInVisibilityRange() {
    return (
      this.characterData.x + this.characterData.width >=
      this.x - this.visibility
    );
  }

  handleDeadState() {
    this.playAnimation(this.IMAGE_DEAD);
  }

  isCharacterInTransitionRange() {
    return (
      this.characterData.x + this.characterData.width >=
      this.x - (this.visibility - 300)
    );
  }

  handleTransitionAnimation() {
    this.playAnimation(this.IMAGES_TRANSITION);
    if (this.currentImage === this.IMAGES_TRANSITION.length - 1) {
      this.transitionPlayed = true;
      this.currentImage = 0;
    }
  }

  handleBubbleSwimmingState() {
    this.playAnimation(this.IMAGE_BUBBLE_SWIMMING);
  }

  handleNormalSwimming() {
    this.transitionPlayed = false;

    if (this.characterData.x > this.x) {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }
}
