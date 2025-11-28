import { Fish } from "./fish.class.js";
import { ImageAssets } from "./image-Assets.class.js";

export class GreenFish extends Fish {
  constructor(x, y) {
    super(
      ImageAssets.FISH_GREEN_SWIMMING,
      ImageAssets.FISH_GREEN_TRANSITION,
      ImageAssets.FISH_GREEN_BUBBLE_SWIMMING,
      ImageAssets.FISH_GREEN_DEAD,
      x,
      y
    );
  }
}
