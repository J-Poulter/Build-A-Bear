var buttonHats = document.querySelectorAll('.button-hats-js');
var buttonClothes = document.querySelectorAll('.button-clothes-js');
var buttonAccessories = document.querySelectorAll('.button-accessories-js');
var buttonBackgrounds = document.querySelectorAll('.button-backgrounds-js');
var hats = document.querySelectorAll('.hats-js');
var clothes = document.querySelectorAll('.clothes-js');
var accessories = document.querySelectorAll('.accessories-js');
var backgrounds = document.querySelectorAll('.backgrounds-js');
var globalSelector = document.querySelector('main');
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
  }
}

function selectButton(buttonType, choiceType) {
  for (var i = 0; i < buttonType.length; i++) {
    buttonType[i].classList.remove('selected-button');
  }
  event.target.classList.add('selected-button');
  x = choiceType;
  displayChoice(x);
}

function displayChoice(choiceType) {
  console.log(choiceType);
  for (var i = 0; i < choiceType.length; i++) {
    choiceType[i].classList.add('hide');
  }
  x = event.target.value;
  choiceType[x].classList.remove('hide');
  console.log(choiceType[0]);
}
