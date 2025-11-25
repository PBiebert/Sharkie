import { CounterBar } from "./counter-bar.class.js";

export class BubbleCounter extends CounterBar {
  static BUBBLE_IMAGES = ["src/img/4. Marcadores/Posión/normal.png"];

  x = 10;
  y = 90;

  count = 0;

  constructor() {
    super(BubbleCounter.BUBBLE_IMAGES);
  }
}
