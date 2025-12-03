import { ImageAssets } from "./image-Assets.class.js";
import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishPink extends JellyFish {
  energy = 60;
  damage = 30;

  constructor(x, y) {
    super(
      ImageAssets.JELLY_FISH_PINK_SWIMMING,
      ImageAssets.JELLY_FISH_PINK_DEAD,
      x,
      y
    );
  }
}
