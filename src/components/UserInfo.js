export class UserInfo {
  constructor({ nameSelector, aboutSelector, imageSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._image = document.querySelector(imageSelector);
  }
  
  getUserInfo() {
    const data = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._image.src
    }
    return data;
  }
  
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
  
  setUserImage({ avatar }) {
    this._image.src = avatar;
  }
}