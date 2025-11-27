import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishGreen extends JellyFish {
  constructor(levelLength) {
    super(
      levelLength,
      ImageAssets.JELLY_FISH_GREEN_SWIMMING,
      ImageAssets.JELLY_FISH_GREEN_DEAD
    );
  }
}
