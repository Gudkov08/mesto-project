const popupEdit = document.getElementById('POPUP-EDIT-PROFILE');
const popupNewCard = document.getElementById('POPUP-NEW-CARD');
const popupImage = document.getElementById('POPUP-IMAGE-LARGE');
const formEdit = document.forms.editProfile;
const newCard = document.forms.newCard;
const formElement = document.forms.newCard;
const profileNameInput = document.getElementsByName('profile-name');
const profileDescriptionInput = document.getElementsByName('profile-description');
const newCardNameInput = document.getElementsByName('newCardName');
const newCardLinkInput = document.getElementsByName('newCardLink');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelectorAll('.button_type_close');
const elementsList = document.querySelector('.elements__list');
const newCardButton = document.querySelector('.profile__add-btn');
const cardsList = document.querySelector('.elements__list');
const likeButton = document.querySelectorAll('.elements__card-button');
const imagePopupImage = popupImage.querySelector('.imgPopup__image');
const imageCaptionPopupImage = popupImage.querySelector('.imgPopup__caption');


/* -------------------Добавление 6ти карточек по умолчанию------------------- */

// массив с карточками для начальной загрузки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// отображение массива карточек при начальной загрузке
for (let i = 0; i < 6; i++) {
  elementsList.insertAdjacentHTML ('beforeend',
   `<li class="elements__card">
      <img class="elements__card-image" src=${initialCards[i].link} alt="фотография места для посещения">
      <button type="button" class="button button_type_trash" aria-label="кнопка удаления карточки"></button>
      <div class="elements__card-caption">
        <h2 class="elements__card-title">${initialCards[i].name}</h2>
        <button type="button" class="button elements__card-button" aria-label="кнопка 'Нравится!'"></button>
      </div>
    </li>`
  );

  // обработчик нажатия на кнопку лайк
  const elementButtonsLike = elementsList.querySelectorAll('.elements__card-button');
  elementButtonsLike[i].onclick = function(evt) {
    evt.target.classList.toggle('elements__card-button_active');
  }

  // обработчик нажатия на картинку
  const elemensImage = elementsList.querySelectorAll('.elements__card-image');
  elemensImage[i].onclick = function() {
    popupImage.classList.add('popup_opened');
    imagePopupImage.src = initialCards[i].link;
    imageCaptionPopupImage.textContent = initialCards[i].name;
  }

  // обработчик нажатия на кнопку удаления карточки
  const elementButtonsTrash = elementsList.querySelectorAll('.button_type_trash');
  elementButtonsTrash[i].onclick = function() {
    elementButtonsTrash[i].parentNode.remove();
  }
}


/* -------------------Логика в попапе POPUP-EDIT-PROFILE------------------- */

// меняем placeholder на текущие значения в профиле
profileNameInput[0].placeholder = profileName.textContent;
profileDescriptionInput[0].placeholder = profileDescription.textContent;

// вешаем листнеры на кнопки в попапе popupEdit
editButton.addEventListener("click", popupEditOpen);
closeButton[0].addEventListener("click", popupEditClose);
formEdit.addEventListener('submit', formSubmitHandler);
formEdit.addEventListener('submit', popupEditClose);

// открытие popupEdit
function popupEditOpen() {
  popupEdit.classList.add('popup_opened');
}

// закрытие popupEdit
function popupEditClose() {
  popupEdit.classList.remove('popup_opened');
  profileNameInput[0].value = profileName.textContent;
  profileDescriptionInput[0].value = profileDescription.textContent;
}

// сохранение значений popupEdit
function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput[0].value;
  profileDescription.textContent = profileDescriptionInput[0].value;
}


/* -------------------Логика в попапе POPUP-NEW-CARD------------------- */

// листнеры на кнопки в popupNewCard
newCardButton.addEventListener("click", popupNewCardOpen);
closeButton[1].addEventListener("click", popupNewCardClose);
newCard.addEventListener('submit', formSubmitNewCard);
newCard.addEventListener('submit', popupNewCardClose);

// открытие popupNewCard
function popupNewCardOpen() {
  popupNewCard.classList.add('popup_opened');
}

// закрытие popupNewCard
function popupNewCardClose() {
  popupNewCard.classList.remove('popup_opened');
}

// функция для добавления новых карточек с фотографиями
function formSubmitNewCard (evt) {
  evt.preventDefault();

  // заносим содержание шаблона карточки в переменную
  const cardTemplate = document.querySelector('#AddNewCard').content;

  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  // наполняем содержимым
  const imageSrc = cardElement.querySelector('.elements__card-image');
  const imageCaption = cardElement.querySelector('.elements__card-title');

  imageSrc.src = newCardLinkInput[0].value;
  imageCaption.textContent = newCardNameInput[0].value;

 /*  cardElement.querySelector('.elements__card-image').src = newCardLinkInput[0].value;
  cardElement.querySelector('.elements__card-title').textContent = newCardNameInput[0].value; */

  // обработчик нажатия на кнопку лайк
  cardElement.querySelector('.elements__card-button').addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle('elements__card-button_active');
  });

  // обработчик нажатия на кнопку удаления карточки
  const ButtonTrash = cardElement.querySelector('.button_type_trash');
  ButtonTrash.addEventListener('click', function () {
    ButtonTrash.parentNode.remove();
  });

  // обработчик нажатия на картинку
  const cardImage = cardElement.querySelector('.elements__card-image');
  cardImage.addEventListener('click', function () {
    popupImage.classList.add('popup_opened');
      imagePopupImage.src = imageSrc.src;
      imageCaptionPopupImage.textContent = imageCaption.textContent;
  });

  // отображаем на странице
  cardsList.prepend(cardElement);
}


/* -------------------POPUP-IMAGE-LARGE------------------- */

// закрытие попапа
closeButton[2].addEventListener("click", popupImageClose);

function popupImageClose() {
  popupImage.classList.remove('popup_opened');
}
