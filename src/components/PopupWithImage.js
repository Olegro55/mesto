import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup-image__foto');
    this._text = this._popupElement.querySelector('.popup-image__text');
  }
  
  open(name, link) {
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', name);
    this._text.textContent = name;
    super.open();
  }
}