const elements = document.querySelector('.elements');
//Создание карточки:
function createCard(element) {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);
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
  elements.prepend(newCard);
}

cards.forEach(createCard); //Теперь в foreach просто передаём функцию createCard, создающую карточку
//Удаление карточки:
function hendleDeleteButtonClick(event) {
  const batton = event.target;
  const element = batton.closest('.element');
  element.remove();
}

//Чтобы добавлять карточки с помощью формы:
const form = document.querySelector('.popup_add-element');
form.addEventListener('submit', hendleFormSubmit);

function hendleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const link = form.querySelector('.popup__item_type_photo').value;
  const name = form.querySelector('.popup__item_type_place').value;
  const card = {
    name: name,
    link: link,
    alt: name
  };
  createCard(card);
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
  popupImageText.textContent = cardText;
}

function closeFullImage() {
  popupImage.classList.remove('popup_opened');
}
