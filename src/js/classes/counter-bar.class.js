import { DrawableObject } from "./drawable-object.class.js";

export class CounterBar extends DrawableObject {
  width = 99 / 3;
  height = 93 / 3;
  count = 0;

  constructor(IMAGE) {
    super();
    this.loadImage(IMAGE);
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.count, this.x + 50, this.y + 28);
  }
}
