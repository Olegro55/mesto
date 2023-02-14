const formPopup = document.querySelector('.popup');
const profileNameText = document.querySelector('.profile-info__title');
const nameInput = document.querySelector('.popup__item_name');
const profileAboutText = document.querySelector('.profile-info__subtitle');
const aboutInput = document.querySelector('.popup__item_about');

const profileInfoButton = document.querySelector('.profile-info__button');
profileInfoButton.addEventListener('click', function () {
  formPopup.classList.add('popup_opened');
  nameInput.value = profileNameText.textContent;
  aboutInput.value = profileAboutText.textContent;
});

const popupCloseIcon = document.querySelector('.popup__close-icon');
popupCloseIcon.addEventListener('click', function () {
  formPopup.classList.remove('popup_opened');
});

const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  profileNameText.textContent = nameInput.value;
  profileAboutText.textContent = aboutInput.value;
  formPopup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

const elementHeart = document.querySelector('.element__heart');

elementHeart.addEventListener('click', function () {
  elementHeart.classList.toggle('element__heart_active');
});
