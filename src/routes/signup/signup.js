import { EMAIL_REGEX, ERROR_MESSAGE, NAME_REGEX } from '../../../old/constants';

const form = document.querySelector('form');
const formInputs = form.querySelectorAll('input');

const validationOptions = [
  {
    attribute: 'data-first-name',
    isValid: (input) => input.value && input.value.length <= parseInt(32, 10),
    errorMessage: () => ERROR_MESSAGE.firstNameTooLong,
  },
  {
    attribute: 'data-last-name',
    isValid: (input) => input.value && input.value.length <= parseInt(64, 10),
    errorMessage: () => ERROR_MESSAGE.lastNameTooLong,
  },
  {
    attribute: 'data-name',
    isValid: (input) => {
      return NAME_REGEX.test(input.value);
    },
    errorMessage: () => ERROR_MESSAGE.incorrectNameFormat,
  },
  {
    attribute: 'data-email',
    isValid: (input) => {
      return EMAIL_REGEX.test(input.value.trim());
    },
    errorMessage: () => ERROR_MESSAGE.incorrectEmailFormat,
  },
  {
    attribute: 'data-password',
    isValid: (input) =>
      input.value &&
      input.value.length >= parseInt(input.getAttribute('minlength'), 10),
    errorMessage: () => ERROR_MESSAGE.passwordTooShort,
  },
  {
    attribute: 'required',
    isValid: (input) => input.value.trim() !== '',
    errorMessage: () => ERROR_MESSAGE.emptyInput,
  },
];

const validateSingleInputField = (input) => {
  const inputContainer = input.closest('.form__input');
  const inputError = inputContainer.querySelector('.form__input-error');

  let formInputError = false;
  for (const option of validationOptions) {
    if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
      input.classList.add('error');
      inputError.classList.add('error');
      inputError.textContent = option.errorMessage();
      formInputError = true;
    }
  }

  if (!formInputError) {
    input.classList.remove('error');
    inputError.classList.remove('error');
    inputError.textContent = '';
  }
};

formInputs.forEach((input) => {
  input.addEventListener('blur', () => {
    validateSingleInputField(input);
  });
});

const validateAllInputFields = () => {
  formInputs.forEach((input) => {
    validateSingleInputField(input);
  });

  const hasError = Array.from(formInputs).some((input) => {
    return input.classList.contains('error');
  });

  if (!hasError) {
    formInputs.forEach((input) => (input.value = ''));
    alert(`You're all set! Registration successful. Welcome to the community!`);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateAllInputFields();
});
