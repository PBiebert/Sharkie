import { ImageAssets } from "./image-Assets.class.js";
import { StatusBar } from "./status-bar.class.js";

export class HealthBar extends StatusBar {
  width = 595 / 3;
  height = 158 / 3;

  constructor(x, y, name) {
    super(name);
    this.x = x;
    this.y = y;
    this.loadImage(ImageAssets.LIFE_BAR[0]);
    this.loadImages(ImageAssets.LIFE_BAR);
  }
}
