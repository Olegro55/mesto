export class Card {
  constructor({ name, link, _id, likes, owner: {_id:ownerId}}, userId, templateSelector, { handleClick, handleDelete, handleLike }) {
    this._templateSelector = templateSelector;
    this._cardId = _id,
    this._name = name;
    this._link = link;
    this._ownerId = ownerId;
    this._userId = userId;
    this._likes = likes;
    this._handleClick = handleClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
  }

  generate() {
    this._element = this._getElement();
    this._image = this._element.querySelector('.element__foto');
    this._heart = this._element.querySelector('.element__heart');
    this._likesCounter = this._element.querySelector('.element__like-counter');
    this._deleteButton = this._element.querySelector('.element__delete');

    this._element.querySelector('.element__text').textContent = this._name;
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);
    this._renderLikes();
    if (this._ownerId !== this._userId) this._deleteButton.remove();

    this._setEventListeners();

    return this._element;
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  updateLikes({ likes }) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    const likesCount = this._likes.length;
    const liked = this._likes.some(user => user._id === this._userId);

    this._likesCounter.textContent = likesCount > 0 ? likesCount : '';
    if (liked) {
      this._heart.classList.add('element__heart_active');
      this._likeAction = 'DELETE';
    }
    else {
      this._heart.classList.remove('element__heart_active');
      this._likeAction = 'PUT';
    }
  }

  _getElement() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._heart.addEventListener('click', () => this._handleLike(this._cardId, this._likeAction));
    if (this._ownerId === this._userId)
      this._deleteButton.addEventListener('click', () => this._handleDelete(this._cardId, this));
    this._image.addEventListener('click', () => this._handleClick(this._name, this._link));
  }
}
