class Outfit {
  constructor(outfitFile) {
    this.title = outfitFile.title;
    this.id = outfitFile.id || this.generateIdNum();
    this.garments = [null, null, null];// NOTE: hats, clothes, accessories//
    this.background = outfitFile.background;
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

  removeGarment(garment) {
    if (garment.classList.contains('hats')) {
      this.garments.splice(0, 1);
    } else if (garment.classList.contains('clothes')) {
      this.garments.splice(1, 1);
    } else if (garment.classList.contains('accessories')) {
      this.garments.splice(2, 1);
    }
  }

  changeBackground(background) {
    if (background.classList.contains('backgrounds')) {
      this.background = background.alt;
    }
  }

  generateIdNum() {
    return Math.random().toString(36).slice(2, 8);
  }
}
