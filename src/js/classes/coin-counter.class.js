import { CounterBar } from "./counter-bar.class.js";

export class CoinCounter extends CounterBar {
  static COIN_IMAGES = ["src/img/4. Marcadores/1. Coins/2.png"];
  x = 10;
  y = 50;

  count = 0;

  constructor() {
    super(CoinCounter.COIN_IMAGES);
  }
}
