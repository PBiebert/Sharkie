import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishLila extends JellyFish {
  constructor(x, y) {
    super(
      ImageAssets.JELLY_FISH_LILA_SWIMMING,
      ImageAssets.JELLY_FISH_LILA_DEAD,
      x,
      y
    );
  }
}
