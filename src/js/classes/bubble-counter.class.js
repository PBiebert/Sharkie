import { CounterBar } from "./counter-bar.class.js";
import { ImageAssets } from "./image-Assets.class.js";

export class BubbleCounter extends CounterBar {
  x = 10;
  y = 90;

  count = 10;

  constructor() {
    super(ImageAssets.BUBBLE_IMAGES);
  }
}
