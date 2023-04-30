export class Card {
  constructor({ name, link, _id, owner: {_id:ownerId}}, userId, templateSelector, { handleClick, handleDelete }) {
    this._templateSelector = templateSelector;
    this._cardId = _id,
    this._name = name;
    this._link = link;
    this._ownerId = ownerId;
    this._userId = userId;
    this._handleClick = handleClick;
    this._handleDelete = handleDelete;
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
      this._deleteButton.addEventListener('click', () => this._handleDelete(this._cardId, this));
    this._image.addEventListener('click', () => this._handleClick(this._name, this._link));
  }

  _like() {
    this._heart.classList.toggle('element__heart_active');
  }

  delete() {
    this._element.remove();
    this._element = null;
  }
}
