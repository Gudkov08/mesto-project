import * as modals from './modal.js';
import * as startCards from './initial-сards.js';


/* -------------------Создаем новую карточку------------------- */

//name, link
export function createNewCard(card) {
  // заносим содержание шаблона карточки в переменную
  const cardTemplate = document.querySelector("#AddNewCard").content;

  // клонируем содержимое тега template
  const cardElement = cardTemplate
    .querySelector(".elements__card")
    .cloneNode(true);

  // наполняем содержимым
  const image = cardElement.querySelector(".elements__card-image");
  const imageCaption = cardElement.querySelector(".elements__card-title");

  imageCaption.textContent = card.name;
  image.alt = card.name;
  image.src = card.link;

  // обработчик нажатия на кнопку лайк
  cardElement
    .querySelector(".elements__card-button")
    .addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("elements__card-button_active");
    });

  // обработчик нажатия на кнопку удаления карточки
  const buttonTrash = cardElement.querySelector(".button_type_trash");
  buttonTrash.addEventListener("click", function () {
    buttonTrash.closest('.elements__card').remove();
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
  const newCardObject = {
  };
  newCardObject.name = popupNewCard.querySelector("input[name=newCardName]").value;
  newCardObject.link = popupNewCard.querySelector("input[name=newCardLink]").value;

  evt.preventDefault();
  const newCard = createNewCard(newCardObject);
  cardsList.prepend(newCard);
  modals.closePopup(popupNewCard);
  popupNewCard.querySelector('.form').reset();
  popupNewCard.querySelector('.form__submit').disabled = true;
  popupNewCard.querySelector('.form__submit').classList.add('form__submit_inactive');
}

function loadInitialCards(arr) {
  arr.forEach(item => {
    const newCard = createNewCard(item);
    cardsList.prepend(newCard);
  });
}

/* -------------------Добавление 6ти карточек по умолчанию------------------- */
loadInitialCards(startCards.initialCards);
