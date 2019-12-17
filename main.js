var buttonHats = document.querySelectorAll('.button-hats-js');
var buttonClothes = document.querySelectorAll('.button-clothes-js');
var buttonAccessories = document.querySelectorAll('.button-accessories-js');
var buttonBackgrounds = document.querySelectorAll('.button-backgrounds-js');
var globalSelector = document.querySelector('main');
globalSelector.addEventListener('click', clickHandlerOutfits);

function clickHandlerOutfits() {
  if (event.target.classList.contains('button-hats-js')) {
    selectButton(buttonHats);
  } else if (event.target.classList.contains('button-clothes-js')) {
    selectButton(buttonClothes);
  } else if (event.target.classList.contains('button-accessories-js')) {
    selectButton(buttonAccessories);
  } else if (event.target.classList.contains('button-backgrounds-js')) {
    selectButton(buttonBackgrounds);
  }
}

function selectButton(buttonType) {
  for (var i = 0; i < buttonType.length; i++) {
    buttonType[i].classList.remove('selected-button');
  }
  event.target.classList.add('selected-button');
}
