import { CounterBar } from "./counter-bar.class.js";
import { ImageAssets } from "./image-Assets.class.js";

export class CoinCounter extends CounterBar {
  static COIN_IMAGES = [ImageAssets.COIN[1]];
  x = 10;
  y = 50;

  count = 0;

  constructor() {
    super(ImageAssets.COIN[1]);
  }
}
