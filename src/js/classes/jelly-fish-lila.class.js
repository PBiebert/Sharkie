import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishLila extends JellyFish {
  static IMAGES_SWIMMING = [
    "src/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "src/img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "src/img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "src/img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  constructor(levelLength) {
    super(levelLength, JellyFishLila.IMAGES_SWIMMING);
  }
}
