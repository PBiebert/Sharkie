export class DrawableObject {
  img; // Variable für das Bild des Objekts
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 250;
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
  speedImgChange = 100;
  hasHitbox = false;

  constructor() {}

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
  }

  //Hitbox erstellen
  drawFrame(ctx) {
    if (this.hasHitbox) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.rX, this.rY, this.rWidth, this.rHeight);
      ctx.stroke();
    }
  }

  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rWidth = this.width - this.offset.left - this.offset.right;
    this.rHeight = this.height - this.offset.top - this.offset.bottom;
  }

  playAnimation(imageArray) {
    let i = this.currentImage % imageArray.length;
    let path = imageArray[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    if (this.currentImage == imageArray.length) {
      this.currentImage = 0;
    }
  }

  isColliding(object) {
    this.getRealFrame();
    return (
      this.rX + this.rWidth > object.rX &&
      this.rY + this.rHeight > object.rY &&
      this.rX < object.rX &&
      this.rY < object.rY + object.rHeight
    );
  }
}
