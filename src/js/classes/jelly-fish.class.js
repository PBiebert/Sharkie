class JellyFish extends MovableObject {
  width = 211 / 2;
  height = 300 / 2;
  IMAGES_SWIMMING;
  speedY = 1;
  offset = {
    top: 20,
    right: 0,
    bottom: 20,
    left: 0,
  };

  constructor(levelLength, IMAGES_SWIMMING) {
    super();
    this.loadImage(IMAGES_SWIMMING[0]);

    this.loadImages(IMAGES_SWIMMING);
    this.IMAGES_SWIMMING = IMAGES_SWIMMING;
    this.x = 720 + Math.random() * (levelLength - 2 * 720); // Bereich: 720 bis levelLength-720
    this.y = 430 * Math.random();
    this.speedY = this.minSpeedLeft + Math.random() * 0.75;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveUpAndDown();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
    }, this.speedImgChange);
  }

  moveUpAndDown() {
    if (this.moveUpDownToggle) {
      this.y -= this.speedY;
      if (this.y <= -10) {
        this.moveUpDownToggle = false;
      }
    } else {
      this.y += this.speedY;
      if (this.y >= 480 - this.height + 10) {
        this.moveUpDownToggle = true;
      }
    }
  }
}
