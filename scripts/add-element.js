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
}

function closeFormElement() {
  formAddElement.classList.remove('popup_opened');
}
