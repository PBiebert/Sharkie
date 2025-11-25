class MovableObject extends DrawableObject {
  otherDirection = false;
  speedImgChange = 100;
  world;
  moveUpDownToggle = true;
  speedDefault = 2;
  speedBoost = 4;
  speedX = 2;
  speedY = 0;
  minSpeedLeft = 0.25;
  graphiteValue = 0.15;
  graphiteSpeed = 60;
  energy = 100;
  lastHit = 0;

  constructor() {
    super();
    // this.getRealFrame();
  }

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  moveUp() {
    this.speedY = this.speedDefault;
    if (this.y <= 0 - this.height / 2) {
      this.speedY = 0;
    }
  }

  moveDown() {
    this.y += this.speedX;
    this.speedY = 0;
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
    this.currentImage++;
    if (this.currentImage == imageArray.length) {
      this.currentImage = 0;
    }
    if (this.isDead()) {
      let path = imageArray[imageArray.length - 1];
      this.img = this.imageCache[path];
    }
  }

  applyGravity() {
    let gravityInterall = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.graphiteValue;
      }
      if (this.isDead()) {
        clearInterval(gravityInterall);
      }
    }, 1000 / this.graphiteSpeed);
    console.log(this.speedY);
  }

  isAboveGround() {
    return this.y < 480 - this.height + this.offset.bottom - 5;
  }

  isColliding(object) {
    return (
      this.rX + this.rWidth > object.rX &&
      this.rY + this.rHeight > object.rY &&
      this.rX < object.rX &&
      this.rY < object.rY + object.rHeight
    );
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    console.log(this.energy);
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }
}
