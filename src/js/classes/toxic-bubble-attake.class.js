import { ImageAssets } from "./image-Assets.class.js";
import { ThrowableObjects } from "./throwable-objects.class.js";

export class toxicBubbleAttake extends ThrowableObjects {
  height = 204 / 4;
  width = 202 / 4;
  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };
  damage = 20;

  constructor(world, x, y, viewDirection) {
    super(world, x, y, viewDirection, ImageAssets.TOXIC_BUBBLE_SHOT);
  }
}
