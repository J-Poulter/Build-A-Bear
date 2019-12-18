var buttonHats = document.querySelectorAll('.button-hats-js');
var buttonClothes = document.querySelectorAll('.button-clothes-js');
var buttonAccessories = document.querySelectorAll('.button-accessories-js');
var buttonBackgrounds = document.querySelectorAll('.button-backgrounds-js');
var hats = document.querySelectorAll('.hats-js');
var clothes = document.querySelectorAll('.clothes-js');
var accessories = document.querySelectorAll('.accessories-js');
var backgrounds = document.querySelectorAll('.backgrounds-js');
var globalSelector = document.querySelector('main');
var outfitNum = 1;
var outfitNameInput = document.querySelector('.user-input-js');
var currentOutfit = new Outfit(outfitNameInput.value, outfitNum);
var savedOutfitsSection = document.getElementById('saved-outfits');

globalSelector.addEventListener('click', clickHandlerOutfits);

function clickHandlerOutfits() {
  if (event.target.classList.contains('button-hats-js')) {
    selectButton(buttonHats, hats);
  } else if (event.target.classList.contains('button-clothes-js')) {
    selectButton(buttonClothes, clothes);
  } else if (event.target.classList.contains('button-accessories-js')) {
    selectButton(buttonAccessories, accessories);
  } else if (event.target.classList.contains('button-backgrounds-js')) {
    selectButton(buttonBackgrounds, backgrounds);
  } else if (event.target.classList.contains('save-button-js')) {
    saveOutfit();
  }
}

function selectButton(buttonType, choiceType) {
  x = event.target.value;
  if (event.target.classList.contains('selected-button')) {
    event.target.classList.remove('selected-button');
    removeChoice(choiceType);
    currentOutfit.removeGarment(choiceType[x]);
  } else {
    resetGarmentSelection(buttonType)
    event.target.classList.add('selected-button');
    displayChoice(choiceType);
  }
}

function resetGarmentSelection(buttonType){
  for (var i = 0; i < buttonType.length; i++) {
    buttonType[i].classList.remove('selected-button');
  }
}

function removeChoice(choiceType) {
  for (var i = 0; i < choiceType.length; i++) {
    choiceType[i].classList.add('hide');
  }
}

function displayChoice(choiceType) {
  removeChoice(choiceType);
  x = event.target.value;
  choiceType[x].classList.remove('hide');
  currentOutfit.changeBackground(choiceType[x]);
  currentOutfit.changeGarment(choiceType[x]);
}

function saveOutfit() {
  savedOutfitsSection.insertAdjacentHTML('beforeend', `<div class="outfit-card">
    <p class="outfit-name">placeholder</p>
    <i class="far fa-times-circle"></i>
  </div>`)
}
