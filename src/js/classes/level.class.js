export class Level {
  enemies;
  lightBeams;
  backgroundObjects;
  levelLength;
  objects;

  constructor(enemies, lightBeams, backgroundObjects, levelLength, objects) {
    this.enemies = enemies;
    this.lightBeams = lightBeams;
    this.backgroundObjects = backgroundObjects;
    this.levelLength = levelLength;
    this.objects = objects;
  }
}
