import { ImageAssets } from "./image-Assets.class.js";
import { StatusBar } from "./status-bar.class.js";

export class HealthBar extends StatusBar {
  width = 595 / 3;
  height = 158 / 3;
  x = 0;
  y = -10;

  constructor() {
    super();
    this.loadImage(ImageAssets.LIFE_BAR[0]);
    this.loadImages(ImageAssets.LIFE_BAR);
  }
}
