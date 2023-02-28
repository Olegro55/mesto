const cards = [
  {
    name: 'Карачаевск',
    link: 'https://olegro55.github.io/mesto/images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://olegro55.github.io/mesto/images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: 'https://olegro55.github.io/mesto/images/dombay.jpg'
  },
  {
    name: 'Красноярские столбы',
    link: 'https://olegro55.github.io/mesto/images/stolby.jpg'
  },
  {
    name: 'Казань',
    link: 'https://olegro55.github.io/mesto/images/kazan.jpg'
  },
  {
    name: 'Плато Путорана',
    link: 'https://olegro55.github.io/mesto/images/putoran.jpg'
  }
];

const elements = document.querySelector('.elements');
//Создание карточки:
function createCard(element) {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__text');
  cardHeading.textContent = element.name;
  const cardImage = newCard.querySelector('.element__foto');
  cardImage.setAttribute('src', element.link);
  cardImage.setAttribute('alt', element.name);
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
const form = document.querySelector('.add-element');
form.addEventListener('submit', hendleFormSubmit);

function hendleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const link = form.querySelector('.add-element__item_type_photo').value;
  const name = form.querySelector('.add-element__item_type_place').value;
  const card = {
    name: name,
    link: link,
    alt: name
  };
  createCard(card);
  closeFormElement();
}
