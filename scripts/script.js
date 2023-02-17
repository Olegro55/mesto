const formPopup = document.querySelector('.popup');
const profileNameText = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__item_type_name');
const profileAboutText = document.querySelector('.profile__subtitle');
const aboutInput = document.querySelector('.popup__item_type_about');
const popupCloseIcon = document.querySelector('.popup__close-icon');
const profileInfoButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');

profileInfoButton.addEventListener('click', openForm);

popupCloseIcon.addEventListener('click', closeForm);

formElement.addEventListener('submit', handleFormSubmit);

function openForm() {
  formPopup.classList.add('popup_opened');
  nameInput.value = profileNameText.textContent;
  aboutInput.value = profileAboutText.textContent;
}

function closeForm() {
  formPopup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  profileNameText.textContent = nameInput.value;
  profileAboutText.textContent = aboutInput.value;
  closeForm();
}

/*
const elementHeart = document.querySelector('.element__heart');

elementHeart.addEventListener('click', function () {
  elementHeart.classList.toggle('element__heart_active');
});
*/
