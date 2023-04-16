import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

const validationConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__item_error',
  inactiveButtonClass: 'popup__button_inactive'
};
const formEditProfile = document.querySelector('.popup__form');
const formAddElement = document.querySelector('#form');
const nameInput = document.querySelector('.popup__item_type_name');
const aboutInput = document.querySelector('.popup__item_type_about');
const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});
const formProfileValidator = new FormValidator(validationConfig, formEditProfile);
const formElementValidator = new FormValidator(validationConfig, formAddElement);

const popupEditProfile = new PopupWithForm('.popup_edit-profile', data => {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
});
const popupAddElement = new PopupWithForm('.popup_add-element', data => {
  const newCardElement = generateCard(data);
  cardsList.addItem(newCardElement);
  popupAddElement.close();
});
const popupImage = new PopupWithImage('.popup-image');

popupEditProfile.setEventListeners();
popupAddElement.setEventListeners();
popupImage.setEventListeners();
formProfileValidator.enableValidation();
formElementValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  formProfileValidator.toggleButtonState();
  popupEditProfile.open();
});
elementAddButton.addEventListener('click', () => {
  formElementValidator.toggleButtonState();
  popupAddElement.open();
});

const cardsList = new Section(
  {
    items: cards,
    renderer: item => {
      const newCardElement = generateCard(item);
      cardsList.addItem(newCardElement);
    }
  },
  '.elements'
);
cardsList.addInitialItems();

function generateCard(card) {
  const newCard = new Card(card, '#cardTemplate', popupImage.open.bind(popupImage));
  const newCardElement = newCard.generate();
  return newCardElement;
}
