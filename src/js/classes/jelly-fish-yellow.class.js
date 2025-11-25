import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishYellow extends JellyFish {
  static IMAGES_SWIMMING = [
    "src/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "src/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "src/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "src/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  constructor(levelLength) {
    super(levelLength, JellyFishYellow.IMAGES_SWIMMING);
  }
}
