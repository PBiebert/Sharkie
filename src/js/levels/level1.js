import { Level } from "../classes/level.class.js";
import { Coin } from "../classes/coin.class.js";
import { Bubble } from "../classes/bubble.class.js";
import { BackgroundObject } from "../classes/background-object.class.js";
import { GreenFish } from "../classes/fish-green.class.js";
import { PinkFish } from "../classes/fish-pink.class.js";
import { RedFish } from "../classes/fish-red.class.js";
import { JellyFishGreen } from "../classes/jelly-fish-green.class.js";
import { JellyFishLila } from "../classes/jelly-fish-lila.class.js";
import { JellyFishPink } from "../classes/jelly-fish-pink.class.js";
import { JellyFishYellow } from "../classes/jelly-fish-yellow.class.js";
import { Endboss } from "../classes/endboss.class.js";

export let level = new Level([], [], [], 0, []);

let levelLength;
let LevelObjects = {
  coins: [
    // Width = 31 Height = 33
    new Coin(400, 420), // Startpunkt links
    new Coin(450, 270),
    new Coin(550, 170),
    new Coin(650, 170), // höchster Punkt (rechts oben)
    new Coin(750, 270),
    new Coin(800, 420), // Endpunkt rechts
  ],
  bubbles: [new Bubble(450, 150)],
};

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

renderBackground(level, 1, backgroundImagesLevel);
setLevelLength();
renderEnemies(0, GreenFish);
renderEnemies(0, PinkFish);
renderEnemies(0, RedFish);
renderEnemies(0, JellyFishGreen);
renderEnemies(0, JellyFishLila);
renderEnemies(0, JellyFishPink);
renderEnemies(0, JellyFishYellow);
setEndboss();
setObject(LevelObjects.coins);
setObject(LevelObjects.bubbles);

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

function renderEnemies(sumEnemies, enemySpecies) {
  for (let i = 0; i < sumEnemies; i++) {
    level.enemies.push(new enemySpecies(levelLength));
  }
}

function setEndboss() {
  level.enemies.push(new Endboss(levelLength));
}

function setObject(objects) {
  for (let i = 0; i < objects.length; i++) {
    level.objects.push(objects[i]);
  }
}
