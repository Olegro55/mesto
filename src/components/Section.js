export class Section {
  constructor({ items, renderer }, selector) {
    this._container = document.querySelector(selector);
    this._initialArray = items;
    this._renderer = renderer;
  }
  
  addInitialItems() {
    this._initialArray.forEach(this._renderer);
  }
  
  addItem(element) {
    this._container.prepend(element);
  }
}