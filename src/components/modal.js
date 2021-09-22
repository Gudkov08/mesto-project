/* -------------------Логика работы попапов------------------- */
import {formDeleteCard} from '../pages/index.js';
import * as cards from './сards.js';

function handleESC(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(document.querySelector('.popup_opened'));
  };
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleESC);
  popup.addEventListener('click', handleOverlay);
}

function openPopupDeleteCard(popup, card, buttonTrash) {
  openPopup(popup);
  formDeleteCard.addEventListener("submit", function () {
    cards.submitFormDeleteCard(card, buttonTrash);
    console.log('123')
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleESC);
  popup.removeEventListener('click', handleOverlay);
}

export {openPopup, closePopup, openPopupDeleteCard}
