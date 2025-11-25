import { CollectableObjects } from "./collectable-objects.class.js";

export class Coin extends CollectableObjects {
  width = 99 / 3;
  height = 93 / 3;

  IMAGES_COIN = [
    "src/img/4. Marcadores/1. Coins/1.png",
    "src/img/4. Marcadores/1. Coins/2.png",
    "src/img/4. Marcadores/1. Coins/3.png",
    "src/img/4. Marcadores/1. Coins/4.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("src/img/4. Marcadores/1. Coins/1.png");
    this.loadImages(this.IMAGES_COIN);
    this.animate(this.IMAGES_COIN);
  }
}
