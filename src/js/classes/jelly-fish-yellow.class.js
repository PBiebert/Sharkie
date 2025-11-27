import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishYellow extends JellyFish {
  constructor(x, y) {
    super(
      ImageAssets.JELLY_FISH_YELLOW_SWIMMING,
      ImageAssets.JELLY_FISH_YELLOW_DEAD,
      x,
      y
    );
  }
}
