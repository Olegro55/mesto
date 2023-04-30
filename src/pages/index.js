import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithButton } from '../components/PopupWithButton.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { validationConfig, apiConfig, userInfoConfig } from '../utils/constants.js';
import './index.css';

const formEditProfile = document.forms['edit-profile-form'];
const formEditProfileImage = document.forms['edit-profile-image-form'];
const formAddElement = document.forms['confirm-deletion-form'];
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditImageButton = document.querySelector('.profile__edit-image');
const elementAddButton = document.querySelector('.profile__add-button');

const api = new Api(apiConfig);
const userInfo = new UserInfo(userInfoConfig);
const formProfileValidator = new FormValidator(validationConfig, formEditProfile);
const formProfileImageValidator = new FormValidator(validationConfig, formEditProfileImage);
const formElementValidator = new FormValidator(validationConfig, formAddElement);

const popupEditProfile = new PopupWithForm('.popup_edit-profile', data => { handleEditProfileSubmit(data) });
const popupEditProfileImage = new PopupWithForm('.popup_edit-profile-image', data => { handleEditProfileImageSubmit(data) });
const popupAddElement = new PopupWithForm('.popup_add-element', data => { handleAddElementSubmit(data) });
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
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formProfileValidator.removeErrors();
  popupEditProfile.open();
});
profileEditImageButton.addEventListener('click', () => {
  popupEditProfileImage.setInputValues(userInfo.getUserInfo());
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

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleEditProfileSubmit(inputValues) {
  function makeRequest() {
    return api.setUserInfo(inputValues).then(res => { userInfo.setUserInfo(res); });
  }
  handleSubmit(makeRequest, popupEditProfile);
}

function handleEditProfileImageSubmit(inputValues) {
  function makeRequest() {
    return api.setUserImage(inputValues).then(res => { userInfo.setUserInfo(res); });
  }
  handleSubmit(makeRequest, popupEditProfileImage);
}

function handleAddElementSubmit(inputValues) {
  function makeRequest() {
    return api.addCard(inputValues).then(res => { cardsList.addItem(generateCard(res, userId)); });
  }
  handleSubmit(makeRequest, popupAddElement);
}

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