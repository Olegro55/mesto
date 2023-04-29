import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupElement.querySelectorAll('.popup__item');
    this._button = this._popupElement.querySelector('.popup__button');
    this._handleFormSubmit = handleFormSubmit;
  }
  
  close() {
    this._form.reset();
    super.close();
  }
  
  setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  
  addWaitMessage() {
    this._button.textContent = 'Сохранение...';
  }
  
  removeWaitMessage() {
    this._button.textContent = 'Сохранить';
  }
  
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
}