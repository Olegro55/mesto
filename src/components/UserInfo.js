export class UserInfo {
  constructor({ nameSelector, aboutSelector, imageSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._image = document.querySelector(imageSelector);
  }
  
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._image.src
    }
  }
  
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._image.src = avatar;
  }
}