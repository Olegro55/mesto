export class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }
  
  _checkResponse(res) {
    if (!res.ok)
      return Promise.reject(`Ошибка: ${res.status}`);
    return res.json();
  }
  
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => { return this._checkResponse(res); })
      .catch(err => { console.log(err); });
  }
  
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => { return this._checkResponse(res); })
      .catch(err => { console.log(err); });
  }
  
  setUserImage(data) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => { return this._checkResponse(res); })
      .catch(err => { console.log(err); });
  }
}