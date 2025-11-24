class MovableObject {
  x = 100; // Startposition auf der x-Achse
  y = 250; // Startposition auf der y-Achse
  img; // Variable für das Bild des Objekts
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  rX;
  rY;
  rWidth;
  rHeight;
  width = 100;
  height = 150;
  imageCache = {};
  otherDirection = false;
  currentImage = 0;
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
    this.getRealFrame();
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.getRealFrame();
  }

  //Hitbox erstellen
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Fish ||
      this instanceof JellyFish ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "black";
      ctx.rect(this.rX, this.rY, this.rWidth, this.rHeight);
      ctx.stroke();
    }
  }

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  moveUp() {
    this.speedY = this.speedDefault;
    if (this.y <= 0 - this.rX + 15) {
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

  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rWidth = this.width - this.offset.left - this.offset.right;
    this.rHeight = this.height - this.offset.top - this.offset.bottom;
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
    this.energy -= 2;
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
}
