export class Card {
  constructor({ name, link, owner: {_id}}, userId, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._ownerId = _id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
  }

  generate() {
    this._element = this._getElement();
    this._image = this._element.querySelector('.element__foto');
    this._heart = this._element.querySelector('.element__heart');
    this._deleteButton = this._element.querySelector('.element__delete');

    this._element.querySelector('.element__text').textContent = this._name;
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);
    if (this._ownerId !== this._userId) this._deleteButton.remove();

    this._setEventListeners();

    return this._element;
  }

  _getElement() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._heart.addEventListener('click', () => {
      this._like();
    });
    if (this._ownerId === this._userId)
      this._deleteButton.addEventListener('click', () => {
        this._delete();
      });
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _like() {
    this._heart.classList.toggle('element__heart_active');
  }

  _delete() {
    this._element.remove();
    this._element = null;
  }
}
