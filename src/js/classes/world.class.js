import { Character } from "./character.class.js";
import { Coin } from "./coin.class.js";
import { level as level1 } from "../levels/level1.js";
import { Bubble } from "./bubble.class.js";
import { HealthBar } from "./healthBar.class.js";
import { CoinCounter } from "./coin-counter.class.js";
import { BubbleCounter } from "./bubble-counter.class.js";

export class World {
  character;
  level;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new HealthBar();
  counterBar = { "coins": new CoinCounter(), "bubbles": new BubbleCounter() };

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level1; // Level aus level1.js verwenden
    this.character = new Character();
    this.character.world = this; // Referenz auf World setzen
    this.setWorld();
    this.draw();
    this.checkCollisions();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(
            this.character.energy,
            this.statusBar.LIFE_IMAGES
          );
        }
      });

      this.level.objects.forEach((object, index) => {
        if (this.character.isColliding(object)) {
          if (object instanceof Coin) {
            this.level.objects.splice(index, 1);
            this.counterBar.coins.count++;
          }
          if (object instanceof Bubble) {
            this.level.objects.splice(index, 1);
            this.counterBar.bubbles.count++;
          }
        }
      });
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Löscht das dargestellte Bild

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.lightBeams);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.objects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.counterBar.coins);
    this.addToMap(this.counterBar.bubbles);

    let self = this; //rendert die maximale anzahl an Frames die die grafuickarte her gibt
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
      object.getRealFrame();
    }
    object.getRealFrame();
    object.draw(this.ctx); //new
    object.drawFrame(this.ctx);

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
    // object.getRealFrame();
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  // übergibt die referenz zur world an alle MovableObjects damit auf keybord zugegriffen werden kann
  setWorld() {
    this.character.world = this;
  }
}
