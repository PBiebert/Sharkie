import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishGreen extends JellyFish {
  constructor(x, y) {
    super(
      ImageAssets.JELLY_FISH_GREEN_SWIMMING,
      ImageAssets.JELLY_FISH_GREEN_DEAD,
      x,
      y
    );
  }
}
