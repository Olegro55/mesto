export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeIcon = this._popupElement.querySelector('.popup__close-icon');
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
  
  setEventListeners() {
    this._closeIcon.addEventListener('click', () => {
      this.close();
    });
    
    this._popupElement.addEventListener('mousedown', evt => {
      if (evt.target === this._popupElement) this.close();
    });
  }
}
