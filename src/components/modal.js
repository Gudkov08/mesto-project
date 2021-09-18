/* -------------------Логика работы попапов------------------- */
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

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleESC);
  popup.removeEventListener('click', handleOverlay);
}

export {openPopup, closePopup}
