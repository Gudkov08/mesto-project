import * as startCards from '../components/initial-сards.js';
import * as validate from '../components/validate.js';
import * as cards from '../components/сards.js';
import * as modals from '../components/modal.js';
import * as profile from '../components/profile.js';
import './index.css';

/* -------------------Вешаем слушатели на кнопки в попапах------------------- */
const editButton = document.querySelector(".button_type_edit");
const formEdit = document.forms.editProfile;
const newCardButton = document.querySelector(".profile__add-btn");
const formNewCard = document.forms.newCard;
const popupImage = document.querySelector("#POPUP-IMAGE-LARGE");
const popupNewCard = document.querySelector("#POPUP-NEW-CARD");

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
