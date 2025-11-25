import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishPink extends JellyFish {
  static IMAGES_SWIMMING = [
    "src/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "src/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "src/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "src/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  constructor(levelLength) {
    super(levelLength, JellyFishPink.IMAGES_SWIMMING);
  }
}
