// Fertig

import { CollectableObjects } from "./collectable-objects.class.js";
import { ImageAssets } from "./image-Assets.class.js";

export class Coin extends CollectableObjects {
  width = 99 / 3;
  height = 93 / 3;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(ImageAssets.COIN[0]);
    this.loadImages(ImageAssets.COIN);
    this.animate(ImageAssets.COIN);
  }
}
