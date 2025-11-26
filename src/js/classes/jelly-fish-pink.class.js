import { JellyFish } from "./jelly-fish.class.js";

export class JellyFishPink extends JellyFish {
  static IMAGES_SWIMMING = [
    "src/img/2.Enemy/2.Jelly_fish/Súper dangerous/Pink 1.png",
    "src/img/2.Enemy/2.Jelly_fish/Súper dangerous/Pink 2.png",
    "src/img/2.Enemy/2.Jelly_fish/Súper dangerous/Pink 3.png",
    "src/img/2.Enemy/2.Jelly_fish/Súper dangerous/Pink 4.png",
  ];

  static IMAGES_DEAD = [
    "src/img/2.Enemy/2.Jelly_fish/Dead/Pink/P1.png",
    "src/img/2.Enemy/2.Jelly_fish/Dead/Pink/P2.png",
    "src/img/2.Enemy/2.Jelly_fish/Dead/Pink/P3.png",
    "src/img/2.Enemy/2.Jelly_fish/Dead/Pink/P4.png",
  ];

  constructor(levelLength) {
    super(
      levelLength,
      JellyFishPink.IMAGES_SWIMMING,
      JellyFishPink.IMAGES_DEAD
    );
  }
}
