import { MovableObject } from "./movable-object.class.js";

export class LightBeam extends MovableObject {
  y = 0;
  height = 480;
  width = 720;

  constructor() {
    super().loadImage("src/img/3. Background/Layers/1. Light/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
