class Endboss extends MovableObject {
  width = 1041 / 3;
  height = 1216 / 3;
  IMAGES_SWIMMING = [
    "src/img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "src/img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

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
    this.loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.x = levelLength - 450;
    this.animate();
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
    }, this.speedImgChange);
  }
}
