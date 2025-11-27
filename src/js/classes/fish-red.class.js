import { Fish } from "./fish.class.js";
import { ImageAssets } from "./image-Assets.class.js";

export class RedFish extends Fish {
  constructor(x, y) {
    super(ImageAssets.FISH_RED_SWIMMING, x, y);
  }
}
