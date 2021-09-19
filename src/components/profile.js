import * as modals from './modal.js';

const profileNameInput = document.querySelector("input[name=profile-name]");
const profileDescriptionInput = document.querySelector("input[name=profile-description]");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__img");
const popupEdit = document.querySelector("#POPUP-EDIT-PROFILE");

// открытие popupEdit
function openPopupEdit() {
  modals.openPopup(popupEdit);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// сохранение значений и закрытие popupEdit
function submitPopupEdit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  modals.closePopup(popupEdit);
}

/* function loadProfile(obj) {
  profileName.textContent =obj.name;
  profileDescription.textContent =obj.about;
  profileAvatar.src = obj.avatar;
} */

export {openPopupEdit, submitPopupEdit, popupEdit}
