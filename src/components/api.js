import * as cards from './сards.js';
import * as profile from './profile.js';


const mestoConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-1',
  headers: {
    'Authorization': '4ac8521d-70a9-440e-8460-55ec053aa485',
    'Content-Type': 'application/json'
  }
}

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${mestoConfig.baseUrl}/cards`, {
    headers: mestoConfig.headers
  }).then(getResponse)
}

export const loadInitialCards = () => {
  getInitialCards()
  .then((data) => {
    cards.loadInitialCards(data)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const getUserInfo = () => {
  return fetch(`${mestoConfig.baseUrl}/users/me`, {
    headers: mestoConfig.headers
  }).then(getResponse)
}

export const loadUserProfile = () => {
  getUserInfo()
  .then((data) => {
    profile.loadProfile(data)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const editUserProfile = (name, about) => {
  return fetch(`${mestoConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: mestoConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}

export const loadNewCardToServer = (newCard) => {
  return fetch(`${mestoConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: mestoConfig.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  }).then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}

export const changeAvatarOnServer = (link) => {
  return fetch(`${mestoConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: mestoConfig.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}
