import * as modals from './modal.js';
import * as api from './api.js';
import {popupChangeAvatar} from '../pages/index.js';
import {resetButton} from './utils.js';

const profileNameInput = document.querySelector("input[name=profile-name]");
const profileDescriptionInput = document.querySelector("input[name=profile-description]");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__img");
const popupEdit = document.querySelector("#POPUP-EDIT-PROFILE");
const buttonSubmitPopupEdit = popupEdit.querySelector(".form__submit");

let user = {};

function makeUser(obj) {
  Object.assign(user, obj);
}

// открытие popupEdit
function openPopupEdit() {
  modals.openPopup(popupEdit);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// сохранение значений и закрытие popupEdit
function submitPopupEdit(evt) {
  evt.preventDefault();
  buttonSubmitPopupEdit.textContent = "Сохранение..."
  api.editUserProfile(profileNameInput.value, profileDescriptionInput.value)
  .then(() => {
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    modals.closePopup(popupEdit);
    resetButton(popupEdit);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {buttonSubmitPopupEdit.textContent = "Сохранить"})
}

function loadProfile(obj) {
  profileName.textContent =obj.name;
  profileDescription.textContent =obj.about;
  profileAvatar.src = obj.avatar;
  makeUser(obj);
}

function submitChangeAvatar(evt) {
  const newAvatarLink = popupChangeAvatar.querySelector("input[name=newAvatarLink]").value;

  evt.preventDefault();
  api.changeAvatarOnServer(newAvatarLink);
  modals.closePopup(popupChangeAvatar);
  profileAvatar.src = newAvatarLink;
  resetButton(popupChangeAvatar);
}

export {openPopupEdit, submitPopupEdit, popupEdit, loadProfile, profileAvatar, submitChangeAvatar, user}
