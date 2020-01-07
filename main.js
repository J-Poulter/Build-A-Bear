var buttonHats = document.querySelectorAll('.button-hats-js');
var buttonClothes = document.querySelectorAll('.button-clothes-js');
var buttonAccessories = document.querySelectorAll('.button-accessories-js');
var buttonBackgrounds = document.querySelectorAll('.button-backgrounds-js');
var hats = document.querySelectorAll('.hats-js');
var clothes = document.querySelectorAll('.clothes-js');
var accessories = document.querySelectorAll('.accessories-js');
var backgrounds = document.querySelectorAll('.backgrounds-js');
var globalSelector = document.querySelector('main');
var outfitNameInput = document.querySelector('.user-input-js');
var outfitList = [];
var currentOutfit = new Outfit({});
var savedOutfitsSection = document.getElementById('saved-outfits');
var saveForm = document.querySelector('.save-form');
var saveButton = document.querySelector('.save-button-js');
var allGarments = document.querySelectorAll('.garment-js');
var allButtons = document.querySelectorAll('.all-buttons-js');

globalSelector.addEventListener('click', clickHandlerOutfits);
saveForm.addEventListener('input', enableButton);
window.addEventListener('load', retrieveLocalStorage);

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
  } else if (event.target.classList.contains('close-button-js')) {
    removeSaveCard();
  }
}

function selectButton(buttonType, choiceType) {
  x = event.target.value;
  if (event.target.classList.contains('selected-button')) {
    event.target.classList.remove('selected-button');
    removeChoice(choiceType);
    currentOutfit.removeGarment(choiceType[x]);
  } else {
    resetGarmentSelection(buttonType);
    event.target.classList.add('selected-button');
    displayChoice(choiceType);
  }
}

function resetGarmentSelection(buttonType) {
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
  if (currentOutfit.title === undefined) {
    currentOutfit.setTitle(outfitNameInput.value);
  }
  populateCard();
  var newOutfit = new Outfit(currentOutfit);
  outfitList.push(newOutfit);
  saveToLocalStorage(newOutfit);
  resetHelper();
}

function populateCard() {
  savedOutfitsSection.insertAdjacentHTML('beforeend',
  `<div id=${currentOutfit.id} class='outfit-card'>
    <p class='outfit-name'>${currentOutfit.title}</p>
    <i class='far fa-times-circle close-button-js'></i>
  </div>`);
}

function enableButton() {
  if (outfitNameInput.value.length != 0 ) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

function resetHelper() {
  saveForm.reset();
  removeChoice(allGarments);
  resetGarmentSelection(allButtons);
  enableButton();
  currentOutfit = new Outfit({});
}

function saveToLocalStorage(newOutfit) {
  localStorage.setItem('cardSection', JSON.stringify(outfitList));
  // localStorage.setItem(`${currentOutfit.id}`, newOutfit);
}

function retrieveLocalStorage() {
  var parsedLocalStorage = JSON.parse(localStorage.getItem('cardSection'));
  if (localStorage.getItem('cardSection') !== null) {
    outfitList = outfitList.concat(parsedLocalStorage);
  }
  rePopulateSavedCards();
}

function rePopulateSavedCards() {
  for (var i = 0; i < outfitList.length; i++) {
    currentOutfit = outfitList[i];
    populateCard();
    resetHelper();
  }
}

function removeSaveCard() {
  event.target.parentElement.remove();
  var outfitRemoved = outfitList.find(outfit => outfit.id === event.target.parentElement.id)
  var remove = outfitList.indexOf(outfitRemoved);
  outfitList.splice(remove, 1);
  saveToLocalStorage();
}
