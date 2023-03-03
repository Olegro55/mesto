const formPopup = document.querySelector('.popup_edit-profile');
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

const formAddElement = document.querySelector('.popup_add-element');
const placeInput = document.querySelector('.popup__item_type_place');
const elementFotoLink = document.querySelector('.element__foto');
const fotoLinkInput = document.querySelector('.popup__item_type_photo');
const elementAddButton = document.querySelector('.profile__add-button');
const elementCloseIcon = document.querySelector('#close-icon');
const formsElement = document.querySelector('#form');

elementAddButton.addEventListener('click', openFormElement);

elementCloseIcon.addEventListener('click', closeFormElement);

function openFormElement() {
  formAddElement.classList.add('popup_opened');
  placeInput.value = '';
  fotoLinkInput.value = '';
}

function closeFormElement() {
  formAddElement.classList.remove('popup_opened');
}

const elements = document.querySelector('.elements');

const cardTemplate = document.querySelector('#cardTemplate').content;
//Создание карточки:
function createCard(element) {
  const newCard = cardTemplate.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__text');
  cardHeading.textContent = element.name;
  const cardImage = newCard.querySelector('.element__foto');
  cardImage.setAttribute('src', element.link);
  cardImage.setAttribute('alt', element.name);
  cardImage.addEventListener('click', viewFullImage);
  const cardHeart = newCard.querySelector('.element__heart');
  cardHeart.addEventListener('click', function () {
    cardHeart.classList.toggle('element__heart_active');
  });
  const deleteButton = newCard.querySelector('.element__delete'); //создаём переменную, кот. обращается к кнопке
  deleteButton.addEventListener('click', hendleDeleteButtonClick); //доб. слушатель клика и фу-ю, отлавл. событие
  return newCard;
}

cards.forEach(function (element) {
  const newCard = createCard(element);
  addCard(newCard);
}); //Теперь в foreach просто передаём функцию createCard, создающую карточку

function addCard(newCard) {
  elements.prepend(newCard);
}

//Удаление карточки:
function hendleDeleteButtonClick(event) {
  const batton = event.target;
  const element = batton.closest('.element');
  element.remove();
}

//Чтобы добавлять карточки с помощью формы:
const form = document.querySelector('.popup_add-element');
form.addEventListener('submit', hendleFormSubmit);

const popupItemTypePhoto = form.querySelector('.popup__item_type_photo');
const popupItemTypePlace = form.querySelector('.popup__item_type_place');

function hendleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const link = popupItemTypePhoto.value;
  const name = popupItemTypePlace.value;
  const card = {
    name: name,
    link: link,
    alt: name
  };
  const newCard = createCard(card);
  addCard(newCard);
  closeFormElement();
}

const popupImage = document.querySelector('.popup-image');
const popupImageFoto = document.querySelector('.popup-image__foto');
const popupImageText = document.querySelector('.popup-image__text');
const popupImageCloseIcon = document.querySelector('.popup-image__close-icon');

popupImageCloseIcon.addEventListener('click', closeFullImage);

function viewFullImage(event) {
  popupImage.classList.add('popup_opened');

  const imageSrc = event.target.getAttribute('src');
  const cardText = event.target.parentElement.querySelector('.element__text').textContent;
  popupImageFoto.setAttribute('src', imageSrc);
  popupImageFoto.setAttribute('alt', cardText);
  popupImageText.textContent = cardText;
}

function closeFullImage() {
  popupImage.classList.remove('popup_opened');
}