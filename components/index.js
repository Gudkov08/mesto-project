import * as cards from './initial-сards.js';

const popupEdit = document.querySelector("#POPUP-EDIT-PROFILE");
const popupNewCard = document.querySelector("#POPUP-NEW-CARD");
const popupImage = document.querySelector("#POPUP-IMAGE-LARGE");
const formEdit = document.forms.editProfile;
const formNewCard = document.forms.newCard;
const profileNameInput = document.querySelector("input[name=profile-name]");
const profileDescriptionInput = document.querySelector("input[name=profile-description]");
const newCardNameInput = document.querySelector("input[name=newCardName]");
const newCardLinkInput = document.querySelector("input[name=newCardLink]");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".button_type_edit");
const newCardButton = document.querySelector(".profile__add-btn");
const cardsList = document.querySelector(".elements__list");
const imagePopupImage = popupImage.querySelector(".imgPopup__image");
const imageCaptionPopupImage = popupImage.querySelector(".imgPopup__caption");

const closePopupEsc = (popup) => (evt) => {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

const closePopupOverlay = (popup) => (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc(popup));
  popup.addEventListener('click', closePopupOverlay(popup));
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc(popup));
  popup.removeEventListener('click', closePopupOverlay(popup));
}




function createNewCard(name, link) {
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
  cardImage.addEventListener("click", function (e) {
  /*   e.stopPropagation(); */
    openPopup(popupImage);
    imagePopupImage.src = image.src;
    imageCaptionPopupImage.textContent = imageCaption.textContent;
  });

  return cardElement;
}


/* -------------------Логика в попапе POPUP-EDIT-PROFILE------------------- */

// вешаем листнеры на кнопки в попапе popupEdit
editButton.addEventListener("click", function () {
  openPopupEdit(popupEdit);
});
popupEdit
  .querySelector(".button_type_close")
  .addEventListener("click", function () {
    closePopup(popupEdit);
  });
formEdit.addEventListener("submit", submitPopupEdit);

// открытие popupEdit
function openPopupEdit() {
  openPopup(popupEdit);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// сохранение значений и закрытие popupEdit
function submitPopupEdit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupEdit);
}

/* -------------------Логика в попапе POPUP-NEW-CARD------------------- */

// листнеры на кнопки в popupNewCard
newCardButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});
popupNewCard
  .querySelector(".button_type_close")
  .addEventListener("click", function () {
    closePopup(popupNewCard);
  });
formNewCard.addEventListener("submit", submitFormNewCard);

// функция для добавления новых карточек с фотографиями
function submitFormNewCard(evt) {
  evt.preventDefault();
  const newCard = createNewCard(newCardNameInput.value, newCardLinkInput.value);
  cardsList.prepend(newCard);
  closePopup(popupNewCard);
}

/* -------------------Логика в попапе POPUP-IMAGE-LARGE------------------- */

popupImage
  .querySelector(".button_type_close")
  .addEventListener("click", function () {
    closePopup(popupImage);
  });

/* -------------------Добавление 6ти карточек по умолчанию------------------- */

cards.initialCards.forEach(function (item) {
  const newCard = createNewCard(item.name, item.link);
  cardsList.prepend(newCard);
});




/* -------------------Лайв Валидация------------------- */


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__submit_inactive');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('form__submit_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation();
