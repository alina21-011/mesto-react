class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponce(res));

  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

  setUserData(name, info) {

    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: info,
      }),
    }).then((res) => this._checkResponce(res));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResponce(res));
  }
  
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }


  editUserAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => this._checkResponce(res));
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

  // Удалить лайки
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponce(res));

  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.addLike(cardId);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "d48897fd-60db-44b5-a786-719cbcf970f2",
    "Content-Type": "application/json",
  },
});


export default api;