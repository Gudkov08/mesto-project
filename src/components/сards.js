import * as modals from './modal.js';
import * as startCards from './initial-сards.js';
import * as validate from './validate.js';
import * as api from './api.js';
import {resetButton} from './utils.js';
import {user as profileUser} from './profile.js';
import {popupDeleteCard} from '../pages/index.js';

/* -------------------Создаем новую карточку------------------- */

//name, link
export function createNewCard(card, user) {
  // заносим содержание шаблона карточки в переменную
  const cardTemplate = document.querySelector("#AddNewCard").content;

  // клонируем содержимое тега template
  const cardElement = cardTemplate
    .querySelector(".elements__card")
    .cloneNode(true);

  // наполняем содержимым
  const image = cardElement.querySelector(".elements__card-image");
  const imageCaption = cardElement.querySelector(".elements__card-title");
  const numberLikes = cardElement.querySelector(".elements__likes-number");

  imageCaption.textContent = card.name;
  image.alt = card.name;
  image.src = card.link;

  numberLikes.textContent =  card.likes.length;

  // обработчик нажатия на кнопку лайк
  const buttonLike = cardElement.querySelector(".elements__card-button");
    for (let i = 0; i < card.likes.length; i++) {
    if (card.likes[i]._id === user._id) {
      buttonLike.classList.add("elements__card-button_active");
      break;
    }
  }

  buttonLike.addEventListener ("click", function (evt) {
      const eventTarget = evt.target;
      if (buttonLike.classList.contains("elements__card-button_active")) {
        api.deleteLikeFromServer(card)
        .then((res) => {numberLikes.textContent = res.likes.length});
        eventTarget.classList.remove("elements__card-button_active");
      } else {
        api.putLikeToServer(card)
        .then((res) => {numberLikes.textContent = res.likes.length});
        eventTarget.classList.add("elements__card-button_active");
      }

    });

  // обработчик нажатия на кнопку удаления карточки
  const buttonTrash = cardElement.querySelector(".button_type_trash");

  if (card.owner._id != user._id) {
    buttonTrash.remove();
  }

  buttonTrash.addEventListener("click", function () {
    modals.openPopup(popupDeleteCard);
/*     api.deleteCardFromServer(card);
    buttonTrash.closest('.elements__card').remove(); */
  });

  // обработчик нажатия на картинку
  const cardImage = cardElement.querySelector(".elements__card-image");
  const popupImage = document.querySelector("#POPUP-IMAGE-LARGE");

  cardImage.addEventListener("click", function (e) {
    modals.openPopup(popupImage);

    const imagePopupImage = popupImage.querySelector(".imgPopup__image");
    const imageCaptionPopupImage = popupImage.querySelector(".imgPopup__caption");

    imagePopupImage.src = image.src;
    imageCaptionPopupImage.textContent = imageCaption.textContent;
  });

  return cardElement;
}

// функция для добавления новых карточек с фотографиями
export const cardsList = document.querySelector(".elements__list");

export function submitFormNewCard(evt) {
  const popupNewCard = document.querySelector("#POPUP-NEW-CARD");
  const newCardObject = {};

  newCardObject.name = popupNewCard.querySelector("input[name=newCardName]").value;
  newCardObject.link = popupNewCard.querySelector("input[name=newCardLink]").value;
  newCardObject.likes = [];
  newCardObject.owner = {};
  newCardObject.owner._id = profileUser._id;

  evt.preventDefault();
  const newCard = createNewCard(newCardObject, profileUser);
  api.loadNewCardToServer(newCardObject);
  cardsList.prepend(newCard);
  modals.closePopup(popupNewCard);
  resetButton(popupNewCard);
}

export function loadInitialCards(arr, user) {
  arr.forEach(item => {
    const newCard = createNewCard(item, user);
    cardsList.prepend(newCard);
  });
}

export function submitFormDeleteCard(evt) {
  evt.preventDefault();
  api.deleteCardFromServer(card);
  buttonTrash.closest('.elements__card').remove();
  modals.closePopup(popupChangeAvatar);
}
