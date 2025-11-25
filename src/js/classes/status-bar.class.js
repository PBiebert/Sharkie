import { DrawableObject } from "./drawable-object.class.js";

export class StatusBar extends DrawableObject {
  LIFE_IMAGES = [
    "src/img/4. Marcadores/green/Life/100_life.png",
    "src/img/4. Marcadores/green/Life/80_life.png",
    "src/img/4. Marcadores/green/Life/60_life.png",
    "src/img/4. Marcadores/green/Life/40_life.png",
    "src/img/4. Marcadores/green/Life/20_life.png",
    "src/img/4. Marcadores/green/Life/0_life.png",
  ];
  width = 595 / 3;
  height = 158 / 3;
  x = 0;
  y = -10;

  percentage = 100;

  constructor() {
    super();
    this.loadImage("src/img/4. Marcadores/green/Life/100_life.png");
    this.loadImages(this.LIFE_IMAGES);
    this.setPercentage(100);
  }

  setPercentage(energy) {
    this.percentage = energy;
    let path = this.LIFE_IMAGES[this.resoveImageIndex()];
    this.img = this.imageCache[path];
  }

  resoveImageIndex() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage >= 80) {
      return 1;
    } else if (this.percentage >= 60) {
      return 2;
    } else if (this.percentage >= 40) {
      return 3;
    } else if (this.percentage >= 20) {
      return 4;
    } else if (this.percentage >= 0) {
      return 5;
    }
  }
}
