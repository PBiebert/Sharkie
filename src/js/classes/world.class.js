import { Character } from "./character.class.js";
import { Coin } from "./coin.class.js";
import { createLevel1 } from "../levels/level1.js";
import { Bubble } from "./bubble.class.js";
import { HealthBar } from "./healthBar.class.js";
import { CoinCounter } from "./coin-counter.class.js";
import { BubbleCounter } from "./bubble-counter.class.js";
import { ImageAssets } from "./image-Assets.class.js";
import { Endboss } from "./endboss.class.js";
import { AudioHub } from "./audio-hub.class.js";

export class World {
  character;
  level;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarCharacter = new HealthBar(0, -10);
  statusBarEndboss = new HealthBar(400, -10, "Fredy");
  counterBar = { "coins": new CoinCounter(), "bubbles": new BubbleCounter() };
  throwableObject = [];
  currentCharacterDamage = false;
  currentEnemyDamage = false;
  showEndbossHealthBar = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.character = new Character();
    this.character.world = this;
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.characterPosition();
    this.checkEndbossSpawn();
  }

  checkCollisions() {
    setInterval(() => {
      this.handleCharacterEnemyCollisions();
      this.handleCharacterObjectCollisions();
      this.handleBubbleEnemyCollisions();
    }, 1000 / 60);
  }

  handleCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.shouldCharacterTakeDamage(enemy)) {
        this.applyCharacterDamage(enemy);
      } else {
        this.currentCharacterDamage = false;
      }
    });
  }

  shouldCharacterTakeDamage(enemy) {
    return this.character.isColliding(enemy) && !this.character.cooldownActive;
  }

  applyCharacterDamage(enemy) {
    this.character.hit(enemy.damage);
    this.character.cooldown();
    this.updateCharacterHealthBar();
    this.character.resetSleep();
    this.currentCharacterDamage = true;
  }

  updateCharacterHealthBar() {
    this.statusBarCharacter.setPercentage(
      this.character.energy,
      ImageAssets.LIFE_BAR
    );
  }

  handleCharacterObjectCollisions() {
    this.level.objects.forEach((object, index) => {
      if (this.character.isColliding(object)) {
        this.handleObjectCollection(object, index);
      }
    });
  }

  handleObjectCollection(object, index) {
    if (object instanceof Coin) {
      this.collectCoin(index);
    }
    if (object instanceof Bubble) {
      this.collectBubble(index);
    }
  }

  collectCoin(index) {
    this.level.objects.splice(index, 1);
    this.counterBar.coins.count++;
    AudioHub.collectSound(AudioHub.collect);
  }

  collectBubble(index) {
    this.level.objects.splice(index, 1);
    this.counterBar.bubbles.count++;
    AudioHub.collectSound(AudioHub.blubbCollect);
  }

  handleBubbleEnemyCollisions() {
    this.throwableObject.forEach((bubble, bubbleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (this.shouldBubbleDamageEnemy(bubble, enemy)) {
          this.applyBubbleDamage(bubbleIndex, enemy, enemyIndex, bubble);
        }
      });
    });
  }

  shouldBubbleDamageEnemy(bubble, enemy) {
    return bubble.isColliding(enemy) && !enemy.cooldownActive;
  }

  applyBubbleDamage(bubbleIndex, enemy, enemyIndex, bubble) {
    this.throwableObject.splice(bubbleIndex, 1);
    enemy.energy -= bubble.damage;
    enemy.cooldown();
    AudioHub.hurtSound(AudioHub.hurt);
    if (enemy.isDead()) {
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1);
      }, 500);
    }
  }

  characterPosition() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        enemy.characterData = {
          x: this.character.x,
          y: this.character.y,
          width: this.character.rWidth,
          height: this.character.rHeight,
          energy: this.character.energy,
        };
      });
    }, 1000 / 60);
  }

  checkEndbossSpawn() {
    setInterval(() => {
      const boss = this.filterBoss();
      if (boss && boss.introPlayed) {
        this.showEndbossHealthBar = true;
        this.statusBarEndboss.setPercentage(boss.energy, ImageAssets.LIFE_BAR);
      }
    }, 1000 / 60);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Löscht das dargestellte Bild

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.lightBeams);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.objects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarCharacter);
    this.addToMap(this.counterBar.coins);
    this.addToMap(this.counterBar.bubbles);

    if (this.showEndbossHealthBar) {
      this.addToMap(this.statusBarEndboss);
    }

    let self = this;
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
      object.getRealFrame();
      this.flipImage(object);
    }
    object.getRealFrame();
    object.draw(this.ctx);
    object.drawFrame(this.ctx);

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  filterBoss() {
    let endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    return endboss;
  }

  gameResult() {
    if (this.character.energy == 0) {
      return "gameOver";
    }

    const boss = this.filterBoss();
    if (boss && boss.energy == 0) {
      return "win";
    }
  }
}
