// Функция добавляет класс с ошибкой //Теперь вмессто параметра input, ставим входящие параметры form, inputList
//Чтобы знать, где искать такой элемент, мы передаём функции параметр form и ищем элемент ошибки inputElement в нём.
const showInputError = (form, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const activeError = form.querySelector(`.${inputElement.id}-error`); //у них formError
  inputElement.classList.add(inputErrorClass);
  activeError.classList.add(errorClass);
  activeError.textContent = errorMessage;
};

// Функция удаляет класс с ошибкой
const hideInputError = (form, inputElement, inputErrorClass, errorClass) => {
  const activeError = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  activeError.classList.remove(errorClass);
  activeError.textContent = '';
};

// Функция, которая проверяет валидность поля. //Теперь принимает form и inputElement(новый параметр), а не берёт их из внешней области видимости
//formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
//inputElement — проверяемое поле ввода.
const checkInputValidity = (form, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    showInputError(form, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    // Если проходит, скроем // hideInputError также получает параметром форму и само это поле
    hideInputError(form, inputElement, inputErrorClass, errorClass);
  }
};

// Функция принимает массив полей и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны
//Только проверяет, но ничего не делает с самой кнопкой «Сохранить».
const hasInvalidInput = inputList => {
  // проходим по этому массиву методом some
  return inputList.some(inputElement => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится
    return !inputElement.validity.valid;
  });
};

const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    enableButton(buttonElement, inactiveButtonClass);
  }
};
//Добавим слушатель событий всем полям ввода внутри формы. Для этого создадим функцию setEventListeners:
const setEventListeners = (
  form,
  inputList,
  buttonElement,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  form.addEventListener('input', () => {
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
  // Обойдём все элементы полученной коллекции
  inputList.forEach(inputElement => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
      checkInputValidity(form, inputElement, inputErrorClass, errorClass);
    });
  });
};

const enableValidation = config => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach(form => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(
      form,
      inputList,
      buttonElement,
      config.inactiveButtonClass,
      config.inputErrorClass,
      config.errorClass
    );
  });
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_error',
  errorClass: 'popup__input-error_active'
};

enableValidation(validationConfig);
