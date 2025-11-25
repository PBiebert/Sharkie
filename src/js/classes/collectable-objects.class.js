class CollectableObjects extends DrawableObject {
  img; // Variable für das Bild des Objekts
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 250;
  width = 100;
  height = 100;
  speedImgChange = 125;

  constructor() {
    super();
  }

  animate(IMAGE_ARRAY) {
    setInterval(() => {
      this.playAnimation(IMAGE_ARRAY);
    }, this.speedImgChange);
  }
}
