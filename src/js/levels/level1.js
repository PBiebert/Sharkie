import { Level } from "../classes/level.class.js";
import { Coin } from "../classes/coin.class.js";
import { BackgroundObject } from "../classes/background-object.class.js";
import { GreenFish } from "../classes/fish-green.class.js";
import { PinkFish } from "../classes/fish-pink.class.js";
import { RedFish } from "../classes/fish-red.class.js";
import { JellyFishGreen } from "../classes/jelly-fish-green.class.js";
import { JellyFishLila } from "../classes/jelly-fish-lila.class.js";
import { JellyFishPink } from "../classes/jelly-fish-pink.class.js";
import { JellyFishYellow } from "../classes/jelly-fish-yellow.class.js";
import { Endboss } from "../classes/endboss.class.js";
import { Bubble } from "../classes/bubble.class.js";
import { LightBeam } from "../classes/light.class.js";

export let level = new Level([], [], [], 0, []);

let levelLength;
let LevelObjects = {
  coins: [
    new Coin(900, 400),
    new Coin(1000, 400),
    new Coin(1100, 400),
    new Coin(1200, 400),
    new Coin(1300, 400),

    new Coin(1500, 350),
    new Coin(1550, 330),
    new Coin(1600, 320),
    new Coin(1650, 330),
    new Coin(1700, 350),

    new Coin(2000, 250),
    new Coin(2100, 250),
    new Coin(2200, 250),
    new Coin(2300, 250),
    new Coin(2400, 250),

    new Coin(2700, 320),
    new Coin(2750, 340),
    new Coin(2800, 360),
    new Coin(2850, 340),
    new Coin(2900, 320),

    new Coin(3200, 400),
    new Coin(3300, 400),
    new Coin(3400, 400),
    new Coin(3500, 400),
    new Coin(3600, 400),

    new Coin(3900, 350),
    new Coin(3950, 330),
    new Coin(4000, 320),
    new Coin(4050, 330),
    new Coin(4100, 350),

    new Coin(4500, 250),
    new Coin(4600, 250),
    new Coin(4700, 250),
    new Coin(4800, 250),
    new Coin(4900, 250),

    new Coin(5200, 320),
    new Coin(5250, 340),
    new Coin(5300, 360),
    new Coin(5350, 340),
    new Coin(5400, 320),

    new Coin(6000, 400),
    new Coin(6100, 400),
    new Coin(6200, 400),
    new Coin(6300, 400),
    new Coin(6400, 400),

    new Coin(7000, 350),
    new Coin(7100, 330),
    new Coin(7200, 320),
    new Coin(7300, 330),
    new Coin(7400, 350),

    new Coin(7600, 10),
    new Coin(7600, 80),
    new Coin(7600, 150),
    new Coin(7600, 220),
    new Coin(7600, 290),
    new Coin(7600, 360),
    new Coin(7600, 430),
  ],
  bubbles: [
    new Bubble(1100, 80),
    new Bubble(1150, 120),
    new Bubble(1200, 80),
    new Bubble(1250, 120),

    new Bubble(2000, 50),
    new Bubble(2050, 350),
    new Bubble(2100, 50),
    new Bubble(2150, 350),
    new Bubble(2200, 50),

    new Bubble(3010, 180),
    new Bubble(3070, 120),
    new Bubble(3130, 180),
    new Bubble(3190, 120),

    new Bubble(4000, 170),
    new Bubble(4050, 120),
    new Bubble(4100, 170),
    new Bubble(4150, 120),
    new Bubble(4200, 170),

    new Bubble(5010, 0),
    new Bubble(5070, 40),
    new Bubble(5130, 0),
    new Bubble(5190, 40),

    new Bubble(5900, 250),
    new Bubble(5950, 200),
    new Bubble(6000, 250),
    new Bubble(6050, 200),
    new Bubble(6100, 250),

    new Bubble(6910, 180),
    new Bubble(6970, 120),
    new Bubble(7030, 180),
    new Bubble(7090, 120),

    new Bubble(7200, 170),
    new Bubble(7300, 120),
    new Bubble(7400, 170),
    new Bubble(7500, 120),
  ],
};

let enemies = [
  new JellyFishGreen(1300, 220),
  new JellyFishLila(1800, 320),
  new JellyFishPink(2480, 420),
  new JellyFishYellow(3250, 250),
  new JellyFishGreen(3650, 350),
  new JellyFishLila(4270, 300),
  new JellyFishPink(5000, 200),
  new JellyFishYellow(5450, 420),
  new JellyFishGreen(5700, 320),
  new JellyFishYellow(6200, 300),
  new JellyFishLila(6600, 250),
  new JellyFishPink(7650, 350),
  new JellyFishGreen(7800, 150),
  new GreenFish(1350, 60),
  new PinkFish(1550, 410),
  new RedFish(1750, 180),
  new GreenFish(2100, 320),
  new PinkFish(2500, 120),
  new RedFish(2700, 390),
  new GreenFish(3200, 240),
  new PinkFish(3500, 70),
  new RedFish(3900, 430),
  new GreenFish(4300, 200),
  new PinkFish(4700, 350),
  new RedFish(4900, 30),
  new GreenFish(5500, 400),
  new PinkFish(5700, 160),
  new RedFish(5900, 270),
  new GreenFish(6300, 90),
  new PinkFish(6700, 380),
  new RedFish(6900, 210),
  new GreenFish(7300, 300),
  new PinkFish(7600, 50),
  new RedFish(7900, 430),
];

let lightBeams = [
  new LightBeam(0),
  new LightBeam(1000),
  new LightBeam(2000),
  new LightBeam(3000),
  new LightBeam(4000),
  new LightBeam(5000),
  new LightBeam(6000),
  new LightBeam(7000),
  new LightBeam(8000),
];

let backgroundImagesLevel = [
  "src/img/3. Background/Layers/5. Water/D1.png",
  "src/img/3. Background/Layers/4.Fondo 2/D1.png",
  "src/img/3. Background/Layers/3.Fondo 1/D1.png",
  "src/img/3. Background/Layers/2. Floor/D1.png",
  "src/img/3. Background/Layers/5. Water/D2.png",
  "src/img/3. Background/Layers/4.Fondo 2/D2.png",
  "src/img/3. Background/Layers/3.Fondo 1/D2.png",
  "src/img/3. Background/Layers/2. Floor/D2.png",
];

renderBackground(level, 6, backgroundImagesLevel);
setLevelLength();
setEnemies();
setObject(LevelObjects.coins);
setObject(LevelObjects.bubbles);
setLightBeams();
lightBeamIntervall();

function renderBackground(level, backgroundRepeats, backgroundImages) {
  let repeats = backgroundRepeats;
  let insertPosition = -100;

  for (let i = 0; i < repeats; i++) {
    level.backgroundObjects.push(
      // 1.Teil vom Hintergrund
      new BackgroundObject(backgroundImages[0], insertPosition + 0),
      new BackgroundObject(backgroundImages[1], insertPosition + 0),
      new BackgroundObject(backgroundImages[2], insertPosition + 0),
      new BackgroundObject(backgroundImages[3], insertPosition + 0),

      // 2. teil vom Hintergrund
      new BackgroundObject(backgroundImages[4], insertPosition + 720),
      new BackgroundObject(backgroundImages[5], insertPosition + 720),
      new BackgroundObject(backgroundImages[6], insertPosition + 720),
      new BackgroundObject(backgroundImages[7], insertPosition + 720)
    );
    insertPosition += 1440;
  }
  levelLength = insertPosition;
}

function setLevelLength() {
  level.levelLength = levelLength;
}

function setEnemies() {
  level.enemies.push(...enemies);
  level.enemies.push(new Endboss(levelLength));
}

function setObject(objects) {
  for (let i = 0; i < objects.length; i++) {
    level.objects.push(objects[i]);
  }
}

function setLightBeams() {
  level.lightBeams.push(...lightBeams);
}

function lightBeamIntervall() {
  setInterval(() => {
    level.lightBeams.push(new LightBeam(levelLength));
  }, 30000);
}
