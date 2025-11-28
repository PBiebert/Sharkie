import { Fish } from "./fish.class.js";
import { ImageAssets } from "./image-Assets.class.js";

export class RedFish extends Fish {
  constructor(x, y) {
    super(
      ImageAssets.FISH_RED_SWIMMING,
      ImageAssets.FISH_RED_TRANSITION,
      ImageAssets.FISH_RED_BUBBLE_SWIMMING,
      ImageAssets.FISH_RED_DEAD,
      x,
      y
    );
  }
}
