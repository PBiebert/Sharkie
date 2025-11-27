import { CollectableObjects } from "./collectable-objects.class.js";
import { ImageAssets } from "./image-Assets.class.js";

export class Bubble extends CollectableObjects {
  width = 178 / 3;
  height = 243 / 3;
  offset = {
    top: 40,
    right: 10,
    bottom: 5,
    left: 10,
  };

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(ImageAssets.BUBBLE[0]);
    this.loadImages(ImageAssets.BUBBLE);
    this.animate(ImageAssets.BUBBLE);
  }
}
