import { ImageAssets } from "./image-Assets.class.js";
import { ThrowableObjects } from "./throwable-objects.class.js";

export class nomalBubbleAttake extends ThrowableObjects {
  height = 41;
  width = 40.5;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  damage = 10;

  constructor(world, x, y, viewDirection) {
    super(world, x, y, viewDirection, ImageAssets.BUBBLE_SHOT);
  }
}
