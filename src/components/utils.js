import {validationConfig} from './validate.js';

export function resetButton(popup) {
  popup.querySelector(validationConfig.formSelector).reset();
  popup.querySelector(validationConfig.submitButtonSelector).disabled = true;
  popup.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass);
}
