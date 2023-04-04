import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupList = document.querySelectorAll('.popup');
const validationConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__item_error',
  inactiveButtonClass: 'popup__button_inactive'
};

const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileNameText = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__item_type_name');
const profileAboutText = document.querySelector('.profile__subtitle');
const aboutInput = document.querySelector('.popup__item_type_about');
const popupCloseIcon = document.querySelector('.popup__close-icon');
const profileEditButton = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__form');

const elements = document.querySelector('.elements');
const popupAddElement = document.querySelector('.popup_add-element');
const elementAddButton = document.querySelector('.profile__add-button');
const elementCloseIcon = document.querySelector('#close-icon');
const formEddElement = document.querySelector('#form');

const popupImage = document.querySelector('.popup-image');
const popupImageFoto = document.querySelector('.popup-image__foto');
const popupImageText = document.querySelector('.popup-image__text');
const popupImageCloseIcon = document.querySelector('.popup-image__close-icon');

const formAddCard = document.querySelector('.popup_add-element');
const popupItemTypePhoto = formAddCard.querySelector('.popup__item_type_photo');
const popupItemTypePlace = formAddCard.querySelector('.popup__item_type_place');

const formProfileValidator = new FormValidator(validationConfig, formEditProfile);

const formElementValidator = new FormValidator(validationConfig, formEddElement);

formElementValidator.enableValidation();

formProfileValidator.enableValidation();

function closeOnEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscape);
  popup.focus();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscape);
}

function openFormProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileNameText.textContent;
  //У объекта, хранимого в переменной nameInput, вызываем метод dispatchEvent, кот. производит новое событие инпут,
  //хотя пользователь ничего не делал, т.к. добавление туда textContent-ом текста не является событием инпут
  aboutInput.value = profileAboutText.textContent;
  formProfileValidator.toggleButtonState();
}

function openAddCardForm() {
  openPopup(popupAddElement);
  formEddElement.reset();
  formElementValidator.toggleButtonState();
}

function openFullImage(cardElement) {
  openPopup(popupImage);
  const imageSrc = cardElement.querySelector('.element__foto').getAttribute('src');
  const cardText = cardElement.querySelector('.element__text').textContent;
  popupImageFoto.setAttribute('src', imageSrc);
  popupImageFoto.setAttribute('alt', cardText);
  popupImageText.textContent = cardText;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileNameText.textContent = nameInput.value;
  profileAboutText.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function generateCard(card) {
  const newCard = new Card(card, '#cardTemplate', openFullImage);
  const newCardElement = newCard.generate();
  return newCardElement;
}

function addCard(newCard) {
  elements.prepend(newCard);
}

function submitAddCardForm(event) {
  event.preventDefault();
  const link = popupItemTypePhoto.value;
  const name = popupItemTypePlace.value;
  const card = {
    name: name,
    link: link
  };

  const newCardElement = generateCard(card);
  addCard(newCardElement);
  closePopup(popupAddElement);
}

cards.forEach(function (element) {
  const newCardElement = generateCard(element);
  addCard(newCardElement);
});

popupList.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === popup) closePopup(popup);
  });
});

profileEditButton.addEventListener('click', openFormProfile);
popupCloseIcon.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

elementAddButton.addEventListener('click', openAddCardForm);
elementCloseIcon.addEventListener('click', function () {
  closePopup(popupAddElement);
});

popupImageCloseIcon.addEventListener('click', function () {
  closePopup(popupImage);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);
//Чтобы добавлять карточки с помощью формы:
formAddCard.addEventListener('submit', submitAddCardForm);
