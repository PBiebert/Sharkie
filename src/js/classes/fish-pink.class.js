import { Fish } from "./fish.class.js";

export class PinkFish extends Fish {
  static IMAGES_SWIMMING = [
    "src/img/2.Enemy/1.Puffer fish/1.Swim/3.swim1.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/3.swim2.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/3.swim3.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/3.swim4.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/3.swim5.png",
  ];

  constructor(levelLength) {
    super(levelLength, PinkFish.IMAGES_SWIMMING);
  }
}
