import * as modals from './modal.js';

/* -------------------Создаем новую карточку------------------- */

export function createNewCard(name, link) {
  // заносим содержание шаблона карточки в переменную
  const cardTemplate = document.querySelector("#AddNewCard").content;

  // клонируем содержимое тега template
  const cardElement = cardTemplate
    .querySelector(".elements__card")
    .cloneNode(true);

  // наполняем содержимым
  const image = cardElement.querySelector(".elements__card-image");
  const imageCaption = cardElement.querySelector(".elements__card-title");

  imageCaption.textContent = name;
  image.alt = name;
  image.src = link;

  // обработчик нажатия на кнопку лайк
  cardElement
    .querySelector(".elements__card-button")
    .addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("elements__card-button_active");
    });

  // обработчик нажатия на кнопку удаления карточки
  const ButtonTrash = cardElement.querySelector(".button_type_trash");
  ButtonTrash.addEventListener("click", function () {
    ButtonTrash.parentNode.remove();
  });

  // обработчик нажатия на картинку
  const cardImage = cardElement.querySelector(".elements__card-image");
  const popupImage = document.querySelector("#POPUP-IMAGE-LARGE");

  cardImage.addEventListener("click", function (e) {
  /*   e.stopPropagation(); */
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
  const newCardNameInput = document.querySelector("input[name=newCardName]");
  const newCardLinkInput = document.querySelector("input[name=newCardLink]");
  const popupNewCard = document.querySelector("#POPUP-NEW-CARD");

  evt.preventDefault();
  const newCard = createNewCard(newCardNameInput.value, newCardLinkInput.value);
  cardsList.prepend(newCard);
  modals.closePopup(popupNewCard);
}
