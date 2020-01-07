class Outfit {
  constructor(outfitFile) {
    this.title = outfitFile.title;
    this.id = outfitFile.id || this.generateIdNum();
    this.garments = outfitFile.garments || new Array(3).fill({garment: undefined, clickValue: undefined});
    //NOTE: hats, clothes, accessories;
    this.background = outfitFile.background;
  }

  changeGarment(garment) {
    if (garment.classList.contains('hats')) {
      this.garments.splice(0, 1, {garment: garment.alt, clickValue: event.target.value});
    } else if (garment.classList.contains('clothes')) {
      this.garments.splice(1, 1, {garment: garment.alt, clickValue: event.target.value});
    } else if (garment.classList.contains('accessories')) {
      this.garments.splice(2, 1, {garment: garment.alt, clickValue: event.target.value});
    }
  }

  removeGarment(garment) {
    if (garment.classList.contains('hats')) {
      this.garments.splice(0, 1, {garment: undefined, clickValue: undefined});
    } else if (garment.classList.contains('clothes')) {
      this.garments.splice(1, 1, {garment: undefined, clickValue: undefined});
    } else if (garment.classList.contains('accessories')) {
      this.garments.splice(2, 1, {garment: undefined, clickValue: undefined});
    }
  }

  changeBackground(background) {
    if (background.classList.contains('backgrounds')) {
      this.background = {background: background.alt, clickValue: event.target.value};
    }
  }

  setTitle(title) {
    this.title = title;
  }

  generateIdNum() {
    return Math.random().toString(36).slice(2, 8);
  }
}
