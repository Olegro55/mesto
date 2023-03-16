const popupList = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileNameText = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__item_type_name');
const profileAboutText = document.querySelector('.profile__subtitle');
const aboutInput = document.querySelector('.popup__item_type_about');
const popupCloseIcon = document.querySelector('.popup__close-icon');
const profileEditButton = document.querySelector('.profile__edit-button');
const formPopup = document.querySelector('.popup__form');

const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cardTemplate').content;
const popupAddElement = document.querySelector('.popup_add-element');
const placeInput = document.querySelector('.popup__item_type_place');
const elementFotoLink = document.querySelector('.element__foto');
const fotoLinkInput = document.querySelector('.popup__item_type_photo');
const elementAddButton = document.querySelector('.profile__add-button');
const elementCloseIcon = document.querySelector('#close-icon');
const formsElement = document.querySelector('#form');

const popupImage = document.querySelector('.popup-image');
const popupImageFoto = document.querySelector('.popup-image__foto');
const popupImageText = document.querySelector('.popup-image__text');
const popupImageCloseIcon = document.querySelector('.popup-image__close-icon');

const formAddCard = document.querySelector('.popup_add-element');
const popupItemTypePhoto = formAddCard.querySelector('.popup__item_type_photo');
const popupItemTypePlace = formAddCard.querySelector('.popup__item_type_place');

function closeOnEscape(event) {
  const escapeKeyCode = 27;
  if (event.keyCode === escapeKeyCode)
    closePopup(event.currentTarget);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener("keydown", closeOnEscape);
  popup.focus();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("keydown", closeOnEscape);
}

function openFormProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileNameText.textContent;
  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  aboutInput.value = profileAboutText.textContent;
  aboutInput.dispatchEvent(new Event('input', { bubbles: true }));
}

function openAddCardForm() {
  openPopup(popupAddElement);
  formsElement.reset();
  formsElement.dispatchEvent(new Event('input'));
}

function openFullImage(event) {
  openPopup(popupImage);
  const imageSrc = event.target.getAttribute('src');
  const cardText = event.target.parentElement.querySelector('.element__text').textContent;
  popupImageFoto.setAttribute('src', imageSrc);
  popupImageFoto.setAttribute('alt', cardText);
  popupImageText.textContent = cardText;
}

function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  profileNameText.textContent = nameInput.value;
  profileAboutText.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

//Создание карточки:
function createCard(element) {
  const newCard = cardTemplate.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__text');
  cardHeading.textContent = element.name;
  const cardImage = newCard.querySelector('.element__foto');
  cardImage.setAttribute('src', element.link);
  cardImage.setAttribute('alt', element.name);
  cardImage.addEventListener('click', openFullImage);
  const cardHeart = newCard.querySelector('.element__heart');
  cardHeart.addEventListener('click', function () {
    cardHeart.classList.toggle('element__heart_active');
  });
  const deleteButton = newCard.querySelector('.element__delete'); //создаём переменную, кот. обращается к кнопке
  deleteButton.addEventListener('click', deleteCard); //доб. слушатель клика и фу-ю, отлавл. событие
  return newCard;
}

function addCard(newCard) {
  elements.prepend(newCard);
}

//Удаление карточки:
function deleteCard(event) {
  const button = event.target;
  const element = button.closest('.element');
  element.remove();
}

function submitAddCardForm(event) {
  event.preventDefault();
  const link = popupItemTypePhoto.value;
  const name = popupItemTypePlace.value;
  const card = {
    name: name,
    link: link,
    alt: name
  };
  const newCard = createCard(card);
  addCard(newCard);
  closePopup(popupAddElement);
}

cards.forEach(function (element) {
  const newCard = createCard(element);
  addCard(newCard);
}); //Теперь в foreach просто передаём функцию createCard, создающую карточку

popupList.forEach( popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup)
      closePopup(popup);
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

formPopup.addEventListener('submit', submitEditProfileForm);
//Чтобы добавлять карточки с помощью формы:
formAddCard.addEventListener('submit', submitAddCardForm);