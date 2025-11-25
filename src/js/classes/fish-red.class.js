import { Fish } from "./fish.class.js";

export class RedFish extends Fish {
  static IMAGES_SWIMMING = [
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim1.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim2.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim3.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim4.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim5.png",
  ];

  constructor(levelLength) {
    super(levelLength, RedFish.IMAGES_SWIMMING);
  }
}
