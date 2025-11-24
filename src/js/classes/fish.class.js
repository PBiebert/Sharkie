class Fish extends MovableObject {
  width = 241 / 3; //Bildgröße durch 2
  height = 198 / 3; //Bildgröße durch 2
  IMAGES_SWIMMING;

  speedX = 0.2;
  minSpeedLeft = 0.25;
  offset = {
    top: 5,
    right: 5,
    bottom: 20,
    left: 5,
  };

  constructor(levelLength, IMAGES_SWIMMING) {
    super();
    this.loadImage(IMAGES_SWIMMING[0]);
    this.loadImages(IMAGES_SWIMMING);
    this.IMAGES_SWIMMING = IMAGES_SWIMMING;
    this.x = 720 + levelLength * Math.random(); // Startposition auf der x-Achse
    this.y = 430 * Math.random();
    this.speedX = this.minSpeedLeft + Math.random() * 0.75;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
    }, this.speedImgChange);
  }
}
