import { DrawableObject } from "./drawable-object.class.js";

export class CollectableObjects extends DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 250;
  width = 100;
  height = 100;
  speedImgChange = 125;
  hasHitbox = true;

  constructor() {
    super();
  }

  animate(IMAGE_ARRAY) {
    setInterval(() => {
      this.playAnimation(IMAGE_ARRAY);
    }, this.speedImgChange);
  }
}
