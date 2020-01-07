var accessories = document.querySelectorAll('.accessories-js');
var allButtons = document.querySelectorAll('.all-buttons-js');
var allGarments = document.querySelectorAll('.garment-js');
var backgrounds = document.querySelectorAll('.backgrounds-js');
var buttonAccessories = document.querySelectorAll('.button-accessories-js');
var buttonBackgrounds = document.querySelectorAll('.button-backgrounds-js');
var buttonClothes = document.querySelectorAll('.button-clothes-js');
var buttonHats = document.querySelectorAll('.button-hats-js');
var clothes = document.querySelectorAll('.clothes-js');
var currentOutfit = new Outfit({});
var globalSelector = document.querySelector('main');
var hats = document.querySelectorAll('.hats-js');
var outfitList = [];
var outfitNameInput = document.querySelector('.user-input-js');
var saveButton = document.querySelector('.save-button-js');
var savedOutfitsSection = document.getElementById('saved-outfits');
var saveForm = document.querySelector('.save-form');

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
  } else if (event.target.classList.contains('outfit-card-js')) {
    redressBearHelper();
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
  currentOutfit.setTitle(outfitNameInput.value);
  if (outfitList.find(element => element.id === currentOutfit.id) === undefined) {
    saveNewOutfit();
  } else if (outfitList.find(element => element.id === currentOutfit.id)) {
    updateExistingOutfit();
  }
  saveToLocalStorage();
  resetHelper();
}

function saveNewOutfit() {
  populateCard();
  var newOutfit = new Outfit(currentOutfit);
  outfitList.push(newOutfit);
}

function updateExistingOutfit() {
  var existingOutfit = outfitList.find(element => element.id === currentOutfit.id);
  var changeOutfit = outfitList.indexOf(existingOutfit);
  var outfitCardBox = document.getElementById(`${currentOutfit.id}`);
  var outfitCardTitle = outfitCardBox.querySelector('.outfit-name-js')
  outfitCardTitle.innerText = `${currentOutfit.title}`;
  outfitList.splice(changeOutfit, 1, new Outfit(currentOutfit));
}

function populateCard() {
  savedOutfitsSection.insertAdjacentHTML('beforeend',
  `<div id=${currentOutfit.id} class='outfit-card outfit-card-js'>
    <p class='outfit-name outfit-name-js'>${currentOutfit.title}</p>
    <i class='far fa-times-circle close-button-js'></i>
  </div>`);
}

function enableButton() {
  if (outfitNameInput.value.length != 0) {
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

function saveToLocalStorage() {
  localStorage.setItem('cardSection', JSON.stringify(outfitList));
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

function redressBearHelper() {
  resetHelper();
  var outfitSelected = outfitList.find(outfit => outfit.id === event.target.id)
  currentOutfit = new Outfit(outfitSelected);
  var actions = [buttonHats[currentOutfit.garments[0].clickValue],
    buttonClothes[currentOutfit.garments[1].clickValue],
    buttonAccessories[currentOutfit.garments[2].clickValue],
    buttonBackgrounds[currentOutfit.background.clickValue]];
  for (var i = 0; i < actions.length; i ++) {
    if (actions[i] !== undefined) {
      actions[i].click();
    }
  }
  outfitNameInput.value = currentOutfit.title;
  enableButton();
}
