import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishGreen extends JellyFish {
  static IMAGES_SWIMMING = [
    "src/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "src/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "src/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "src/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  constructor(levelLength) {
    super(levelLength, JellyFishGreen.IMAGES_SWIMMING);
  }
}
