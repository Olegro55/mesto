export const validationConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__item_error',
  inactiveButtonClass: 'popup__button_inactive'
};

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '12543613-4b99-4f5b-854b-aa27b4c9eaee',
    'Content-Type': 'application/json'
  }
};

export const userInfoConfig = {
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  imageSelector: '.profile__image'
};