/* -------------------Логика работы попапов------------------- */

const profileNameInput = document.querySelector("input[name=profile-name]");
const profileDescriptionInput = document.querySelector("input[name=profile-description]");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

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

// открытие popupEdit
const popupEdit = document.querySelector("#POPUP-EDIT-PROFILE");

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

export {closePopupEsc, closePopupOverlay, openPopup, closePopup, openPopupEdit, submitPopupEdit, popupEdit}
