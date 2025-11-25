import { Fish } from "./fish.class.js";

export class GreenFish extends Fish {
  static IMAGES_SWIMMING = [
    "src/img/2.Enemy/1.Puffer fish/1.Swim/1.swim1.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/1.swim2.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/1.swim3.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/1.swim4.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/1.swim5.png",
  ];

  constructor(levelLength) {
    super(levelLength, GreenFish.IMAGES_SWIMMING);
  }
}
