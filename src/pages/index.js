import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithButton } from '../components/PopupWithButton.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import './index.css';

const validationConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__item_error',
  inactiveButtonClass: 'popup__button_inactive'
};
const formEditProfile = document.querySelector('.popup_edit-profile').querySelector('.popup__form');
const formEditProfileImage = document.querySelector('.popup_edit-profile-image').querySelector('.popup__form');
const formAddElement = document.querySelector('.popup_add-element').querySelector('.popup__form');
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
  popupAddElement.addWaitMessage();
  api.addCard(data)
    .then(res => {
        const newCardElement = generateCard(res, userId);
        cardsList.addItem(newCardElement);
        popupAddElement.close();
      })
    .catch(err => { console.log(err); })
    .finally(_ => { popupAddElement.removeWaitMessage(); });
});
const popupConfirmDeletion = new PopupWithButton('.popup_confirm-deletion', (cardId, card) => {
  api.deleteCard(cardId)
    .then(_ => {
      card.delete();
      popupConfirmDeletion.close()
    })
    .catch(err => { console.log(err); });
});
const popupImage = new PopupWithImage('.popup-image');

popupEditProfile.setEventListeners();
popupEditProfileImage.setEventListeners();
popupAddElement.setEventListeners();
popupConfirmDeletion.setEventListeners();
popupImage.setEventListeners();
formProfileValidator.enableValidation();
formProfileImageValidator.enableValidation();
formElementValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  formProfileValidator.removeErrors();
  popupEditProfile.open();
});
profileEditImageButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  imageInput.value = data.avatar;
  formProfileImageValidator.removeErrors();
  popupEditProfileImage.open();
});
elementAddButton.addEventListener('click', () => {
  formElementValidator.removeErrors();
  popupAddElement.open();
});

let cardsList;
let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserImage(userData);
    userId = userData._id

    cardsList = new Section(
      {
        items: cards.reverse(),
        renderer: item => {
          const newCardElement = generateCard(item, userId);
          cardsList.addItem(newCardElement);
        }
      },
      '.elements'
    );
    cardsList.addInitialItems();
  })
  .catch(err => { console.log(err); });

function generateCard(card, userId) {
  const newCard = new Card(card, userId, '#cardTemplate', { 
    handleClick: popupImage.open.bind(popupImage),
    handleDelete: popupConfirmDeletion.open.bind(popupConfirmDeletion),
    handleLike: (cardId, likeAction) => {
      api.likeCard(cardId, likeAction)
        .then(res => {
          newCard.updateLikes(res);
        })
        .catch(err => { console.log(err); });
    }
  });
  const newCardElement = newCard.generate();
  return newCardElement;
}

