import * as startCards from '../components/initial-сards.js';
import * as validate from '../components/validate.js';
import * as cards from '../components/сards.js';
import * as modals from '../components/modal.js';
import * as profile from '../components/profile.js';
import * as api from '../components/api.js';
import './index.css';

/* -------------------Загружаем данные с сервера: профиль и карточки------------------- */
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((responses) => {
    cards.loadInitialCards(responses[0], responses[1]);
    profile.loadProfile(responses[1]);
  })
  .catch((err) => {
    console.log(err)
  })


/* -------------------Запускаем лайв-валидацию форм------------------- */
validate.enableValidation(validate.validationConfig);

/* -------------------Вешаем слушатели на кнопки в попапах------------------- */
const editButton = document.querySelector(".button_type_edit");
const formEdit = document.forms.editProfile;
const newCardButton = document.querySelector(".profile__add-btn");
const formNewCard = document.forms.newCard;
const popupImage = document.querySelector("#POPUP-IMAGE-LARGE");
const popupNewCard = document.querySelector("#POPUP-NEW-CARD");
export const popupChangeAvatar = document.querySelector("#POPUP-CHANGE-AVATAR");
const formChangeAvatar = document.forms.changeAvatar;
export const popupDeleteCard = document.querySelector("#POPUP-DELETE-CARD");
export const formDeleteCard = document.forms.deleteCard;


// popupEdit
editButton.addEventListener("click", function () {
  profile.openPopupEdit(profile.popupEdit);
});

profile.popupEdit
  .querySelector(".button_type_close")
  .addEventListener("click", function () {
    modals.closePopup(profile.popupEdit);
});

formEdit.addEventListener("submit", profile.submitPopupEdit);

// popupNewCard
newCardButton.addEventListener("click", function () {
  modals.openPopup(popupNewCard);
});

popupNewCard
  .querySelector(".button_type_close")
  .addEventListener("click", function () {
    modals.closePopup(popupNewCard);
});

formNewCard.addEventListener("submit", cards.submitFormNewCard);

// popupImage
popupImage
  .querySelector(".button_type_close")
  .addEventListener("click", function () {
    modals.closePopup(popupImage);
  });

// popupChangeAvatar
profile.profileAvatar.addEventListener("click", function () {
  modals.openPopup(popupChangeAvatar);
});

popupChangeAvatar
  .querySelector(".button_type_close")
  .addEventListener("click", function () {
    modals.closePopup(popupChangeAvatar);
});

formChangeAvatar.addEventListener("submit", profile.submitChangeAvatar);

//popupDeleteCard
popupDeleteCard.querySelector(".button_type_close")
  .addEventListener("click", function () {
    modals.closePopup(popupDeleteCard);
});
