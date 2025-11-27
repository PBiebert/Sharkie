import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishLila extends JellyFish {
  constructor(levelLength) {
    super(
      levelLength,
      ImageAssets.JELLY_FISH_LILA_SWIMMING,
      ImageAssets.JELLY_FISH_LILA_DEAD
    );
  }
}
