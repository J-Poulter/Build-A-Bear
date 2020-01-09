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
var outfitArray = [];
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

function selectButton(buttonNodeList, garmentsNodeList) {
  var garmentIndex = event.target.value;
  var buttonIsSelected = event.target.classList.contains('selected-button');

  if (buttonIsSelected) {
    event.target.classList.remove('selected-button');
    removeChoice(garmentsNodeList);
    currentOutfit.removeGarment(garmentsNodeList[x]);
  } else {
    resetGarmentSelection(buttonNodeList);
    event.target.classList.add('selected-button');
    displayChoice(garmentsNodeList);
  }
}

function resetGarmentSelection(buttonNodeList) {
  for (var i = 0; i < buttonNodeList.length; i++) {
    buttonNodeList[i].classList.remove('selected-button');
  }
}

function removeChoice(garmentsNodeList) {
  for (var i = 0; i < garmentsNodeList.length; i++) {
    garmentsNodeList[i].classList.add('hide');
  }
}

function displayChoice(garmentsNodeList) {
  removeChoice(garmentsNodeList);
  x = event.target.value;
  garmentsNodeList[x].classList.remove('hide');
  currentOutfit.changeBackground(garmentsNodeList[x]);
  currentOutfit.changeGarment(garmentsNodeList[x]);
}

function saveOutfit() {
  currentOutfit.setTitle(outfitNameInput.value);
  if (outfitArray.find(element => element.id === currentOutfit.id) === undefined) {
    saveNewOutfit();
  } else {
    updateExistingOutfit();
  }
  saveToLocalStorage();
  resetHelper();
}

function saveNewOutfit() {
  populateCard();
  var newOutfit = new Outfit(currentOutfit);
  outfitArray.push(newOutfit);
}

function updateExistingOutfit() {
  var existingOutfit = outfitArray.find(element => element.id === currentOutfit.id);
  var changeOutfit = outfitArray.indexOf(existingOutfit);
  outfitArray.splice(changeOutfit, 1, new Outfit(currentOutfit));
  var outfitCardBox = document.getElementById(`${currentOutfit.id}`);
  var outfitCardTitle = outfitCardBox.querySelector('.outfit-name-js');
  outfitCardTitle.innerText = `${currentOutfit.title}`;
}

function populateCard() {
  savedOutfitsSection.insertAdjacentHTML('beforeend',
  `<div id=${currentOutfit.id} class='outfit-card outfit-card-js'>
    <p class='outfit-name outfit-name-js'>${currentOutfit.title}</p>
    <i class='far fa-times-circle close-button-js'></i>
  </div>`);
}

function enableButton() {
  saveButton.disabled = outfitNameInput.value.length === 0
}

function resetHelper() {
  saveForm.reset();
  removeChoice(allGarments);
  resetGarmentSelection(allButtons);
  enableButton();
  currentOutfit = new Outfit({});
}

function saveToLocalStorage() {
  localStorage.setItem('cardSection', JSON.stringify(outfitArray));
}

function retrieveLocalStorage() {
  var parsedLocalStorage = JSON.parse(localStorage.getItem('cardSection'));
  if (localStorage.getItem('cardSection') !== null) {
    outfitArray = outfitArray.concat(parsedLocalStorage);
  }
  rePopulateSavedCards();
}

function rePopulateSavedCards() {
  for (var i = 0; i < outfitArray.length; i++) {
    currentOutfit = outfitArray[i];
    populateCard();
  }
  resetHelper();
}

function removeSaveCard() {
  event.target.parentElement.remove();
  var outfitRemoved = outfitArray.find(outfit => outfit.id === event.target.parentElement.id)
  var remove = outfitArray.indexOf(outfitRemoved);
  outfitArray.splice(remove, 1);
  saveToLocalStorage();
}

var arr = new Array(new Array(10,1))

function redressBearHelper() {
  resetHelper();
  var outfitDetails = outfitArray.find(outfit => outfit.id === event.target.id)
  currentOutfit = new Outfit(outfitDetails);
  var clickHatButton = buttonHats[currentOutfit.garments[0].clickValue];
  var clickClothesButton = buttonClothes[currentOutfit.garments[1].clickValue];
  var buttons = [
    clickHatButton,
    clickClothesButton,
    buttonAccessories[currentOutfit.garments[2].clickValue],
    buttonBackgrounds[currentOutfit.background.clickValue]
  ];
  for (var i = 0; i < buttons.length; i ++) {
    if (buttons[i] !== undefined) {
      buttons[i].click();
    }
  }
  outfitNameInput.value = currentOutfit.title;
  enableButton();
}
