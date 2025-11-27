import { DrawableObject } from "./drawable-object.class.js";

export class StatusBar extends DrawableObject {
  width = 595 / 3;
  height = 158 / 3;
  x = 0;
  y = -10;

  percentage = 100;

  constructor() {
    super();
  }

  setPercentage(energy, IMAGES_ARRAY) {
    this.percentage = energy;
    let path = IMAGES_ARRAY[this.resoveImageIndex()];
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
