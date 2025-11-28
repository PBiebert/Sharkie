import { Fish } from "./fish.class.js";
import { ImageAssets } from "./image-Assets.class.js";

export class PinkFish extends Fish {
  constructor(x, y) {
    super(
      ImageAssets.FISH_PINK_SWIMMING,
      ImageAssets.FISH_PINK_TRANSITION,
      ImageAssets.FISH_PINK_BUBBLE_SWIMMING,
      ImageAssets.FISH_PINK_DEAD,
      x,
      y
    );
  }
}
