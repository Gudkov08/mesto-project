import * as startCards from './initial-сards.js';
import * as validate from './validate.js';
import * as cards from './сards.js';
import * as modals from './modal.js';

/* -------------------Вешаем слушатели на кнопки в попапах------------------- */
const editButton = document.querySelector(".button_type_edit");
const popupEdit = document.querySelector("#POPUP-EDIT-PROFILE");
const formEdit = document.forms.editProfile;
const newCardButton = document.querySelector(".profile__add-btn");
const formNewCard = document.forms.newCard;
const popupImage = document.querySelector("#POPUP-IMAGE-LARGE");
const popupNewCard = document.querySelector("#POPUP-NEW-CARD");

// popupEdit
editButton.addEventListener("click", function () {
  modals.openPopupEdit(popupEdit);
});

popupEdit
  .querySelector(".button_type_close")
  .addEventListener("click", function () {
    modals.closePopup(popupEdit);
});

formEdit.addEventListener("submit", modals.submitPopupEdit);

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

/* -------------------Добавление 6ти карточек по умолчанию------------------- */
startCards.initialCards.forEach(function (item) {
  const newCard = cards.createNewCard(item.name, item.link);
  cards.cardsList.prepend(newCard);
});

/* -------------------Запускаем лайв-валидацию форм------------------- */
validate.enableValidation();
