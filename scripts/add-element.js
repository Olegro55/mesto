const formAddElement = document.querySelector('.add-element');
const placeInput = document.querySelector('.add-element__item_type_place');
const elementFotoLink = document.querySelector('.element__foto');
const fotoLinkInput = document.querySelector('.add-element__item_type_photo');
const elementAddButton = document.querySelector('.profile__add-button');
const elementCloseIcon = document.querySelector('.add-element__close-icon');
const formsElement = document.querySelector('.add-element__form');

elementAddButton.addEventListener('click', openFormElement);

elementCloseIcon.addEventListener('click', closeFormElement);

function openFormElement() {
  formAddElement.classList.add('add-element_opened');
}

function closeFormElement() {
  formAddElement.classList.remove('add-element_opened');
}
