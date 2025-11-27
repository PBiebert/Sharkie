import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishPink extends JellyFish {
  constructor(levelLength) {
    super(
      levelLength,
      ImageAssets.JELLY_FISH_PINK_SWIMMING,
      ImageAssets.JELLY_FISH_PINK_DEAD
    );
  }
}
