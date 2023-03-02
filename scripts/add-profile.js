const formPopup = document.querySelector('.popup');
const profileNameText = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__item_type_name');
const profileAboutText = document.querySelector('.profile__subtitle');
const aboutInput = document.querySelector('.popup__item_type_about');
const popupCloseIcon = document.querySelector('.popup__close-icon');
const profileInfoButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');

profileInfoButton.addEventListener('click', openFormProfile);

popupCloseIcon.addEventListener('click', closeFormProfile);

formElement.addEventListener('submit', handleFormSubmit);

function openFormProfile() {
  formPopup.classList.add('popup_opened');
  nameInput.value = profileNameText.textContent;
  aboutInput.value = profileAboutText.textContent;
}

function closeFormProfile() {
  formPopup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  profileNameText.textContent = nameInput.value;
  profileAboutText.textContent = aboutInput.value;
  closeFormProfile();
}
