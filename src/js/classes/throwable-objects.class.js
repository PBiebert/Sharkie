import { ImageAssets } from "./image-Assets.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObjects extends MovableObject {
  height = 204 / 4;
  width = 202 / 4;
  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };
  hasHitbox = true;
  speedX = 5;
  speedY = 1;
  world;
  startX;
  startY;
  maxDistance = 250;
  damage = 50;

  viewDirection = "right";

  constructor(world, x, y, viewDirection) {
    super();
    this.loadImage(ImageAssets.BUBBLE_SHOT);
    this.world = world;
    this.viewDirection = viewDirection;
    this.throw(x, y);
  }

  throw(x, y) {
    if (this.viewDirection == "right") {
      this.x = x + 100;
    }
    if (this.viewDirection == "left") {
      this.x = x + 50;
    }
    this.y = y + 135;
    this.startX = this.x;

    setInterval(() => {
      if (this.viewDirection == "right") {
        this.x += this.speedX;
        if (this.x >= this.startX + this.maxDistance) {
          this.speedX -= 0.05;
          this.y -= this.speedY;
          if (this.speedX <= 0) this.speedX = 0;
        }
      }
      if (this.viewDirection == "left") {
        this.x -= this.speedX;
        if (this.x <= this.startX - this.maxDistance) {
          this.speedX -= 0.05;
          this.y -= this.speedY;
          if (this.speedX <= 0) this.speedX = 0;
        }
      }
    }, 1000 / 60);
  }
}
