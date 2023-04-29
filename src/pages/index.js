import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { cards } from '../utils/constants.js';

const validationConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__item_error',
  inactiveButtonClass: 'popup__button_inactive'
};
const formEditProfile = document.querySelector('.popup__form');
const formEditProfileImage = document.querySelector('.popup_edit-profile-image');
const formAddElement = document.querySelector('#form');
const nameInput = document.querySelector('.popup__item_type_name');
const aboutInput = document.querySelector('.popup__item_type_about');
const imageInput = document.querySelector('.popup__item_type_image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditImageButton = document.querySelector('.profile__edit-image');
const elementAddButton = document.querySelector('.profile__add-button');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '12543613-4b99-4f5b-854b-aa27b4c9eaee',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  imageSelector: '.profile__image'
});
const formProfileValidator = new FormValidator(validationConfig, formEditProfile);
const formProfileImageValidator = new FormValidator(validationConfig, formEditProfileImage);
const formElementValidator = new FormValidator(validationConfig, formAddElement);

const popupEditProfile = new PopupWithForm('.popup_edit-profile', data => {
  popupEditProfile.addWaitMessage();
  api.setUserInfo(data)
    .then(res => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
    .catch(err => { console.log(err); })
    .finally(_ => { popupEditProfile.removeWaitMessage(); });
});
const popupEditProfileImage = new PopupWithForm('.popup_edit-profile-image', data => {
  popupEditProfileImage.addWaitMessage();
  api.setUserImage(data)
    .then(res => {
        userInfo.setUserImage(res);
        popupEditProfileImage.close();
      })
    .catch(err => { console.log(err); })
    .finally(_ => { popupEditProfileImage.removeWaitMessage(); });
});
const popupAddElement = new PopupWithForm('.popup_add-element', data => {
  const newCardElement = generateCard(data);
  cardsList.addItem(newCardElement);
  popupAddElement.close();
});
const popupImage = new PopupWithImage('.popup-image');

popupEditProfile.setEventListeners();
popupEditProfileImage.setEventListeners();
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
profileEditImageButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  imageInput.value = data.avatar;
  formProfileImageValidator.toggleButtonState();
  popupEditProfileImage.open();
});
elementAddButton.addEventListener('click', () => {
  formElementValidator.toggleButtonState();
  popupAddElement.open();
});

api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res);
    userInfo.setUserImage(res);
  })
  .catch(err => { console.log(err); });

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
