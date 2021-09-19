import * as cards from './сards.js';

export function getInitialCards() {
  fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
    headers: {
      authorization: '4ac8521d-70a9-440e-8460-55ec053aa485'
    }
  })
  .then(res => res.json())
  .then((result) => {
    cards.loadInitialCards(result);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос на получение информации о карточках не выполнен');
  });
  }

export const getUserInfo = function() {
fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
  headers: {
    authorization: '4ac8521d-70a9-440e-8460-55ec053aa485'
  }
})
.then(res => res.json())
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.log('Ошибка. Запрос на получение информации о пользователе не выполнен');
});
}


