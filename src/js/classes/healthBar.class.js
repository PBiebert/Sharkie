import { StatusBar } from "./status-bar.class.js";

export class HealthBar extends StatusBar {
  LIFE_IMAGES = [
    "src/img/4. Marcadores/green/Life/100_life.png",
    "src/img/4. Marcadores/green/Life/80_life.png",
    "src/img/4. Marcadores/green/Life/60_life.png",
    "src/img/4. Marcadores/green/Life/40_life.png",
    "src/img/4. Marcadores/green/Life/20_life.png",
    "src/img/4. Marcadores/green/Life/0_life.png",
  ];
  width = 595 / 3;
  height = 158 / 3;
  x = 0;
  y = -10;

  constructor() {
    super();
    this.loadImage("src/img/4. Marcadores/green/Life/100_life.png");
    this.loadImages(this.LIFE_IMAGES);
  }
}
