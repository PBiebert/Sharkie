import { CollectableObjects } from "./collectable-objects.class.js";

export class Bubble extends CollectableObjects {
  width = 178 / 3;
  height = 243 / 3;

  IMAGES_BUBBLE = [
    "src/img/4. Marcadores/Posión/Animada/1.png",
    "src/img/4. Marcadores/Posión/Animada/2.png",
    "src/img/4. Marcadores/Posión/Animada/3.png",
    "src/img/4. Marcadores/Posión/Animada/4.png",
    "src/img/4. Marcadores/Posión/Animada/5.png",
    "src/img/4. Marcadores/Posión/Animada/6.png",
    "src/img/4. Marcadores/Posión/Animada/7.png",
    "src/img/4. Marcadores/Posión/Animada/8.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("src/img/4. Marcadores/Posión/Animada/1.png");
    this.loadImages(this.IMAGES_BUBBLE);
    this.animate(this.IMAGES_BUBBLE);
  }
}
