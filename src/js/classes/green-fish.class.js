import { Fish } from "./fish.class.js";

export class GreenFish extends Fish {
  IMAGES_SWIMMING = [
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim1.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim2.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim3.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim4.png",
    "src/img/2.Enemy/1.Puffer fish/1.Swim/2.swim5.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.x = 720 + levelLength * Math.random(); // Startposition auf der x-Achse
    this.y = 430 * Math.random();
    console.log(this.x);
    this.speedLeft = this.minSpeedLeft + Math.random() * 0.75;
    this.animate();
  }
}
