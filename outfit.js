class Outfit {
  constructor(title, id, background) {
    this.title = title;
    this.id = id;
    this.garments = [];// NOTE: hats, clothes, accessories//
    this.background = background;
  }
  changeGarment(garment) {
    if (garment.classList.contains('hats')) {
      this.garments.splice(0, 1, garment.alt);
    } else if (garment.classList.contains('clothes')) {
      this.garments.splice(1, 1, garment.alt);
    } else if (garment.classList.contains('accessories')) {
      this.garments.splice(2, 1, garment.alt);
    }
  }

  changeBackground(background){
    if (background.classList.contains('backgrounds')) {
      this.background = background.alt;
    }
  }
}
